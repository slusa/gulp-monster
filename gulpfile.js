// Load plugins
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    minifyjs = require('gulp-js-minify'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    server = require('gulp-webserver');

// Styles
gulp.task('styles', function() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass({ style: 'expanded', }).on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/opt/styles'))
        .pipe(livereload(server))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(minifyjs())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/opt/scripts'))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['src/opt/styles', 'src/opt/scripts'], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('styles', 'scripts');
});

// Webserver
gulp.task('webserver', function() {
    gulp.src('src/')
        .pipe(server({
            livereload: true,
            open: true,
            fallback: 'src/index.html'
        }));
});

// Watch
gulp.task('watch', function() {
        // Watch .scss files
        gulp.watch('src/styles/**/*.scss', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.start('styles');
        });

        // Watch .js files
        gulp.watch('src/scripts/**/*.js', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.start('scripts');
        });

        // Start web server
        gulp.start('webserver');
});