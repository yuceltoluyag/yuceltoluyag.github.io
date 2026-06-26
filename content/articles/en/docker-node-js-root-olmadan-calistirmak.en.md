Title: Running Node.js Containers Without Root in Docker
Date: 2026-06-26 02:30
Category: Sunucu
Tags: Docker, Node.js, Güvenlik, DevOps, Konteyner
Slug: docker-node-js-root-olmadan-calistirmak
Authors: yuceltoluyag
Status: published
Summary: A guide on securing Node.js Docker containers by stripping root privileges and implementing Linux Capabilities constraints, a read-only filesystem, and seccomp.
Template: article
Lang: en

The other night, while reviewing the Dockerfile of an old project, cold sweat ran down my back. That Node.js server we quickly spun up and deployed years ago had neither a `USER` directive nor any permission restrictions. The container was running directly as root. This meant that a single RCE (remote code execution) vulnerability in `lodash` or `express` back then would have given an attacker full root access inside the container. From there, escaping to the host machine was just a matter of kernel vulnerabilities or poorly configured seccomp settings.

The famous Dockerfile template you see in more than half of the tutorials on the internet looks exactly like this:

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

No non-root user here. Linux capabilities are not dropped. Read-only filesystem or seccomp limits? Out of the question. You run a Docker build, it works like a charm, passes all tests. But it opens the door to an exploit chain that could compromise the entire host server with a single `curl` command.

Most of us assume Docker containers are completely isolated and secure. But a container left with its default settings is like a gated community where the gate is left wide open, and there's only a dummy guard booth in front. That's why, my friend, today we will talk about four steps to close this gap and shield Node.js containers like armor: restricting Linux capabilities, switching to a non-root user, making the filesystem read-only, and applying a seccomp profile.

---

## 🔑 Why is Root Inside a Container Still Root?

The idea that Docker completely isolates containers is a dangerous myth. Yes, by default, some Linux capabilities are turned off and a basic seccomp filter is applied. However, the list of capabilities Docker leaves enabled by default is quite generous:

`CAP_CHOWN`, `CAP_DAC_OVERRIDE`, `CAP_FSETID`, `CAP_FOWNER`, `CAP_MKNOD`, `CAP_NET_RAW`, `CAP_SETGID`, `CAP_SETUID`, `CAP_SETFCAP`, `CAP_SETPCAP`, `CAP_NET_BIND_SERVICE`, `CAP_SYS_CHROOT`, `CAP_AUDIT_WRITE`, `CAP_KILL`

Among these are dangerous rights like `CAP_DAC_OVERRIDE` (which completely ignores file permissions), `CAP_NET_RAW` (allowing network spoofing), and `CAP_SYS_CHROOT` (which aids container escapes). An attacker who compromises the Node.js process gets all of these capabilities.

The attack happens like this:
1. Thanks to a vulnerability in a project dependency, the attacker writes a file to disk.
2. Since the container runs as root, this file is saved with `uid 0` permissions and can overwrite system files under `/usr` or `/sbin`.
3. The attacker escapes container boundaries using the `/proc` directory and the `CAP_SYS_CHROOT` capability.
4. Now, a fully privileged backdoor is open on the host server.

With the following steps, we will break every link of this chain one by one.

---

## 🛠️ Step 1: Drop All Linux Capabilities, Add Only What is Needed

Our first safety measure is to reset all Linux capabilities[^1] given to the container and define only the ones mandatory for the application to run.

For a standard Node.js HTTP server, unless you are listening on a privileged port below 1024, you don't need any Linux capabilities. If your app boots up on port 3000 or higher, you can drop all capabilities.

**Docker Compose Configuration:**

```yaml
services:
  app:
    build: .
    cap_drop:
      - ALL
    cap_add: []
    ports:
      - "3000:3000"
```

**Docker CLI Command:**

```bash
$ docker run --cap-drop=ALL my-app
```

If you notice that Node.js throws errors when reading or writing files after dropping all capabilities, this is not related to capabilities but rather to POSIX file permissions. We will solve that in the next step.

---

## 👤 Step 2: Switch to a Non-Root User

This is the most critical step in container security. A process running as `uid 1000` (a non-root user) inside a container cannot write files under `/usr/bin`, edit `/etc/passwd`, or make unauthorized system calls.

We can achieve this with a two-line change in our Dockerfile:

```dockerfile
FROM node:20-slim

# Create a non-root user and group
RUN groupadd --system --gid 1000 appuser && \
    useradd --system --uid 1000 --gid appuser appuser

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \
    # Give ownership of the files to the new user
    chown -R appuser:appuser /app
COPY --chown=appuser:appuser . .

USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

If you are using lightweight Alpine-based images (`node:20-alpine`), the user creation commands differ:

```dockerfile
FROM node:20-alpine

RUN addgroup -S -g 1000 appuser && \
    adduser -S -u 1000 -G appuser appuser

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \
    chown -R appuser:appuser /app
COPY --chown=appuser:appuser . .

USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

!!! warning "Critical Info: Things That Can Break When Switching to a Non-Root User! ⚠️"
    When you switch to a non-root user, you might get permission and runtime errors in these areas:
    
    *   **Log files:** If your app tries to write under system directories like `/var/log`, you'll get a permission error. Redirect logs to stdout/stderr or write to an allowed subdirectory within `/app`.
    *   **Unix socket files:** If you create socket files under `/var/run`, choose a directory owned by `appuser` instead.
    *   **Packages containing lifecycle scripts:** Some npm packages might run commands requiring root privileges during installation. Therefore, the cleanest method is to install packages (`npm ci`) as the root user, then transfer files with `chown` to run them.

---

## 💾 Step 3: Make the Root Filesystem Read-Only

By mounting the container's root filesystem as read-only, we completely eliminate the attacker's chance of injecting code or manipulating system configurations.

**Docker CLI:**

```bash
$ docker run --read-only --tmpfs /tmp --tmpfs /app/data my-app
```

**Docker Compose:**

```yaml
services:
  app:
    build: .
    read_only: true
    tmpfs:
      - /tmp
      - /app/data
    cap_drop:
      - ALL
```

**Kubernetes Pod Security Configuration:**

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
    readOnlyRootFilesystem: true
```

When we make the root directory read-only, we mount directories like `/tmp` (which Node.js must write to at runtime) using `tmpfs`, a memory-backed temporary filesystem. This way, all temporary files are wiped the moment the container stops.

---

## 🔒 Step 4: Apply a Seccomp Profile

Seccomp (Secure Computing Mode)[^2] filters the system calls (syscalls) a process can make to the OS kernel. By default, Docker blocks about 50 dangerous system calls. However, we can narrow this down even further based on Node.js's needs.

The following `node-seccomp.json` profile blocks all unnecessary calls (such as reboot, swapon, etc.) without disrupting the normal operation of Node.js:

```json
{
  "defaultAction": "SCMP_ACT_ERRNO",
  "architectures": ["SCMP_ARCH_X86_64", "SCMP_ARCH_AARCH64"],
  "syscalls": [
    {
      "names": [
        "accept", "accept4", "access", "arch_prctl", "bind",
        "brk", "capget", "capset", "chdir", "chmod", "chown",
        "clock_getres", "clock_gettime", "clock_nanosleep",
        "clone", "clone3", "close", "connect", "copy_file_range",
        "creat", "dup", "dup2", "dup3", "epoll_create1",
        "epoll_ctl", "epoll_pwait", "eventfd2", "execve",
        "exit", "exit_group", "faccessat2", "fadvise64",
        "fallocate", "fchdir", "fchmod", "fchmodat", "fchown",
        "fchownat", "fcntl", "fdatasync", "fgetxattr",
        "flistxattr", "flock", "fork", "fremovexattr",
        "fsetxattr", "fstat", "fstatfs", "fsync", "ftruncate",
        "futex", "getcwd", "getdents64", "getegid", "geteuid",
        "getgid", "getpeername", "getpgid", "getpgrp",
        "getpid", "getppid", "getpriority", "getrandom",
        "getresgid", "getresuid", "getrlimit", "getrusage",
        "getsockname", "getsockopt", "gettid", "gettimeofday",
        "getuid", "getxattr", "inotify_add_watch",
        "inotify_init1", "inotify_rm_watch", "ioctl",
        "ioprio_get", "ioprio_set", "kcmp", "kill",
        "lgetxattr", "link", "linkat", "listen", "listxattr",
        "llistxattr", "lremovexattr", "lseek", "lsetxattr",
        "lstat", "madvise", "mbind", "memfd_create",
        "membarrier", "mincore", "mkdir", "mkdirat",
        "mlock", "mlock2", "mmap", "mmap_cache", "mount",
        "move_mount", "mprotect", "mquery", "mremap",
        "msgctl", "msgget", "msgrcv", "msgsnd",
        "msync", "munlock", "munmap", "name_to_handle_at",
        "nanosleep", "newfstatat", "open", "openat",
        "openat2", "pause", "pidfd_getfd", "pidfd_open",
        "pidfd_send_signal", "pipe", "pipe2", "poll",
        "ppoll", "prctl", "pread64", "preadv", "preadv2",
        "prlimit64", "process_vm_readv", "pselect6",
        "pwrite64", "pwritev", "pwritev2", "read",
        "readlink", "readlinkat", "readv", "recvfrom",
        "recvmmsg", "recvmsg", "rename", "renameat",
        "renameat2", "restart_syscall", "rmdir", "rseq",
        "rt_sigaction", "rt_sigpending", "rt_sigprocmask",
        "rt_sigqueueinfo", "rt_sigreturn", "rt_sigsuspend",
        "rt_sigtimedwait", "sched_getaffinity",
        "sched_getattr", "sched_getparam", "sched_getscheduler",
        "sched_rr_get_interval", "sched_setaffinity",
        "sched_setattr", "sched_setparam", "sched_setscheduler",
        "sched_yield", "seccomp", "select", "semctl",
        "semget", "semop", "semtimedop", "sendfile",
        "sendmmsg", "sendmsg", "sendto", "set_gid",
        "set_robust_list", "set_tid_address", "setdomainname",
        "setgid", "setgroups", "sethostname", "setitimer",
        "setpgid", "setpriority", "setregid", "setresgid",
        "setresuid", "setreuid", "setrlimit", "setsid",
        "setsockopt", "setuid", "shmctl", "shmdt",
        "shmget", "shutdown", "sigaltstack", "signalfd4",
        "socket", "socketpair", "splice", "stat", "statfs",
        "statx", "symlink", "symlinkat", "sync",
        "sync_file_range", "sysinfo", "tee", "tgkill",
        "time", "timer_create", "timer_delete",
        "timer_getoverrun", "timer_gettime", "timer_settime",
        "timerfd_create", "timerfd_gettime", "timerfd_settime",
        "tkill", "truncate", "umask", "uname", "unlink",
        "unlinkat", "unshare", "utimensat", "utimes",
        "vfork", "vmsplice", "wait4", "waitid", "write",
        "writev"
      ],
      "action": "SCMP_ACT_ALLOW"
    }
  ]
}
```

To apply this profile:

```bash
$ docker run --security-opt seccomp=node-seccomp.json my-app
```

---

## 🏗️ Let's Put It All Together: Secure Dockerfile

Our production-ready secure Dockerfile template, which covers all the steps discussed and includes proper signal handling with `tini` integration, is as follows:

```dockerfile
# Stage 1: Build
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:20-slim
RUN groupadd --system --gid 1000 appuser && \
    useradd --system --uid 1000 --gid appuser appuser

WORKDIR /app
# Copy files directly with non-root user ownership
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --chown=appuser:appuser . .

USER appuser
EXPOSE 3000

# Install tini for signal management
RUN apt-get update && apt-get install -y --no-install-recommends tini && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server.js"]
```

Container security is one of those topics we postpone until something bad happens, but fixing it retroactively is the most painful thing. Implementing these four steps (non-root user, dropping capabilities, read-only filesystem, and seccomp) during the initial setup phase is free and saves you from future security headaches.

## 🔗 Related Posts
- [Configuring Nginx as a Reverse Proxy](/en/nginx-ters-vekil-sunucu-yapilandirmak/)
- [Diet for Fat Docker Images: Journey from 1.2 GB to 78 MB](/en/docker-imaj-boyutu-kucultme-rehberi/)
- [Linux TCP Tuning and Kernel Settings for Node.js Microservices](/en/linux-tcp-tuning-node-js-microservices/)

[^1]: Linux capabilities divide root privileges into smaller, distinct rights distributed to processes.
[^2]: Secure Computing Mode; filters system calls to apply restrictions at the kernel level.
