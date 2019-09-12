module.exports = {
  src: {
    pages: 'src/app/pages/*.pug',
    styles: 'src/app/css/main.styl',
    cssVendors: 'src/app/css/vendor/*.css',
    js: 'src/app/js/*.js',
    jsVendors: 'src/app/js/vendor/*.js',
    img: 'src/app/img/**/*.{jpeg,jpg,png,tiff,gif,bmp,svg,webp}',
    fonts: 'src/app/fonts/*.{eot,ttf,woff,woff2}'
  },
  build: {
    pages: 'build/',
    styles: 'build/css/',
    cssVendors: 'build/css/vendor/',
    js: 'build/js/',
    jsVendors: 'build/js/vendor/',
    img: 'build/img/',
    fonts: 'build/css/fonts/',
    other: 'build/',
    manifest: 'build/manifest/'
  },
  watch: {
    styles: 'src/app/css/**/*.styl',
    layout: 'src/app/layout/*.pug',
    templates: 'src/app/templates/**/*.pug',
  },
  othersPath: ['favicon.ico', 'humans.txt', 'icon.png', 'robots.txt', 'site.webmanifest', '*.png', 'safari-pinned-tab.svg'],
  webServer: {
    server: {
      baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "by_k1ll1n"
  },
  revManifest: {
    cssManifest: 'css-rev-manifest.json',
    jsManifest: 'js-rev-manifest.json'
  },
  plugins: {
    gulp: require("gulp"),
    gulpif: require('gulp-if'),
    babel: require("gulp-babel"),
    pug: require('pug'),
    gulpPug: require('gulp-pug'),
    stylus: require('stylus'),
    gulpStylus: require('gulp-stylus'),
    replace: require("gulp-replace"),
    uglify: require('gulp-uglify-es').default,
    fs: require("fs"),
    prefixer: require('gulp-autoprefixer'),
    urlAdjuster: require('gulp-css-url-adjuster'),
    cleanCSS: require('gulp-clean-css'),
    browserSync: require("browser-sync"),
    imagemin: require('gulp-imagemin'),
    pngquant: require('pngquant'),
    rev: require('gulp-rev'),
    base64: require('gulp-base64')
  }
};