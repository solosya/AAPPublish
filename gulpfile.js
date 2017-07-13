// Ah, Big Gulp's eh? Welp, see ya later.
var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    // c             = require('chalk'),
    // clean         = require('gulp-clean'),
    // imagemin      = require('gulp-imagemin'),
    concat        = require('gulp-concat'),
    notify        = require('gulp-notify'),
    autoprefixer  = require('gulp-autoprefixer'),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    minifyCss     = require("gulp-clean-css"),
    rename        = require('gulp-rename'),
    livereload    = require('gulp-livereload'),
    lr            = require('tiny-lr'),
    server        = lr(),
    browserSync   = require('browser-sync').create(),
    plumber       = require('gulp-plumber'),
    hasher        = require('gulp-hasher'),
    buster        = require('gulp-cache-buster'),
    runSequence   = require('run-sequence');

// BROWSER SYNC
// livereload({ start: true });
// browserSync.init({
//   proxy: "theme.aap.io"
// });

gulp.task('styles', function(callback) {
  runSequence('sass', 'minify-css', 'cache', callback);
});

gulp.task('cache',  function() {
  return gulp.src('layouts/main.twig')
    .pipe(buster({
      tokenRegExp: /\/(output\.min\.css)\?v=[0-9a-z]+/,
      assetRoot: __dirname + '/static/deploy/',
      hashes: hasher.hashes,
    }))
    .pipe(gulp.dest('layouts/'));
});




gulp.task('minify-css', function () {
    return gulp.src([
        './static/css/index.css',
    ]) 
    .pipe(rename({
        suffix: '.min',
        basename: "output"
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('./static/deploy'))
    .pipe(hasher());
});



gulp.task('sass', function(){
  gulp.src('static/css/sass/index.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: 'expanded',
        debugInfo: true,
        lineNumbers: true,
        errLogToConsole: true,
        onSuccess: function() {
          notify().write({ message: "SCSS Compiled successfully!" });
        },
        onError: function(err) {
          gutil.beep();
          notify().write(err);
        }
      })
    )
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write())
    .pipe( gulp.dest('static/css') )
    .pipe(browserSync.stream());
});


gulp.task('reload', function () {
  browserSync.reload();
})


gulp.task('watch', function() {

  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err);
    }

    // Watch .scss files
    gulp.watch('static/css/sass/**/*.scss', ['styles']);
    gulp.watch("**/*.twig", ['reload']);

  });

});

// Gulp Default Task
gulp.task('default', [ 'styles', 'watch']);
