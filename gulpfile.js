var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create(),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
minifyCss = require('gulp-minify-css'),
autoprefixer = require('gulp-autoprefixer'),
plumber = require('gulp-plumber'),
sourcemaps = require('gulp-sourcemaps');

// File paths
var CSS_DIST_PATH = './dist/css';
var SCRIPT_DIST_PATH = './dist/js';
var SCRIPTS_PATH = './js/*.js';
var CSS_PATH = './css/*.css';
var CSS_RESET_PATH = './css/reset.css';


gulp.task('styles', function() {
    return gulp.src([CSS_RESET_PATH, CSS_PATH])
        .pipe(plumber(function (err) {
            console.log('Styles Task Error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CSS_DIST_PATH));
});

gulp.task('scripts', function() {
    return gulp.src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(gulp.dest(SCRIPT_DIST_PATH));
});

gulp.task('watch', function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./"
        }
    });

    watch('./index.html', function(){
        browserSync.reload();
    });

    watch(CSS_PATH, function() {
        gulp.start('styles');
        browserSync.reload();
    });

    watch(SCRIPTS_PATH, function() {
        gulp.start('scripts');
        browserSync.reload();
    });
});