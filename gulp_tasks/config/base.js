import { normalize, resolve } from 'path'

const basePath = normalize('node:../..')

// Export the base config
export default {
  homeFolder:
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'],
  src: {
    base: basePath,
    assets: resolve(basePath, '_assets'),
  },
  jekyll: {
    baseConfig: resolve(basePath, '_config.yml'),
  },
  styles: {
    autoprefixer: {
      cascade: true,
    },
  },
  scripts: {
    options: {
      debug: true,
    },
    vendor: {
      src: [],
    },
  },
  size: {
    showFiles: true,
  },
  get watch() {
    return {
      jekyll: [
        `${this.src.base}/*.yml`,
        `${this.src.base}/_data/*`,
        `${this.src.base}/{archive,index,404}.html`,
        `${this.src.base}/_includes/**/*`,
        `${this.src.base}/_layouts/*`,
        `${this.src.base}/_pages/*`,
        `${this.src.base}/_posts/**/*`,
        `${this.src.base}/_projects/*`,
        `${this.src.base}/_plugins/*`,
      ],
      styles: `${this.src.assets}/css/**/*.scss`,
      scripts: `${this.src.assets}/js/*.js`,
      media: `${this.src.assets}/images/*`,
    }
  },
}
