Title: Installing Docker on Arch Linux – A Step-by-Step Guide
Date: 2025-08-06 04:30 10:00
Modified: 2026-11-09 19:27
Category: Sunucu
Tags: arch linux, docker, container, kurulum, linux
Slug: arch-linux-docker-kurulumu
Authors: yuceltoluyag
Status: published
Summary: Install Docker Engine, Docker Compose, and Buildx on Arch Linux. Move Docker 29's containerd storage to a separate drive, configure the services, and learn the basic commands.
Template: article
Series: Docker
Series_index: 1
Lang: en
Image: images/arch-linux-docker-kurulumu-xl.webp
toot: https://mastodon.social/@yuceltoluyag/114989772931815244
bluesky: https://bsky.app/profile/yuceltoluyag.github.io/post/3lvtqxwlfyk2p

When I needed to reinstall Docker, this time I did not want to simply install the packages and start the service. As I had done before, I preferred to keep Docker images, container data, and my projects on a separate drive from the system SSD. That way, I would not fill up the system drive I use for games and development tools with Docker data.

In this guide, we'll install Docker Engine, Docker Compose, and Buildx on Arch Linux. Then we'll look at the containerd-based image storage introduced with Docker 29 and move Docker's data to a separate drive.

There is an important detail here: we cannot move all of Docker's data to another drive with a single setting. In new installations, image and container snapshot data is managed by containerd, while other persistent data is stored in Docker's own data directory. For this reason, we need to configure two separate locations.

I performed this installation on my own Arch Linux system. The versions below are from the installation I performed with pacman and the terminal output I collected afterward on November 9, 2026.

| Component | Installed version |
|---|---|
| Docker Engine | 29.9.3 |
| containerd | 2.4.2 |
| Docker Compose | 5.7.0 |
| Docker Buildx | 0.38.2 |
| File system | ext4 |

## 1. What is Docker?

Docker is a platform that lets us run applications and their dependencies in isolated environments called containers.

Unlike virtual machines, containers share the host system's Linux kernel. This lets us create isolated environments without running a separate operating system for each application.

Some of the main benefits Docker provides are:

- **Isolation:** Run applications in environments that are independent of one another.
- **Portability:** Use the same image in different Docker environments.
- **Dependency management:** Keep the packages and dependencies an application needs inside its image.
- **Easy deployment:** Manage multiple services through a single configuration with Docker Compose.

Docker is especially useful for software development, test environments, databases, and running your own server services.

## 2. Installing Docker on Arch Linux

Docker and the helper packages we need are available in the official Arch Linux repositories. That means we do not need to build packages from the AUR.

### 2.1. Update the system

First, let's update the system packages:

```bash
sudo pacman -Syu
```

Since Arch Linux uses a rolling release model, it is important to keep the system up to date before installing new packages.

### 2.2. Install the Docker packages

Let's install Docker Engine along with Docker Compose and Buildx:

```bash
sudo pacman -S docker docker-compose docker-buildx
```

What the packages we installed do:

| Package | Purpose |
|---|---|
| `docker` | Docker Engine and command-line client |
| `docker-compose` | Manages Compose configurations |
| `docker-buildx` | Provides BuildKit-based image-building tools |

During this process, the package manager also installs dependencies Docker needs, such as `containerd` and `runc`.

We will not start the Docker service as soon as the installation finishes. First, we'll decide which drive will hold the data.

## 3. Move Docker data to a separate drive

On my system, alongside the NVMe SSD where the operating system is installed, I have a second drive with a capacity of about 1 TB.

Docker images, containers, and volumes can use a significant amount of storage over time, so I did not want to keep them on the system drive. Instead, I kept the directory layout I had used before.

The directory structure we'll use:

```text
/mnt/steam_depo/Docker/
├── containerd/
├── docker/
└── projects/
```

What the directories are for:

- `containerd/`: Image content and container snapshot data.
- `docker/`: Other persistent data and volumes managed by Docker.
- `projects/`: Our own projects and Docker Compose files.

### 3.1. Docker 29 and the containerd image store

First, let's explain an important distinction.

In Docker Engine 29 and later, the containerd image store is the default storage backend for new installations. In this setup, containerd uses a snapshotter mechanism instead of the traditional Docker storage drivers.[^1]

In this case, Docker's default directories are split as follows:

| Data | Default directory |
|---|---|
| Image content | `/var/lib/containerd/` |
| Container snapshots | `/var/lib/containerd/` |
| Other Docker data and volumes | `/var/lib/docker/` |

The important point is that the `data-root` option in the Docker daemon configuration does not change the image storage area managed by containerd.

Therefore, if you only set `data-root` in `/etc/docker/daemon.json`, your images will remain in the containerd directory on the system drive by default.

To move both storage areas, we need to configure Docker daemon and containerd separately.

### 3.2. Check that the drive is mounted

First, let's make sure the target drive is actually mounted:

```bash
findmnt -T /mnt/steam_depo -o TARGET,SOURCE,FSTYPE,OPTIONS
```

To check the drive's capacity:

```bash
df -hT /mnt/steam_depo
```

On my system, the second drive uses the ext4 file system on `/dev/sda1` and is mounted at `/mnt/steam_depo`.

The following entry in `/etc/fstab` mounts the drive automatically:

```fstab
LABEL=steam_depo /mnt/steam_depo ext4 defaults,nofail 0 2
```

The `nofail` option allows the system to continue booting if the drive cannot be mounted. However, because we are moving Docker data to this drive, we do not want the services to run before it is mounted.

!!! warning "Warning! Don't start Docker before the drive is mounted."
    If Docker runs before the mount point is ready, data may accidentally be written to the system SSD. For this reason, we'll define a disk dependency through systemd in a moment.

### 3.3. Create the storage directories

Let's create the directories Docker needs:

```bash
sudo install -d -o root -g root -m 0711 \
    /mnt/steam_depo/Docker/containerd \
    /mnt/steam_depo/Docker/docker

mkdir -p /mnt/steam_depo/Docker/projects
```

We assign the two directories managed by Docker to the `root` user. The projects directory will belong to our regular user account.

This keeps Docker's files separate from the projects we work on.

### 3.4. Configure the Docker daemon

Docker daemon settings are stored in `/etc/docker/daemon.json`.

First, let's create the required configuration directories:

```bash
sudo install -d /etc/docker /etc/containerd
```

Then let's set Docker's data directory:

```bash
sudo tee /etc/docker/daemon.json <<'EOF'
{
  "data-root": "/mnt/steam_depo/Docker/docker"
}
EOF
```

This setting directs persistent data managed by Docker daemon to the directory we selected.

However, because we are using the containerd image store, we also need to change the location of images and snapshots separately.

!!! note "Note: If you already have a Docker installation"
    This guide assumes a clean installation. If you have used Docker before, do not delete your existing `daemon.json` or containerd configuration directly. Make a backup first, then edit the files while preserving your existing settings. Move data from the old storage directories only after the services have been stopped and the data has been backed up.

### 3.5. Configure the containerd data directory

Let's create the containerd configuration file:

```bash
sudo tee /etc/containerd/config.toml <<'EOF'
version = 4
root = "/mnt/steam_depo/Docker/containerd"
EOF
```

The `root` value sets the location of persistent data managed by containerd.

`version = 4` specifies the containerd configuration format. This is the latest configuration format supported by containerd 2.4.2.[^2]

This is the minimal configuration I use for a new, clean installation. If a `config.toml` file already exists, edit it while preserving the existing settings rather than overwriting it.

### 3.6. Define a disk dependency through systemd

We've changed the storage directories, but there is still an important detail: when the computer starts, we need to prevent Docker services from running before the second drive is mounted.

For this, we'll use systemd's `RequiresMountsFor` setting. It creates the necessary dependencies and startup ordering between a service and the mount units required to access the specified directory.[^3]

First, let's create the service configuration directories:

```bash
sudo install -d \
    /etc/systemd/system/containerd.service.d \
    /etc/systemd/system/docker.service.d
```

Let's create an override file for containerd:

```bash
sudo tee /etc/systemd/system/containerd.service.d/storage.conf <<'EOF'
[Unit]
RequiresMountsFor=/mnt/steam_depo/Docker/containerd
EOF
```

Let's do the same for the Docker service:

```bash
sudo tee /etc/systemd/system/docker.service.d/storage.conf <<'EOF'
[Unit]
RequiresMountsFor=/mnt/steam_depo/Docker/docker
EOF
```

This ensures that containerd and Docker will not start until the file system containing their respective data directories is mounted.

## 4. Start the Docker service

Our configuration is complete. First, let's reload the systemd configuration:

```bash
sudo systemctl daemon-reload
```

Then let's enable and start the Docker service:

```bash
sudo systemctl enable --now docker.service
```

There is no need to enable the containerd service separately because the Docker service unit already lists it as a dependency.

Let's check the status of both services:

```bash
systemctl is-active docker.service
systemctl is-active containerd.service
```

Both commands should return `active`.

## 5. Run Docker without sudo

By default, the Docker daemon runs with root privileges, and access to the Docker socket is restricted to the root user.

To avoid using `sudo` for every Docker command, we can add our user account to the `docker` group:

```bash
sudo usermod -aG docker "$USER"
```

For the change to take effect, fully log out of your desktop session and log back in.

Alternatively, start a new group session with:

```bash
newgrp docker
```

Let's check group membership:

```bash
groups
```

The output should include the `docker` group.

Now we can run Docker commands such as the following without `sudo`:

```bash
docker ps
```

!!! warning "Warning! The security implications of the docker group ⚠️"
    Membership in the `docker` group effectively grants root-level privileges. A user in this group can run privileged containers and gain extensive access to the host system. Only add users you trust to this group.

## 6. Verify the Docker installation

Let's not judge whether the installation succeeded only by checking the service status. We should also check that Docker is using the correct storage directories and can run a container.

### 6.1. Check the Docker data directories

First, let's see which directory Docker is using:

```bash
docker info --format 'Docker Root Dir: {{.DockerRootDir}}'
```

Expected output:

```text
Docker Root Dir: /mnt/steam_depo/Docker/docker
```

Now let's check the image storage backend in use:

```bash
docker info --format '{{.DriverStatus}}'
```

When using the containerd image store, we should see the following output:

```text
[[driver-type io.containerd.snapshotter.v1]]
```

This output shows that Docker is using the containerd snapshotter backend instead of the classic `overlay2` storage driver.

Let's inspect the containerd configuration, too:

```bash
sudo containerd config dump | grep -E '^(version|root|state) = '
```

On my system, the output was:

```text
version = 4
root = '/mnt/steam_depo/Docker/containerd'
state = '/run/containerd'
```

It is normal for the `state` directory to remain under `/run/containerd`. This directory is used for temporary runtime data. It should not be confused with the persistent storage directory, `root`.

Finally, let's check the systemd dependencies:

```bash
systemctl cat containerd.service docker.service | grep -E 'storage.conf|RequiresMountsFor'
```

We should see the `RequiresMountsFor` lines we created for both services.

### 6.2. Run the Hello World test

Now let's run Docker's official test image:

```bash
docker run --rm hello-world
```

Docker first looks for the image on the local system. If it cannot find it, Docker downloads it from Docker Hub and runs it in a container.

On a successful installation, we should see a message like this:

```text
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

This message shows that the Docker client can communicate with the daemon, download images, and run containers.

The `--rm` parameter automatically removes the container after the test finishes. The downloaded image remains in the local store.

The test completed successfully on my installation, and I received the `Hello from Docker!` message.

### 6.3. Check Compose and Buildx

Let's also check the versions of the plugins we installed:

```bash
docker compose version
docker buildx version
```

The output on my system was:

```text
Docker Compose version 5.7.0
github.com/docker/buildx 0.38.2
```

These checks confirm that Docker Engine, Compose, and Buildx are working.

### 6.4. Check disk usage

Finally, let's check that Docker data is actually being written to the second drive.

To view Docker's own disk usage report:

```bash
docker system df
```

We can see how much space images, containers, volumes, and the build cache are using.

To inspect directory usage on the file system:

```bash
sudo du -sh \
    /mnt/steam_depo/Docker/containerd \
    /mnt/steam_depo/Docker/docker
```

The results I got after the `hello-world` test:

```text
332K    /mnt/steam_depo/Docker/containerd
236K    /mnt/steam_depo/Docker/docker
```

These results confirmed that containerd's and Docker's persistent data directories were created on the selected second drive.

The output of `docker system df` does not need to exactly match the output of `du`. The two commands use different calculation methods and scopes. Therefore, it is more useful to consider both when checking disk usage.

## 7. Basic Docker commands

I've collected below the commands we'll need most often when using Docker.

| Command | Description |
|---|---|
| `docker ps` | Lists running containers. |
| `docker ps -a` | Lists all containers. |
| `docker image ls` | Lists local images. |
| `docker pull nginx` | Downloads the Nginx image. |
| `docker run --rm hello-world` | Runs and removes a test container. |
| `docker stop CONTAINER` | Stops a running container. |
| `docker rm CONTAINER` | Removes a container. |
| `docker image rm IMAGE` | Removes an image. |
| `docker system df` | Shows Docker disk usage. |
| `docker compose up -d` | Starts Compose services in the background. |
| `docker compose down` | Removes Compose containers and networks. |

To clean up unused images:

```bash
docker image prune
```

This command removes dangling images that are not in use. Before performing a more extensive cleanup, it is a good idea to check which data will be deleted.

!!! tip "Tip: Keep track of Docker disk usage"
    Images and container data can take up a significant amount of space over time. If you work on multiple projects, check usage with `docker system df` from time to time.

## 8. Common issues and solutions

### 8.1. Permission denied error

You may encounter the following error when running Docker commands:

```text
permission denied while trying to connect to the Docker daemon socket
```

First, check whether your user account is in the `docker` group:

```bash
groups
```

If it is not in the group list:

```bash
sudo usermod -aG docker "$USER"
```

Then fully log out of your desktop session and log back in.

### 8.2. Docker service does not start

If the Docker service cannot start, first inspect its status:

```bash
systemctl status docker.service
```

To view the Docker and containerd logs together:

```bash
journalctl -u docker.service -u containerd.service -b --no-pager
```

If you are using a separate drive, check whether the file system is mounted:

```bash
findmnt -T /mnt/steam_depo
```

Also check that the configuration files are valid:

```bash
sudo dockerd --validate --config-file=/etc/docker/daemon.json
```

To inspect the containerd configuration:

```bash
sudo containerd config dump
```

Rather than making random permission changes or deleting Docker data directories without knowing the cause of the error, it is better to inspect the logs first.

## 9. Conclusion

In this guide, we installed Docker Engine, Docker Compose, and Buildx on Arch Linux.

Instead of leaving the installation at its default settings, I adjusted it to suit my system's storage needs. To preserve space on the system SSD, I moved Docker's persistent data to my second drive.

Because of the containerd image store introduced with Docker 29, we needed to configure two separate storage locations for this. We set Docker's `data-root` option and containerd's `root` directory separately. We also used `RequiresMountsFor` to define the mount dependency through systemd.

As a result, Docker images, container snapshots, and other persistent data are stored under `/mnt/steam_depo/Docker/`, independently of the system SSD.

After installation, I verified that Docker was working correctly with the `hello-world` test, and confirmed that the helper tools were available by checking the Compose and Buildx versions.

I prefer keeping data managed by Docker in separate directories from my own projects. This makes it easier to track disk usage and manage different projects.

## Resources

- [ArchWiki – Docker](https://wiki.archlinux.org/title/Docker){: target="_blank" rel="noopener noreferrer"}
- [Docker Documentation – containerd image store](https://docs.docker.com/engine/storage/containerd/){: target="_blank" rel="noopener noreferrer"}
- [Docker Documentation – Docker daemon configuration](https://docs.docker.com/engine/daemon/){: target="_blank" rel="noopener noreferrer"}
- [Docker Documentation – Linux post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/){: target="_blank" rel="noopener noreferrer"}
- [containerd 2.4 – Configuration reference](https://containerd.org/docs/2.4/man/containerd-config.toml.5/){: target="_blank" rel="noopener noreferrer"}
- [systemd.unit – RequiresMountsFor](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html){: target="_blank" rel="noopener noreferrer"}

[^1]: The containerd image store is used by default for new installations of Docker Engine 29 and later. Installations upgraded from earlier versions may continue using their existing classic storage driver. In addition, `userns-remap` configuration has a separate limitation with the containerd image store. Before assuming that another system uses the same storage backend, check the current setup with `docker info --format '{{.DriverStatus}}'`.

[^2]: The containerd 2.4 configuration documentation identifies version 4 as the latest configuration format. Older configuration versions can also be converted automatically for backward compatibility.

[^3]: `RequiresMountsFor` creates `Requires` and `After` dependencies between a service and the mount units needed to access the specified path. This defines not only the service startup order, but also the requirement for the relevant file system.
