let config = require('./gulp-config');
let { src, dest, watch, task, series } = config.plugins.gulp;
let plugins = config.plugins;
let reload = config.plugins.browserSync.reload;
let env = process.env.GULP_ENV;

function buildHtml() {
    let cssManifest = '';
    let jsManifest = '';
    if (env === 'production') {
        cssManifest = JSON.parse(plugins.fs.readFileSync(config.build.manifest + config.revManifest.cssManifest, 'utf8'));
        jsManifest = JSON.parse(plugins.fs.readFileSync(config.build.manifest + config.revManifest.jsManifest, 'utf8'));
    }

    return src(config.src.pages)
        .pipe(plugins.gulpPug({
            pretty: (env !== 'production'),
            locals: {
                cssManifest: cssManifest,
                jsManifest: jsManifest,
                pjson: require('./package'),
                env: process.env
            }
        }))
        .pipe(dest(config.build.pages))
        .pipe(reload({stream: true}))
}

function buildStyles() {
  return src(config.src.styles, { sourcemaps: true })
      .pipe(plugins.gulpStylus())
      .pipe(plugins.prefixer())
      .pipe(plugins.urlAdjuster({
        replace:  ['../../fonts','fonts']
      }))
      .pipe(plugins.base64({
          baseDir: 'src/app/img',
          exclude:    ['svg#Glyphter'],
          extensions: ['svg', 'png', 'jpg']
      }))
      .pipe(plugins.cleanCSS({compatibility: 'ie10'}))
      .pipe(plugins.gulpif(env === 'production', plugins.rev()))
      .pipe(dest(config.build.styles, { sourcemaps: true }))
      .pipe(plugins.gulpif(env === 'production', plugins.rev.manifest(config.revManifest.cssManifest)))
      .pipe(plugins.gulpif(env === 'production', dest(config.build.manifest)))
      .pipe(reload({stream: true}));
}

function mergeVendorStyles() {
    return src(config.src.cssVendors, { sourcemaps: true })
        .pipe(plugins.cleanCSS())
        .pipe(dest(config.build.cssVendors, { sourcemaps: true }))
        .pipe(reload({stream: true}));
}

function buildJs() {
    return src(config.src.js, { sourcemaps: true })
        .pipe(plugins.babel())
        .pipe(plugins.uglify())
        .pipe(plugins.gulpif(env === 'production', plugins.rev()))
        .pipe(dest(config.build.js, { sourcemaps: true }))
        .pipe(plugins.gulpif(env === 'production', plugins.rev.manifest(config.revManifest.jsManifest)))
        .pipe(plugins.gulpif(env === 'production', dest(config.build.manifest)))
        .pipe(reload({stream: true}));
}

function mergeVendorJs() {
    return src(config.src.jsVendors, { sourcemaps: true })
        .pipe(dest(config.build.jsVendors, { sourcemaps: true }))
        .pipe(reload({stream: true}));
}

function collectImages() {
    return src(config.src.img)
        .pipe(plugins.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [plugins.pngquant()],
            interlaced: true
        }))
        .pipe(dest(config.build.img))
        .pipe(reload({stream: true}));
}

function collectFonts() {
    return src(config.src.fonts)
        .pipe(dest(config.build.fonts))
        .pipe(reload({stream: true}));
}

function collectOthers() {
    return src(config.othersPath)
        .pipe(dest(config.build.other))
}

task('webserver', (done) => {
    config.plugins.browserSync(config.webServer);
    done();
})

function watchFiles() {
    watch([config.watch.layout, config.src.pages, config.watch.templates], buildHtml)
    watch(config.watch.styles, series(buildStyles))
    watch(config.src.cssVendors, mergeVendorStyles)
    watch(config.src.js, series(buildJs))
    watch(config.src.jsVendors, mergeVendorJs)
    watch(config.src.img, collectImages)
    watch(config.src.fonts, collectFonts)
}

let devBuild = series(
    buildStyles, mergeVendorStyles,
    buildJs, mergeVendorJs, collectImages,
    collectFonts, buildHtml);
let prodBuild = series(
    buildStyles, mergeVendorStyles,
    buildJs, mergeVendorJs, collectImages,
    collectFonts, collectOthers, buildHtml);

let build = env === 'development' ? devBuild : prodBuild;
let def = env === 'development' ? series(build, 'webserver', watchFiles) : build;

exports.html = buildHtml;
exports.style = buildStyles;
exports.vendorStyle = mergeVendorStyles;
exports.js = buildJs;
exports.vendorJs = mergeVendorJs;
exports.images = collectImages;
exports.fonts = collectFonts;
exports.others = collectOthers;
exports.watch = series(watchFiles);
exports.default = def;


