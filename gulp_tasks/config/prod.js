// Production config
import { resolve } from 'path'
import merge from 'lodash.merge'

import baseConfig from './base.js'

// Paths
const src = baseConfig.src.base
const srcAssets = baseConfig.src.assets
const build = resolve(src, '_site')
const buildAssets = resolve(build, 'assets')

const prodBuildConfigFilename = resolve(src, '_config_prod.yml')
const buildConfigFilename = `${baseConfig.jekyll.baseConfig},${prodBuildConfigFilename}`

// Config
const baseProdConfig = {
  buildDir: build,
  delete: {
    src: build,
  },
  styles: {
    src: `${srcAssets}/css/style.scss`,
    dest: `${buildAssets}/css`,
  },
  scripts: {
    src: `${srcAssets}/js/*.js`,
    dest: `${buildAssets}/js`,
  },
  media: {
    src: `${buildAssets}/images/**/*`,
  },
  copy: {
    media: {
      src: [
        `${srcAssets}/images/**/*.{png,jpg,jpeg,ico}`,
        `${srcAssets}/images/touch/*`,
        `${srcAssets}/images/svg/*`,
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
    styles: {
      src: `${buildAssets}/css/*.css`,
      dest: `${buildAssets}/css`,
      options: {
        keepSpecialComments: 0,
      },
    },
    scripts: {
      src: `${buildAssets}/js/*.js`,
      dest: `${buildAssets}/js`,
      options: {
        keep_fnames: true,
        mangle: false,
      },
    },
    media: {
      src: `${buildAssets}/images/**/**/*`,
      dest: `${buildAssets}/images`,
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true,
        quality: 50,
      },
    },
    html: {
      src: `${build}/**/*.html`,
      dest: build,
      options: {
        collapseWhitespace: true,
        conservativeCollapse: true,
      },
    },
  },
}

export default merge(baseProdConfig, baseConfig)
