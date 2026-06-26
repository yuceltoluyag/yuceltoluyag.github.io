Title: Making HTTP Requests with Bash in Containers Without Curl (/dev/tcp)
Date: 2026-06-26 03:10
Category: Sunucu
Tags: Docker, Bash, HTTP, Linux, Sunucu, Hata Ayıklama
Slug: curl-olmayan-konteynerde-bash-ile-http-istegi-dev-tcp
Authors: yuceltoluyag
Status: published
Summary: When curl or wget is missing in a Docker container, we can use Bash's built-in /dev/tcp redirection to send raw HTTP requests.
Template: article
Lang: en

The other night, around 3 AM, I `exec`'d into one of our production microservices to check its health. My immediate plan was to run that classic `curl http://localhost:8080/health` command. But guess what? We had stripped down the image so much that there was no `curl`, no `wget`, and not a single technical tool to open a socket! I felt like a technician with tied hands in a bare server room. Right at that moment, I recalled a famous Bash trick I had read about years ago but never used in practice: the `/dev/tcp` redirection. Thanks to this method, without needing any external tools, I fired HTTP requests right from the container using only Bash and tested the connection in seconds.

Struggling inside a minimal container with no toolbox—just a dry shell—is like trying to fix an engine without even a screwdriver in your hand. That's why, my friend, we are going to talk in detail about how to stand up raw HTTP requests using only Bash's own capabilities, which will come to our rescue in these moments of despair.

---

## 🔌 Opening a TCP Socket with Bash

Normally, we'd use tools like `nc` (netcat), `telnet`, or `curl` to talk to a server over TCP. However, Bash natively possesses the ability to open a TCP/UDP socket at the OS level.

We can send an HTTP GET request to a target using only this three-line command sequence:

```bash
$ exec 3<>/dev/tcp/service/8642
$ printf 'GET /health HTTP/1.1\r\nHost: service\r\nConnection: close\r\n\r\n' >&3
$ cat <&3
```

Let's see what is happening here step-by-step:

1. `exec 3<>/dev/tcp/service/8642`: We tell Bash to open a TCP socket to port `8642` of the host `service` in both read and write directions, and bind this socket to file descriptor `3`.
2. `printf '...' >&3`: We write our raw HTTP/1.1 request into file descriptor `3` (meaning, the socket we opened).
3. `cat <&3`: We read the response coming from the socket and print it to the screen (stdout).

When you run these commands, you'll see the HTTP status code, HTTP headers, and the response body returned by the server in full.

---

## 🔒 Adding Authorization Headers

If the service you want to test is closed to anonymous requests and needs an `Authorization` header, you can add this header inside the `printf` command, paying close attention to the line-ending characters (`\r\n`):

```bash
$ exec 3<>/dev/tcp/service/8642
$ printf 'GET /v1/models HTTP/1.1\r\nHost: service\r\nAuthorization: Bearer %s\r\nConnection: close\r\n\r\n' "$API_KEY" >&3
$ cat <&3
```

The most critical point to watch out for is that each HTTP header must end with `\r\n` (carriage return and line feed), and double `\r\n\r\n` must be left at the very end to signal the server that the request body is complete.

---

## 🧠 What is /dev/tcp and How Does It Work?

There is a detail here that won't escape sharp eyes: there is no directory or file named `/dev/tcp` in the Linux filesystem. If you write `ls /dev/tcp` in the terminal, the system will throw a file not found error.

That's because the `/dev/tcp/host/port` path is not a real file, but a virtual redirection recognized and caught specifically by Bash internally.[^1] When Bash sees this special string, instead of looking for a file on disk, it triggers the `connect(2)` system call in the background to establish a direct TCP connection to the respective IP and port.

!!! warning "Critical Detail: Connection: close Header Is Required! ⚠️"
    In the HTTP/1.1 protocol, connections are kept open by default (keep-alive).[^2] If you don't add the `Connection: close` header to the request, the server won't close the connection after sending the response. In this case, the `cat <&3` command will hang forever waiting for new data, locking up your terminal. We must explicitly request the connection to close to prevent this.

!!! note "Limitation: No TLS (HTTPS) Support 🔒"
    This virtual device only opens raw (plaintext) TCP sockets. This means you cannot test secure connections starting with `https://` directly using this method; there is no cryptography layer to handle the SSL/TLS handshake.

!!! note "Not POSIX Standard ⚙️"
    This feature is specific to Bash. It won't work on Debian's default shell `dash` (`/bin/sh`) or `zsh`. So, you must make sure to put `#!/bin/bash` at the very beginning of your scripts, my friend.

Keeping containers secure and tiny by leaving out unnecessary tools is an excellent DevOps practice. But when you get stuck in these minimal environments, Bash's hidden capability lets you quickly test the state of your services without installing any packages.

## 🔗 Related Posts
- [Running Node.js Containers Without Root in Docker](/en/docker-node-js-root-olmadan-calistirmak/)
- [Diet for Fat Docker Images: Journey from 1.2 GB to 78 MB](/en/docker-imaj-boyutu-kucultme-rehberi/)

[^1]: This is the network redirection feature activated via the `--enable-net-redirections` parameter during Bash's compilation.
[^2]: The rule in the HTTP/1.1 protocol where the TCP connection is kept open rather than closed after every request.
