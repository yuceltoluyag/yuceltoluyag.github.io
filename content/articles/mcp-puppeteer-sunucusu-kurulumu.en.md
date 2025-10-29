Title: Easily Start Browser Automation with MCP: Puppeteer Server Setup
Date: 2025-04-17 14:00
Modified: 2025-08-11 22:59
Category: Geliştirme Araçları
Tags: mcp, puppeteer, npx, browser automation, nodejs, tarayıcı otomasyonu, yapay zeka, mcp kurulumu
Slug: mcp-puppeteer-sunucusu-kurulumu
Authors: yuceltoluyag
Status: published
Summary: In this article, installing mcp in Continue Plugin
Template: article
Image: images/mcp-puppeteer-sunucusu-kurulumu-xl.webp
Lang: en

**Want to start *browser automation* using MCP (Model Context Protocol)? Forget confusing setup steps! In this guide, I'll show you step by step how to **run an MCP server with Puppeteer support** with just a single `npx` command. And all this on Windows environment! 💻

By reading this article to the end, you'll understand how LLMs (Large Language Models) perform operations through a real browser and be able to easily integrate it into your own development environment.

---

## What is MCP and Why is it Important?

**Model Context Protocol (MCP)** is a protocol that facilitates communication between artificial intelligence models and various context providers (code editor, terminal, browser, etc.).

So why is it so important?

- 🤖 Enables LLMs to navigate in browsers.
- 🧠 Provides advanced code completion and documentation capabilities.
- 🔧 Increases productivity with end-to-end integration.

---

## What is Puppeteer?

[Puppeteer](https://pptr.dev/){: target="_blank" rel="noopener noreferrer"} is a Node.js library that allows you to programmatically control Chrome/Chromium browser.

With Puppeteer:
- You can navigate web pages,
- Take screenshots,
- Fill out forms,
- Crawl page content.

And with MCP, it's possible to delegate this to LLMs!

---

## Problem: Lack of Quick Setup

Starting browser automation usually requires complex configurations. This can be discouraging for beginners.

Also, the wrong `npx` command can frustrate you with errors like `entrypoint not found`. The purpose of this guide is to eliminate this problem **with a simple and working solution**.

---

## Solution: Starting Puppeteer Server with Single Command ✅

### 1. Prerequisites

Make sure the following software is installed on your system:

- **Node.js** (at least v18+)
- `npx` command (comes with Node)

To check, type this in terminal:
```bash
node -v
npx -v
```

---

### 2. Starting Server with `npx`

The command is very simple. Open terminal in Windows environment and type the following:

```bash
npx -y @modelcontextprotocol/server-puppeteer
```

🚀 This command downloads the required package and starts the browser-supported MCP server. When it works correctly, you'll see output similar to this in terminal:

```text
[MCP] Puppeteer server listening on port 4455...
```

Browser also opens automatically (not headless).

---

### 3. Configuration with YAML (Optional)

For advanced usage, you can add this server to `mcpServers` blocks:

```yaml
mcpServers:
  - name: puppeteer
    command: cmd
    args:
      - /c
      - npx
      - -y
      - "@modelcontextprotocol/server-puppeteer"
```
I'm using it in Continue plugin as follows, together with ollama
```yaml
name: Local Assistant
version: 1.0.0
schema: v1
models:
  - name: deekseek-r1
    provider: ollama
    model: deepseek-r1
  - name: Qwen 2.5 Coder 7b
    provider: ollama
    model: qwen2.5-coder:7b
    roles:
      - autocomplete
context:
  - provider: code
  - provider: docs
  - provider: diff
  - provider: terminal
  - provider: problems
  - provider: folder
  - provider: codebase
docs:
  - name: Pelican
    faviconUrl: ""
    startUrl: https://docs.getpelican.com/en/latest/quickstart.html

mcpServers:
  - name: browser-tools
    command: cmd
    args:
      - /c
      - npx
      - -y
      - "@agentdeskai/browser-tools-mcp@1.2.0"
  - name: puppeteer
    command: cmd
    args:
      - /c
      - npx
      - -y
      - "@modelcontextprotocol/server-puppeteer"

```
This way config-based startups are possible. 🔧

---

## Common Errors and Solutions 🧯

### `mcp-server-puppeteer is not recognized...`

This error usually occurs when `npx` package is called incorrectly. Only solution:

✅ Run `@modelcontextprotocol/server-puppeteer` package directly with `npx`.

---

## Real Life Usage Scenarios

- 📄 Retrieving dynamic content from documents with browser
- 🛠️ Making web application tests LLM-based
- 💬 Chatbots retrieving information from live pages

With MCP, all these operations can be done **without writing any extra code**!

---

## Conclusion and Call to Action 🎯

**Starting MCP with Puppeteer server has never been this easy.**

You can set up a powerful browser-supported LLM environment with a single command. By applying this article, you can take a step ahead in your code-based projects.

📣 If this guide helped you, don't forget to leave a comment and follow the blog! I'll explain more LLM integrations in new articles.

---

If you're ready, now open your terminal and run the command:  
```bash
npx -y @modelcontextprotocol/server-puppeteer
```

Happy coding! 🚀

---

[responsive_img src="/images/mcp-puppeteer-sunucusu-kurulumu-xl.webp" alt="Puppeteer Server Setup" /]