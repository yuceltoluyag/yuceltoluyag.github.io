"use strict";

const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const Fiber = require("fibers");

// ! SCSS Plugin
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const discardEmpty = require("postcss-discard-empty");
const discardDuplicates = require("postcss-discard-duplicates");
const sortMedia = require("postcss-sort-media-queries");
const cssDeclarationSorter = require("css-declaration-sorter");
const cssnano = require("cssnano");
const minify = require("gulp-clean-css");
// ! Image Optim
const imagemin = require("gulp-imagemin");
const imageminWebp = require("imagemin-webp");
const imageminJpegtran = require("imagemin-jpegtran");
const svgmin = require("gulp-svgmin");
const cheerio = require("gulp-cheerio");

const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync");
const dependents = require("gulp-dependents");

// ! Exec
const { promisify } = require("util");
const { exec } = require("child_process");
const execAsync = promisify(exec);

const postCssPlugins = [
  discardEmpty(),
  discardDuplicates(),
  sortMedia(),
  autoprefixer({
    grid: true,
  }),
  cssDeclarationSorter({
    order: "concentric-css",
  }),
  cssnano(),
];

// Delete the _site directory.
gulp.task("cleanup-build", () => {
  return del(["_site", "./assets"], { read: false, allowEmpty: true });
});

// Optimize images.
gulp.task("minify-images", () => {
  return gulp
    .src("_assets/images/**/*")
    .pipe(
      imagemin({
        plugins: [imageminWebp({ quality: 50 }), imageminJpegtran()],
      })
    )
    .pipe(gulp.dest("assets/images/normal"));
});

// Convert WEBP
gulp.task("webp", () => {
  return gulp
    .src("_assets/images/**/*")
    .pipe($.webp())
    .pipe(gulp.dest("assets/images/"));
});

gulp.task("fonts", () => {
  return gulp.src(["_assets/fonts/**/*"]).pipe(gulp.dest("assets/fonts"));
});

gulp.task("icons", () => {
  return gulp
    .src("_assets/svg/**/*.svg")
    .pipe(svgmin())
    .pipe(rename({ prefix: "icon-" }))
    .pipe(
      cheerio({
        run: function ($, file) {
          $("svg").attr("style", "display:none");
          $("[fill]").removeAttr("fill");
        },
        parserOptions: { xmlMode: true },
      })
    )

    .pipe(gulp.dest("assets/svg"));
});

gulp.task("scss:build", () => {
  return gulp
    .src("_assets/css/style.scss")
    .pipe(plumber())
    .pipe(dependents())
    .pipe(
      sourcemaps.init({
        loadMaps: true,
      })
    )
    .pipe(
      sass({
        fiber: Fiber,
        outputStyle: "expanded",
        precision: 10,
        onError: browserSync.notify,
      })
    )

    .pipe($.concat("style.css"))
    .pipe(minify({ compatibility: "ie8" }))
    .pipe(rename("style.min.css"))
    .pipe($.postcss(postCssPlugins))
    .pipe(gulp.dest("assets/css/"));
});

gulp.task("scripts", () => {
  return (
    gulp
      .src(["_assets/js/**/*.ts", "_assets/js/**/*.js"])
      .pipe($.sourcemaps.init())
      //.pipe(concat('all.js'))
      .pipe(plumber())
      .pipe(uglify())
      .pipe($.sourcemaps.write("."))
      .pipe(gulp.dest("assets/js"))
  );
});

gulp.task(
  "jekyll-build",
  async () => await execAsync("bundle exec jekyll build")
);

gulp.task(
  "serve",
  gulp.series(
    "cleanup-build",
    gulp.parallel([
      "scss:build",
      "scripts",
      gulp.series("webp", "minify-images"),
      "fonts",
      "icons",
    ]),
    "jekyll-build",
    (done) => {
      browserSync.init({
        notify: false,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: "_site",
        port: 4000,
      });

      // Warch html changes.
      gulp.watch(
        [
          "_assets/css/**/*.scss",
          "_assets/js/**/*.js",
          "_assets/fonts/**/*",
          "_assets/svg/**/*",
          "_assets/images/**/*",
          "_includes/**/*.html",
          "_layouts/**/*.html",
          "_posts/**/*.markdown",
          "_posts/**/*.md",
          "_pages/**/*.md",
          "*.html",
          "_pages/**/*.md",
          "sw.js",
        ],
        gulp.series("jekyll-build")
      );
      gulp.watch("_site/**/*.html").on("change", browserSync.reload);

      // Watch scss changes.
      gulp.watch("_assets/css/**/*.scss", gulp.series("scss:build"));
      // Watch JavaScript changes.
      gulp.watch("_assets/js/**/*.js", gulp.series("scripts"));
      gulp.watch("_assets/fonts/**/*", gulp.series("fonts"));
      gulp.watch("_assets/images/**/*", gulp.series("webp", "minify-images"));
      gulp.watch("_assets/svg/**/*", gulp.series("icons"));
      return done();
    }
  )
);

gulp.task(
  "jekyll-build-deploy",
  async () =>
    await execAsync("JEKYLL_ENV=production bundle exec jekyll build --trace")
);

// Default task.
gulp.task(
  "build",
  gulp.series(
    "cleanup-build",
    gulp.parallel([
      "scss:build",
      "scripts",
      "webp",
      "minify-images",
      "fonts",
      "icons",
    ]),
    "jekyll-build-deploy",
    function (done) {
      done();
    }
  )
);
