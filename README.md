# Introduction

This is my personal blog using the [pelican project](https://docs.getpelican.com/en/latest/).

I designed the theme using [pico.css](https://picocss.com/), [font-awesome](https://fontawesome.com/), and the [simple template](https://github.com/getpelican/pelican/tree/master/pelican/themes/simple/templates) from [pelican](https://docs.getpelican.com/en/latest/).

I host the site right [here](https://yuceltoluyag.github.io) on GitHub pages.

# Run Locally

To run the site locally, you will want to have podman installed.

Build the container to run the site:

```bash
make build
```

And run the container:

```bash
make run
```

You can now view the site at [http://localhost:8000](http://localhost:8000).

You can use `make clean` to remove the output directory and `make run` to start it up again.

To make a post using the template, run:

```bash
make post
```
