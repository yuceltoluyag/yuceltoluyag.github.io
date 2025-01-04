import { spawn } from 'child_process'
import path from 'path'
import browsersync from 'browser-sync'
import { deleteAsync } from 'del'
import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import babel from 'gulp-babel'
import cssnano from 'gulp-cssnano'
import duration from 'gulp-duration'
import htmlmin from 'gulp-htmlmin'
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'
import inline from 'gulp-inline-source'
import plumber from 'gulp-plumber'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import size from 'gulp-size'
import sourcemaps from 'gulp-sourcemaps'
import terser from 'gulp-terser'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import webp from 'gulp-webp'
import configDev from './gulp_tasks/config/dev.js'
import configProd from './gulp_tasks/config/prod.js'
import errorHandler from './gulp_tasks/utils/errorHandler.js'

const argv = yargs(hideBin(process.argv)).argv

// We might not want to register the serviceworker for local dev.
// Very hacky way to do this!
process.env.SERVICEWORKER = argv.noserviceworker ? 'false' : 'true'

/**
 * Browsersync
 */
const bsServer = browsersync.create()
// let ngrokURL = null
// let browsersyncLocalURL = null
// let browsersyncExternalURL = null

export function browser_sync(cb) {
  const bsOptions = Object.assign({}, configDev.browsersync, {
    // callbacks: {
    //   ready: async (_, bs) => {
    //     browsersyncLocalURL = bs.options.getIn(['urls', 'local'])
    //     browsersyncExternalURL = bs.options.getIn(['urls', 'external'])
    //     ngrokURL = await ngrok.connect(bs.options.get('port'))
    //     console.log(`Your ngrok URL is:`)
    //     console.log(`└── ${ngrokURL}`)
    //   },
    // },
  })
  bsServer.init(bsOptions)
  cb()
}

/**
 * Copy media and other files
 */
export function copy_media_dev() {
  return gulp
    .src(configDev.copy.media.src)
    .pipe(gulp.dest(configDev.copy.media.dest))
}

export function copy_media_prod() {
  return gulp
    .src(configProd.copy.media.src)
    .pipe(gulp.dest(configProd.copy.media.dest))
}

export function copy_fonts_dev() {
  return gulp
    .src(configDev.copy.fonts.src)
    .pipe(gulp.dest(configDev.copy.fonts.dest))
}

export function copy_fonts_prod() {
  return gulp
    .src(configProd.copy.fonts.src)
    .pipe(gulp.dest(configProd.copy.fonts.dest))
}

export const copy_dev = gulp.series(copy_fonts_dev, copy_media_dev)

export const copy_prod = gulp.series(copy_fonts_prod, copy_media_prod)

/**
 * Clean folders and files specified in the config
 */
function clean_dev() {
  return deleteAsync(configDev.delete.src)
}

function clean_prod() {
  return deleteAsync(configProd.delete.src)
}

function convert_media_webp() {
  return gulp
    .src('_assets/images/**/*')
    .pipe(plumber({ errorHandler }))
    .pipe(webp())
    .pipe(duration('Resimler Webp formatına çeviriliyor'))
    .pipe(gulp.dest(configProd.optimize.media.dest))
    .pipe(size(configProd.size))
}

/**
 * Optimize
 */
function optimize_media_prod() {
  return (
    gulp
      .src(configProd.optimize.media.src)
      .pipe(plumber({ errorHandler }))
      .pipe(
        imagemin([
          gifsicle({ interlaced: true }),
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 5 }),
          svgo({
            plugins: [
              {
                name: 'removeViewBox',
                active: true,
              },
              {
                name: 'cleanupIDs',
                active: false,
              },
            ],
          }),
        ])
      )
      .pipe(duration('Optimizing media for production'))
      //.pipe(rename({ extname: '.webp' }))
      .pipe(gulp.dest(configProd.optimize.media.dest))
      .pipe(size(configProd.size))
  )
}
function optimize_svg_prod() {
  return gulp
    .src('_assets/images/svg/*.svg') // SVG dosyalarının bulunduğu klasör
    .pipe(plumber({ errorHandler }))
    .pipe(
      imagemin([
        svgo({
          plugins: [
            { name: 'removeViewBox', active: true }, // ViewBox'u kaldır
            { name: 'cleanupIDs', active: false }, // ID'leri temizleme (gerekirse açabilirsiniz)
          ],
        }),
      ])
    )
    .pipe(gulp.dest(configProd.optimize.media.dest))
    .pipe(size(configProd.size)) // Dosya boyutlarını yazdırma
}

function optimize_styles_prod() {
  return gulp
    .src(configProd.optimize.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(cssnano(configProd.optimize.styles.options))
    .pipe(duration('Optimizing and minifying CSS for production'))
    .pipe(gulp.dest(configProd.optimize.styles.dest))
    .pipe(size(configProd.size))
}

function optimize_scripts_prod() {
  return gulp
    .src(configProd.optimize.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(terser(configProd.optimize.scripts.options))
    .pipe(duration('Optimizing, minifying and minifying JS for production'))
    .pipe(gulp.dest(configProd.optimize.scripts.dest))
    .pipe(size(configProd.size))
}

function optimize_html_prod() {
  return gulp
    .src(configProd.optimize.html.src)
    .pipe(plumber({ errorHandler }))
    .pipe(htmlmin(configProd.optimize.html.options))
    .pipe(duration('Optimizing and minifying HTML for production'))
    .pipe(gulp.dest(configProd.optimize.html.dest))
    .pipe(size(configProd.size))
}

function optimize_inline_prod() {
  return gulp
    .src(configProd.optimize.html.src)
    .pipe(plumber({ errorHandler }))
    .pipe(
      inline({
        rootpath: configProd.buildDir,
      })
    )
    .pipe(duration('Inlining CSS into HTML for production'))
    .pipe(gulp.dest(configProd.optimize.html.dest))
}

export const optimize_prod = gulp.series(
  convert_media_webp,
  optimize_media_prod,
  optimize_svg_prod,
  optimize_styles_prod,
  optimize_scripts_prod,
  optimize_html_prod,
  optimize_inline_prod
)

/**
 * Scripts
 */
export function scripts_dev() {
  return gulp
    .src(configDev.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(duration('Compiling ES6 js for development'))
    .pipe(gulp.dest(configDev.scripts.dest))
    .pipe(bsServer.stream())
}

export function scripts_prod() {
  return gulp
    .src(configProd.scripts.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(sourcemaps.write('.'))
    .pipe(duration('Compiling ES6 js for production'))
    .pipe(gulp.dest(configProd.scripts.dest))
}

/**
 * Styles
 */
export function styles_dev() {
  return gulp
    .src(configDev.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(configDev.styles.autoprefixer))
    .pipe(duration('Compiling SCSS and vendor prefixing CSS for development'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(configDev.styles.dest))
    .pipe(bsServer.stream())
}

export function styles_prod() {
  return gulp
    .src(configProd.styles.src)
    .pipe(plumber({ errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer(configProd.styles.autoprefixer))
    .pipe(duration('Compiling SCSS and minifying CSS for production'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(configProd.styles.dest))
}

/**
 * Run the build
 */
export const build_dev = gulp.series(
  clean_dev,
  jekyll_build_dev,
  gulp.parallel(
    styles_dev,
    scripts_dev,
    copy_dev,
    convert_media_webp,
    optimize_svg_prod
  )
)

export const build_prod = gulp.series(
  clean_prod,
  jekyll_build_prod,
  gulp.parallel(
    styles_prod,
    scripts_prod,
    copy_prod,
    convert_media_webp,
    optimize_svg_prod
  )
)

export const deploy_dryrun = gulp.series(build_prod, optimize_prod)

export const deploy = gulp.series(build_prod, optimize_prod)

/**
 * Jekyll
 */
function jekyll_build_dev(cb) {
  let args = [
    'exec',
    'jekyll',
    'build',
    `--source=${configDev.jekyll.src}`,
    `--destination=${configDev.jekyll.dest}`,
    `--config=${configDev.jekyll.config}`,
    `--trace`,
  ]

  // Activate the profiler if needed
  if (argv.profile) {
    args = args.concat('--profile')
  }

  return spawn('bundle', args, { stdio: 'inherit' }).on('close', cb)
}

function jekyll_build_prod(cb) {
  let args = [
    'exec',
    'jekyll',
    'build',
    `--source=${configProd.jekyll.src}`,
    `--destination=${configProd.jekyll.dest}`,
    `--config=${configProd.jekyll.config}`,
  ]

  // Activate the profiler if needed
  if (argv.profile) {
    args = args.concat('--profile')
  }

  return spawn('bundle', args, { stdio: 'inherit' }).on('close', cb)
}

/**
 * Watch
 */
export function watch() {
  gulp.watch(
    configDev.watch.jekyll,
    gulp.series(jekyll_build_dev, function browsersync_reload(cb) {
      bsServer.reload()
      /*
        console.log(`** Reminder **`)
        console.log(`BrowserSync URLs`)
        console.log(`├── ${browsersyncLocalURL}`)
        console.log(`└── ${browsersyncExternalURL}`)
        console.log(`ngrok URL`)
        console.log(`└── ${ngrokURL}`)
        */
      cb()
    })
  )
  gulp.watch(configDev.watch.styles, styles_dev)
  gulp.watch(configDev.watch.scripts, scripts_dev)
}

/**
 * Build the development environment and watch files for changes
 */
export default gulp.series(build_dev, browser_sync, watch)
