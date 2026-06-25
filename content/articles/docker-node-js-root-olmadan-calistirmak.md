Title: Docker'da Node.js Konteynerlerini Root Olmadan Çalıştırmak
Date: 2026-06-26 02:30
Category: Sunucu
Tags: Docker, Node.js, Güvenlik, DevOps, Konteyner
Slug: docker-node-js-root-olmadan-calistirmak
Authors: yuceltoluyag
Status: published
Summary: Node.js Docker konteynerlerini root yetkilerinden arındırarak Linux Capabilities, salt okunur dosya sistemi ve seccomp ile güvenli hale getirme rehberi.
Template: article
Lang: tr
Translation: false

Dün gece çocuklar uyuduktan sonra, eski bir projenin Dockerfile'ını incelerken birden sırtımdan aşağı soğuk sular boşaldı. Yıllar önce hızlıca ayağa kaldırıp yayına aldığımız o Node.js sunucusunda ne bir `USER` komutu vardı ne de bir yetki sınırlandırması. Konteyner doğrudan root olarak çalışıyordu. Yani o dönem `lodash` veya `express` üzerinde çıkacak tek bir RCE (uzaktan kod çalıştırma) açığı, saldırgana konteyner içinde tam root yetkisi vermeye yetecekti. Oradan sonrası ise kernel zafiyetleri veya yanlış yapılandırılmış seccomp ayarları üzerinden ana makineye (host) sızmaya bakıyordu.

İnternetteki rehberlerin yarısından fazlasında göreceğin o meşhur Dockerfile şablonu tam olarak şöyledir:

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

Burada root olmayan bir kullanıcı yok. Linux yetenekleri (capabilities) düşürülmemiş. Salt okunur dosya sistemi veya seccomp kısıtlaması hak getire. Docker build alırsın, tıkır tıkır çalışır, tüm testlerden geçer. Ancak tek bir `curl` komutuyla konteynerden çıkıp ana sunucuyu ele geçirebilecek bir saldırı zincirine kapı aralar.

Birçoğumuz Docker konteynerlerinin tamamen izole ve güvenli olduğunu varsayariz. Ancak default ayarlarıyla bırakılmış bir konteyner, kapısı açık bırakılmış ama önüne göstermelik bir güvenlik kulübesi konulmuş bir siteye benzer. İşte bu yüzden dostum, bugün bu açığı kapatacak, Node.js konteynerlerini zırh gibi koruyacak dört adımdan bahsedeceğiz: Linux yeteneklerini kısıtlamak, root olmayan kullanıcıya geçmek, dosya sistemini salt okunur yapmak ve seccomp profili uygulamak.

---

## 🔑 Konteyner İçindeki Root Neden Hâlâ Root'tur?

Docker'ın konteynerleri tamamen izole ettiği düşüncesi tehlikeli bir yanılgıdır. Evet, varsayılan olarak bazı Linux yetenekleri kapatılır ve temel bir seccomp filtresi uygulanır. Ancak Docker'ın varsayılan olarak aktif bıraktığı yetenekler listesi oldukça cömerttir:

`CAP_CHOWN`, `CAP_DAC_OVERRIDE`, `CAP_FSETID`, `CAP_FOWNER`, `CAP_MKNOD`, `CAP_NET_RAW`, `CAP_SETGID`, `CAP_SETUID`, `CAP_SETFCAP`, `CAP_SETPCAP`, `CAP_NET_BIND_SERVICE`, `CAP_SYS_CHROOT`, `CAP_AUDIT_WRITE`, `CAP_KILL`

Bu yetenekler arasında dosya izinlerini tamamen yok sayan `CAP_DAC_OVERRIDE`, ağda sahtecilik yapılmasına izin veren `CAP_NET_RAW` ve konteyner dışına kaçış sağlayan `CAP_SYS_CHROOT` gibi tehlikeli haklar yer alıyor. Node.js sürecini ele geçiren bir saldırgan, bu yeteneklerin tamamına sahip olur.

Saldırı şu şekilde gerçekleşir:
1. Projedeki bir bağımlılıkta bulunan açık sayesinde saldırgan diske dosya yazar.
2. Konteyner root olarak çalıştığı için bu dosya `uid 0` yetkisiyle kaydedilir ve `/usr` veya `/sbin` altındaki sistem dosyalarının üzerine yazılabilir.
3. Saldırgan, `/proc` dizinini ve `CAP_SYS_CHROOT` yeteneğini kullanarak konteyner sınırlarından dışarı kaçar.
4. Artık ana sunucuda tam yetkili bir arka kapı açılmıştır.

Aşağıdaki adımlarla bu zincirin her halkasını tek tek kıracağız.

---

## 🛠️ Adım 1: Tüm Linux Yeteneklerini Kapatın, Sadece Gerekenleri Açın

İlk güvenlik önlemimiz, konteynere verilen tüm Linux yeteneklerini[^1] sıfırlayıp sadece uygulamanın çalışması için zorunlu olanları tanımlamaktır.

Standart bir Node.js HTTP sunucusu için, eğer 1024'ten küçük ayrıcalıklı bir portu dinlemiyorsanız hiçbir Linux yeteneğine ihtiyacınız yoktur. Uygulamanız 3000 veya daha yüksek bir port üzerinden ayağa kalkıyorsa, tüm yetenekleri kapatabilirsiniz.

**Docker Compose Yapılandırması:**

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

**Docker CLI Komutu:**

```bash
$ docker run --cap-drop=ALL my-app
```

Tüm yetenekleri kapattığınızda Node.js'in diske dosya yazarken veya okurken hata verdiğini görürseniz bu durum yeteneklerle ilgili değil, dosya izinleriyle (POSIX permissions) ilgilidir. Onu da bir sonraki adımda çözeceğiz.

---

## 👤 Adım 2: Root Olmayan (Non-Root) Kullanıcıya Geçin

Bu adım, konteyner güvenliğindeki en kritik adımdır. Konteyner içinde `uid 1000` (root olmayan bir kullanıcı) olarak çalışan bir süreç, `/usr/bin` altına dosya yazamaz, `/etc/passwd` dosyasını değiştiremez ve yetkisiz sistem çağrıları yapamaz.

Dockerfile üzerinde iki satırlık bir değişiklikle bunu sağlayabiliriz:

```dockerfile
FROM node:20-slim

# Root olmayan kullanıcı ve grubu oluşturuyoruz
RUN groupadd --system --gid 1000 appuser && \
    useradd --system --uid 1000 --gid appuser appuser

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \
    # Dosya sahipliğini yeni kullanıcıya veriyoruz
    chown -R appuser:appuser /app
COPY --chown=appuser:appuser . .

USER appuser
EXPOSE 3000
CMD ["node", "server.js"]
```

Eğer Alpine tabanlı hafif imajlar (`node:20-alpine`) kullanıyorsanız, kullanıcı oluşturma komutları değişiklik gösterir:

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

**Root olmayan kullanıcıya geçildiğinde neler kırılabilir?**

*   **Log dosyaları:** Uygulamanız `/var/log` altına yazmaya çalışıyorsa yetki hatası alırsınız. Logları stdout/stderr akışlarına yönlendirin veya `/app` içinde izin verdiğiniz bir alt klasöre yazın.
*   **Unix soket dosyaları:** Eğer `/var/run` altında soket dosyası oluşturuyorsanız, sahipliği `appuser` olan bir dizin tercih edin.
*   **Lifecycle scriptleri içeren paketler:** Bazı npm paketleri kurulum sırasında root yetkisi gerektiren komutlar çalıştırabilir. Bu yüzden paket kurulumlarını (`npm ci`) root kullanıcısı ile yapıp, sonrasında dosyaları `chown` ile taşıyarak çalıştırmak en temiz yöntemdir.

---

## 💾 Adım 3: Kök Dosya Sistemini Salt Okunur (Read-Only) Yapın

Konteynerin kök dosya sistemini salt okunur olarak bağladığımızda, saldırganın kod enjekte etme veya sistem konfigürasyonlarını manipüle etme şansını tamamen yok ederiz.

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

**Kubernetes Pod Güvenlik Ayarı:**

```yaml
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 1000
    fsGroup: 1000
    readOnlyRootFilesystem: true
```

Kök dizini salt okunur yaptığımızda, Node.js'in çalışma anında yazmak zorunda olduğu `/tmp` gibi klasörleri bellek tabanlı geçici dosya sistemi olan `tmpfs` ile bağlarız. Böylece konteyner kapandığı anda tüm geçici dosyalar silinir.

---

## 🔒 Adım 4: Seccomp Profili Uygulayın

Seccomp (Secure Computing Mode)[^2], bir sürecin işletim sistemi çekirdeğine yapabileceği sistem çağrılarını (syscall) filtrelemeye yarar. Docker varsayılan olarak tehlikeli olan yaklaşık 50 sistem çağrısını engeller. Ancak biz bunu Node.js'in ihtiyaçlarına göre daha da daraltabiliriz.

Aşağıdaki `node-seccomp.json` profili, Node.js'in normal çalışmasını engellemeden gereksiz tüm çağrıları (örneğin reboot, swapon vb.) bloke eder:

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

Bu profili uygulamak için:

```bash
$ docker run --security-opt seccomp=node-seccomp.json my-app
```

---

## 🏗️ Hepsini Bir Araya Getirelim: Güvenli Dockerfile

Bahsettiğimiz tüm adımları ve sinyal yönetimini düzgün yapan `tini` entegrasyonunu içeren, üretime (production) hazır güvenli Dockerfile şablonumuz şöyledir:

```dockerfile
# 1. Aşama: Derleme (Build)
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 2. Aşama: Çalıştırma (Runtime)
FROM node:20-slim
RUN groupadd --system --gid 1000 appuser && \
    useradd --system --uid 1000 --gid appuser appuser

WORKDIR /app
# Dosyaları doğrudan root olmayan kullanıcının sahipliğinde kopyalıyoruz
COPY --from=builder --chown=appuser:appuser /app/node_modules ./node_modules
COPY --chown=appuser:appuser . .

USER appuser
EXPOSE 3000

# Sinyal yönetimi için tini kurulumu yapıyoruz
RUN apt-get update && apt-get install -y --no-install-recommends tini && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "server.js"]
```

Konteyner güvenliği, başımıza bir olay gelene kadar ertelediğimiz ama başımıza geldiğinde geriye dönük düzeltmesi en sancılı olan konulardan biridir. Konsept kurulum aşamasında bu dört adımı (root olmayan kullanıcı, yeteneklerin düşürülmesi, salt okunur dosya sistemi ve seccomp) uygulamak sıfır maliyetlidir ve sonrasında yaşanacak güvenlik sancılarının önüne geçer.

[^1]: Linux yetenekleri, root yetkilerini daha küçük parçalara bölerek işlemlere dağıtan güvenlik mekanizmasıdır.
[^2]: Secure Computing Mode; sistem çağrılarını filtreleyerek çekirdek düzeyinde kısıtlamalar uygulayan Linux güvenlik modülüdür.
