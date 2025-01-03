// Development config
import { existsSync } from 'fs'
import { extname, join, resolve } from 'path'
import { parse } from 'url'
import merge from 'lodash.merge'

import baseConfig from './base.js'

// Paths
const src = baseConfig.src.base
const srcAssets = baseConfig.src.assets
const build = resolve(src, '_site')
const buildAssets = resolve(build, 'assets')

const devBuildConfigFilename = resolve(src, '_config_dev.yml')
const buildConfigFilename = `${baseConfig.jekyll.baseConfig},${devBuildConfigFilename}`

// Config
const baseDevConfig = {
  buildDir: build,
  browsersync: {
    server: {
      baseDir: build,
      middleware: [
        (req, res, next) => {
          // middleware for clean, extensionless URLs
          let uri = parse(req.url)
          if (
            uri.pathname.length > 1 &&
            extname(uri.pathname) === '' &&
            existsSync(`${join(build, uri.pathname)}.html`)
          ) {
            req.url = `${uri.pathname}.html${uri.search || ''}`
          }
          next()
        },
      ],
    },
    port: 8888,
    ui: {
      port: 9001,
    },
    open: false,
  },
  delete: {
    src: build,
  },
  styles: {
    src: `${srcAssets}/css/style.scss`,
    dest: `${buildAssets}/css`,
    autoprefixer: { overrideBrowserslist: ['last 2 versions'], cascade: false },
  },
  scripts: {
    src: `${srcAssets}/js/*.js`,
    dest: `${buildAssets}/js`,
  },
  copy: {
    media: {
      src: [
        `${srcAssets}/images/*.{png,jpg,jpeg,ico,svg}`,
        `${srcAssets}/images/**/*.{gif,mp4}`,
      ],
      dest: `${buildAssets}/images`,
    },
    fonts: {
      src: `${srcAssets}/fonts/*`,
      dest: `${buildAssets}/fonts`,
    },
  },
  jekyll: {
    src: src,
    dest: build,
    config: buildConfigFilename,
  },
  optimize: {
    html: {
      src: `${build}/**/*.html`,
      dest: build,
    },
  },
}

export default merge(baseDevConfig, baseConfig)
