var gulp       = require('gulp');
var sass       = require('gulp-sass');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

var environment = process.env.NODE_ENV;

gulp.task('images', () => {
    return gulp
        .src(['./assets/images/*.{jpg,png}'])
        .pipe(gulp.dest('./public/imgs/'));
});

gulp.task('styles', () => {
  return gulp
    .src(['./assets/stylesheets/memex.scss'])
    .pipe(sass({
            includePaths: [
                'node_modules/foundation-sites/scss',
                'node_modules/normalize.scss'
            ],
            outputStyle: environment == 'production' ? 'compressed' : 'nested'
        }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('scripts', () => {
    if (environment == 'production') {
        return browserify('./assets/javascripts/index.js')
            .transform(babelify, {presets: ['es2015']})
            .bundle()
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(rename('memex.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./public/js/'));
    } else {
        return browserify('./assets/javascripts/index.js')
            .transform(babelify, {presets: ['es2015']})
            .bundle()
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(rename('memex.min.js'))
            .pipe(gulp.dest('./public/js/'));
    }
});

gulp.task('default', ['scripts', 'styles', 'images']);
