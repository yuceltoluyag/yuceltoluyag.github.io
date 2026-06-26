Title: Configuring Nginx as a Reverse Proxy
Date: 2026-06-26 02:40
Category: Sunucu
Tags: Nginx, Reverse Proxy, Linux, Web Geliştirme, Sunucu
Slug: nginx-ters-vekil-sunucu-yapilandirmak
Authors: yuceltoluyag
Status: published
Summary: A guide on positioning Nginx as a reverse proxy in front of Node.js and other web applications to enhance security, rate limiting, and performance.
Template: article
Lang: en

Last week, while editing the Nginx configuration of an old project, I realized that all API routes were throwing 404 errors just because of the trailing slash (`/`) character at the end of the `proxy_pass http://127.0.0.1:3000/;` line. I spent hours pulling my hair out to understand why. At one point, my wife called out from the other room: "Yücel, are you staying up late again just because of a tiny slash character?" I both laughed and remembered how these unglamorous (unfancy but vital) details in the web development world keep us awake at night.

When working on our local machines, everything is simple. Our Node.js application listens on port 3000, we type `localhost:3000` in the browser, and go about our business. But when production time comes, the game changes entirely. Now we have a domain name, HTTPS traffic on port 443, and potentially thousands of users coming from all over the internet.

Exposing the application itself directly to the internet is like tearing off your house's front door and letting anyone on the street walk straight into your bedroom. That's why, my friend, today we will talk about how to build that impassable Nginx wall between internet traffic and our application code.

---

## 🛑 What Problem Does Nginx Solve?

Application servers (Node.js, Python, Go, etc.) are great at running business logic. But handling wild traffic coming from the internet directly is not their job. Nginx exists to take the following burdens off the application:

* Terminate TLS (SSL) certificates and renew them before they expire.
* Serve static files (images, CSS, JS) at lightning speed directly from disk without tiring the application server.
* Prevent the application from hanging by keeping sockets open for clients with slow connections.
* Manage request size limits and timeouts.
* Prevent malicious scans using request rate limiting.
* Queue incoming requests while the application restarts to avoid downtime.

Nginx handles all these public-facing tasks, while the application behind it focuses solely on running its own code. (For example, to safely run and configure your Node.js application in Docker containers, you can check out my guide on [Running Node.js Containers Without Root in Docker](/en/docker-node-js-root-olmadan-calistirmak/).)

---

## 💡 The Core Idea: Reverse Proxy

We make Nginx the single point of entry for the system. The outside world only talks to Nginx (port 443, via TLS). Nginx then forwards the requests it receives to the application behind the scenes, which is accessible only via the local network (port 3000, via unencrypted HTTP).

```
client -> nginx (443, TLS) -> application (3000, plain http)
```

We call this setup a reverse proxy[^1]. Clients don't even know of the existence of the application behind.

---

## 🏗️ How Does Nginx Work?

Nginx consists of one **master** process and **worker** processes configured according to the CPU core count:

```
master process
   ├── worker process (core 1)
   ├── worker process (core 2)
   └── worker process (core 3)
```

The master process reads the configuration, binds ports, and manages the worker processes. The workers, which do the actual job, run with an event loop architecture. While old-school web servers (like Apache's classic model) open a separate thread for each connection, Nginx can manage thousands of connections simultaneously using a single worker process and the Linux kernel's event notification mechanism (`epoll`)[^2].

Because of this, a slow or idle client costs Nginx almost nothing. Nginx absorbs these slow connections like a sponge and passes only fully prepared requests to the application behind.

---

## 📁 Server and Location Blocks

The foundation of Nginx configuration relies on `server` and `location` blocks.

### Server Block

Defines how traffic coming for a domain and port will be handled:

```nginx
server {
    listen 443 ssl;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

### Location Block

Decides what to do based on the path of the incoming request:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:3000;
}

location /static/ {
    root /var/www/app;
}
```

Files under `/static/` are read directly from disk and sent. The application server is never even aware of these requests.

---

## ⚡ proxy_pass and the Trailing Slash (/) Detail

That famous slash rule that kept me awake at night is this:

```nginx
# Scenario A: Slash present
location /api/ {
    proxy_pass http://127.0.0.1:3000/;
}
```

```nginx
# Scenario B: No slash
location /api/ {
    proxy_pass http://127.0.0.1:3000;
}
```

!!! warning "Critical Detail: The Slash (/) Ayrıntısı in the proxy_pass Line! ⚠️"
    If there is a `/` at the end of the `proxy_pass` line (Scenario A), Nginx crops the matching `/api/` prefix, and the request `/api/users` is forwarded to the application as `/users`.
    
    If there is no `/` at the end (Scenario B), Nginx forwards the path exactly as it is without modifying it, and the request `/api/users` goes to the application as `/api/users`. This tiny character difference can cause your API routes to return 404!

---

## ℹ️ Forwarding Client Information to the Back

Since the application only talks to Nginx, by default it thinks all requests come from `127.0.0.1`. This breaks logging and security checks. We must forward the real client information using headers:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;

    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

* `Host`: Forwards the original domain requested by the client.
* `X-Real-IP`: Carries the direct IP address of the client.
* `X-Forwarded-For`: Carries the entire proxy IP chain the request passed through.
* `X-Forwarded-Proto`: Informs the application whether the original request was HTTP or HTTPS.

---

## 🔌 WebSocket Support

Standard HTTP forwarding cannot carry WebSocket connections. For WebSocket handshakes, we must add upgrade headers:

```nginx
location /ws/ {
    proxy_pass http://127.0.0.1:3000;

    proxy_http_version 1.1;
    proxy_set_header Upgrade    $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

---

## 🗄️ Buffering and Timeouts

Nginx pulls responses from the application into a buffer by default. While the application hands the response to Nginx in milliseconds and goes back to other tasks, Nginx drips this response to the client slowly.

However, in cases requiring instant data streaming (like Server-Sent Events or instant chat lines), this buffering must be turned off:

```nginx
location /events/ {
    proxy_pass http://app;
    proxy_buffering off;
}
```

Timeouts are critical for system stability:

```nginx
# Backend connection times
proxy_connect_timeout 5s;
proxy_send_timeout    60s;
proxy_read_timeout    60s;

# Client connection times
client_header_timeout 10s;
client_body_timeout   10s;
keepalive_timeout     65s;
```

By keeping the `proxy_connect_timeout` low (for example, 5 seconds), we can quickly return an error response (502) if an application crashes. (If you want to pull up your server's overall network performance and TCP limits even further, you can check out my post on [Linux TCP Tuning and Kernel Settings for Node.js Microservices](/en/linux-tcp-tuning-node-js-microservices/).)

---

## 🚀 HTTP/2 and Response Compression (gzip)

The HTTP/2 protocol allows concurrent carriage of multiple requests over a single TCP connection. Enabling this on Nginx is just a single line:

```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name example.com;
}
```

We can also reduce network load by compressing text-based responses like HTML, CSS, JS, and JSON:

```nginx
gzip on;
gzip_types text/css application/javascript application/json image/svg+xml;
gzip_min_length 1024;
gzip_comp_level 5;
```

---

## 🛡️ Security and Rate Limiting

To prevent abuse of application routes (especially heavy routes like login or search), we use Nginx's rate limiting feature:

```nginx
http {
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
}

server {
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        limit_req_status 429;
        proxy_pass http://app;
    }
}
```

Here, we set a limit of 10 requests per second based on the user's IP, and allowed a tolerance up to 20 requests for temporary bursts. Clients exceeding the limit will directly receive a `429 Too Many Requests` status code.

Hiding the Nginx version number also strengthens our hand in security scans:

```nginx
server_tokens off;
```

To prevent your site from being opened inside iframe elements on other sites (Clickjacking attacks), we must add the following headers:

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Content-Security-Policy "frame-ancestors 'self'" always;
```

---

## 🛠️ Production-Ready Example Nginx Configuration

A complete `nginx.conf` template containing all these features we explained, ready for production:

```nginx
worker_processes auto;
worker_rlimit_nofile 65535;

events {
    worker_connections 16384;
}

http {
    server_tokens off;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_min_length 1024;

    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    upstream app {
        server 127.0.0.1:3000;
        server 127.0.0.1:3001; # Second server for load balancing
    }

    # Redirect HTTP to HTTPS
    server {
        listen 80;
        server_name example.com;
        return 301 https://$host$request_uri;
    }

    # Main HTTPS Server
    server {
        listen 443 ssl;
        http2 on;
        server_name example.com;

        ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

        client_max_body_size 25m;

        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header Content-Security-Policy "frame-ancestors 'self'" always;

        # Serve static files directly from disk
        location /static/ {
            root /var/www/app;
            expires 30d;
        }

        # API requests go to proxy with rate limit
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            limit_req_status 429;

            proxy_pass http://app;

            proxy_set_header Host              $host;
            proxy_set_header X-Real-IP         $remote_addr;
            proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_read_timeout 60s;
        }

        # All other requests are routed to the application
        location / {
            proxy_pass http://app;

            proxy_set_header Host              $host;
            proxy_set_header X-Real-IP         $remote_addr;
            proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## ⚙️ Nginx Management and Commands

After making changes to the configuration, always test it before restarting Nginx:

```bash
$ nginx -t
```

If the test is successful, you can reload the configuration silently without dropping current connections:

```bash
$ nginx -s reload
```

To inspect errors, following the error logs in real-time is the most practical way:

```bash
$ tail -f /var/log/nginx/error.log
```

Placing Nginx in front of the application splits the responsibilities. Your application only runs its code; Nginx shoulders all the other heavy public-facing tasks and lets the system breathe.

## 🔗 Related Posts
- [Running Node.js Containers Without Root in Docker](/en/docker-node-js-root-olmadan-calistirmak/)
- [Linux TCP Tuning and Kernel Settings for Node.js Microservices](/en/linux-tcp-tuning-node-js-microservices/)

[^1]: An intermediary server that stands between clients and servers, receiving incoming requests and routing them to backend servers.
[^2]: A high-performance event notification mechanism used by the Linux kernel to monitor input/output (I/O) events.
