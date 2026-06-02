Title: Dieting for Bloated Docker Images: A Journey from 1.2 GB to 78 MB
Date: 2026-05-29 04:10
Category: Sunucu
Tags: docker, nodejs, typescript, container, devops, sorun-giderme, sunucu
Slug: docker-imaj-boyutu-kucultme-rehberi
Authors: yuceltoluyag
Status: published
Summary: Bloated Docker images slow down CI/CD processes and increase storage costs. I'm sharing how I incrementally reduced a Node.js + TypeScript app's image to 78 MB.
Template: article
Lang: en
Image: images/docker-slim.png

While tinkering with the images of services running in my home lab, I noticed something, folks: the Docker image for our trusty Node.js + TypeScript application was taking up a whopping 1.21 GB on disk. It's almost comical; we're consuming so much space on the server for a JavaScript project whose compiled output is a mere 4 MB.

Bloated Docker images are, in reality, a hidden tax paid silently by every team deploying containers. Slowing CI/CD pipelines, sluggish deployment times, increasing security vulnerabilities, and ultimately, ballooning storage (registry) bills... Most developers wave this off, saying, "There's nothing to be done, the Node.js ecosystem is just this bloated." But we've chewed through our fair share of terminals, my friends, and giving up isn't in our DNA.

After a few hours of work, I'm sharing, with all the measurements, how I shrunk this beast, destined for production, down to 78 MB step-by-step, without the slightest impact on the application's functionality.

![Shrinking Docker Image Size](/images/docker-slim.png)

## Starting Point: A Naive Dockerfile (1.21 GB)

This is the first Dockerfile most teams write. Does it work? Yes. But almost every line is a waste.

```dockerfile
FROM node:22

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

After building this and checking its size, the situation is dire:

```bash
yuceltoluyag@archlinux:~$ docker build -t app:naive .
yuceltoluyag@archlinux:~$ docker images app:naive
REPOSITORY   TAG     SIZE
app          naive   1.21GB
```

Let's roll up our sleeves and get to work.

## Step 1: Changing the Base Image (1.21 GB -> 412 MB)

The original `node:22` tagged image is Debian-based and includes tons of compiler tools needed during the build phase that we won't even look at during runtime. The `slim` tagged image, on the other hand, trims away a large portion of this excess.

| Image Version | Size |
| :--- | :--- |
| node:22 | 1.21 GB |
| node:22-slim | 412 MB |
| node:22-alpine | 178 MB |

While the Alpine version appears much smaller, it uses musl libc. Pure JavaScript projects run smoothly on Alpine. However, if your dependencies include native modules like `bcrypt` or `sharp` that are compiled with C/C++, musl libc might cause you headaches[^1]. Therefore, for a realistic production environment, proceeding with the `slim` image is the safest bet.

## Step 2: Leaving Unnecessary Files at the Door (`.dockerignore`) (412 MB -> 388 MB)

When Docker copies files, if it doesn't apply filters, it directly writes your local `node_modules` folder, `.git` history, test files, and even sensitive local development `.env` files into the image's layers.

We'll immediately create a `.dockerignore` file in the project's root directory to get rid of unnecessary bloat:

```
node_modules
npm-debug.log
.git
.gitignore
.env*
.vscode
.idea
coverage
dist
build
*.md
test
__tests__
Dockerfile*
.dockerignore
```

This small file not only reduces the size but also prevents critical files like local `.env.development` from accidentally leaking into public registries.

## Step 3: The Magic of Multi-Stage Build (388 MB -> 198 MB)

We need a ton of development dependencies (dev dependencies) to compile TypeScript, run linters, and execute tests. But we don't need any of them to get the application running on the server.

This is where **Multi-Stage Build** comes into play. In the first stage (builder), we compile the application, and in the second stage (runtime), we only copy the compiled files and clean libraries.

```dockerfile
# ---- Builder Stage ----
FROM node:22-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
RUN npm prune --omit=dev

# ---- Runtime Stage ----
FROM node:22-slim
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/index.js"]
```

Here, we made two critical moves:
* Instead of `npm install`, we used `npm ci`. This command bases itself on the `package-lock.json` file and provides a much faster and more consistent installation.
* After compilation, we pruned developer libraries using `npm prune --omit=dev`. This command alone halved the size of `node_modules`.

## Step 4: Correctly Triggering Layer Caching (Same size, 5x faster build)

This step doesn't reduce image size, but it's the most critical tactic to turbocharge our CI/CD processes, my friend. Docker images are built in layers. If you write the `COPY . .` command before the `npm ci` command, even a single line change in your code will invalidate Docker's cache, and Docker will attempt to download hundreds of packages from scratch every time.

To prevent this, as we did in the step above, we should first copy only the `package*.json` files and install the libraries, then copy the code:

```dockerfile
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
```

For our project with approximately 600 dependencies, the cold build time was 94 seconds. With this minor change in placement, when we only changed the application code, the build time dropped to 18 seconds. Calculate the time saved with every PR, every deploy!

## Step 5: Docking at the Alpine Port at Runtime (198 MB -> 96 MB)

We used the Debian-based `slim` image during the build phase to avoid compatibility issues. So why not switch to Alpine for runtime? Our compiled pure JavaScript code, if it doesn't call C/C++ binaries that are specific to glibc in the background, doesn't care one bit about the operating system.

```dockerfile
# ---- builder ----
FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --omit=dev

# ---- runtime ----
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

If you're using native modules and want to use Alpine at runtime, you'll need to select the `node:22-alpine` base image in the builder phase as well and perform the compilation with commands like `apk add --no-cache python3 make g++`.

## Step 6: Shutting Down the Server: The Distroless Transition (96 MB -> 78 MB)

We've reached the pinnacle. Google's **Distroless** images contain only the Node.js runner and SSL certificates. There's no shell (bash/sh), no package manager, and no tools like curl. This way, even if an attacker manages to infiltrate the container during a cyber attack, they won't find a terminal to execute commands. Naturally, the size shrinks down to 78 MB.

```dockerfile
# ---- runtime ----
FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["dist/index.js"]
```

!!! warning "Attention! No Shell When Using Distroless"
    Since Distroless images do not have a shell, you cannot connect and inspect the container using `docker exec -it container sh`. If you need to debug, you can use the version with the `:debug` tag of the same image (this version includes a BusyBox shell). In a production environment, you should stick to the standard distroless version in compliance with security rules. Also, because there's no shell, it's mandatory to use the exec form in the `CMD` field and provide the script path directly without writing `node`.

## General Evaluation Table

Let's look at the impact of our improvements on image size collectively:

| Stage | Base Image | Image Size | Savings Ratio |
| :--- | :--- | :--- | :--- |
| Initial (Naive) | node:22 | 1.21 GB | - |
| 1. Slim Base Image | node:22-slim | 412 MB | %67 |
| 2. .dockerignore | node:22-slim | 388 MB | %6 |
| 3. Multi-Stage + Prune | node:22-slim | 198 MB | %49 |
| 4. Layer Caching | node:22-slim | 198 MB | (Speed Gain) |
| 5. Alpine Runtime | node:22-alpine | 96 MB | %52 |
| 6. Distroless Transition | distroless/nodejs22 | 78 MB | %19 |

At the end of the day, we achieved a **94% reduction in size**, folks. The image became a full 15 times smaller.

## What We Didn't Choose

There are also methods frequently recommended on some platforms that we didn't include in our list due to increased complexity:

* **docker-slim:** A fantastic tool that analyzes and shrinks images dynamically. However, in a production environment, it might consider a dependency in a rarely accessed code block unnecessary and delete it. Debugging live issues is no fun.
* **pkg or nexe:** Compiles the application into a single binary. However, it freezes the Node.js version and breaks dynamic import structures. If you want static binary flexibility, you should use Go or Rust instead of Node.js.
* **scratch:** Theoretically great, but in practice, it will lead to a week of battling SSL certificates, timezone data (tzdata), and DNS resolvers. Distroless eliminates all this hassle.

You can also relieve your servers and speed up your CI/CD pipelines by applying these steps in your own projects.

Stay healthy!

---

### 🔗 Other Notes from the Lab

Here are some other articles that might be useful to you while tinkering with systems, improving server performance, and lightening containers:

* [Docker Installation on Arch Linux – Step-by-Step Guide](/en/arch-linux-docker-kurulumu/)
* [Linux TCP Tuning and Kernel Settings for Node.js Microservices](/en/linux-tcp-tuning-node-js-microservices/)
* [Throw Away Your Disks: Hosting a Site on RAM with Raspberry Pi Zero](/en/raspberry-pi-zero-ram-diskless-web-server/)
* [Test Your Pelican Static Site with Playwright](/en/pelican-statik-site-playwright-test/)

[^1]: Architectural differences between Musl libc and glibc can lead to unexpected errors in Node.js packages with C/C++ dependencies during compilation or at runtime.