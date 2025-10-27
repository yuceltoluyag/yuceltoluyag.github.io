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

# CSS Bundle ve Küçültme

Bu projede CSS dosyalarını birleştirip küçültmek için LightningCSS kullanılmaktadır.

## Kurulum

```bash
npm install lightningcss-cli
```

## Kullanım

Tüm CSS dosyalarını birleştirip küçültmek için:

```bash
# CSS dosyalarını birleştir
cat themes/baba/static/css/pico.indigo.min.css themes/baba/static/css/custom.css themes/baba/static/css/modern-styles.css themes/baba/static/css/pygments.css themes/baba/static/css/copy.css themes/baba/static/css/toc.css > themes/baba/static/css/combined.css

# CSS dosyasını küçült
npx lightningcss-cli --minify themes/baba/static/css/combined.css -o themes/baba/static/css/bundle.min.css

# Gereksiz combined.css dosyasını sil (opsiyonel)
rm themes/baba/static/css/combined.css
```

Bu işlem sonucunda oluşan `bundle.min.css` dosyası tüm stilleri içerir ve performansı artırır.
