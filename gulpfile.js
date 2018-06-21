// Load plugins
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
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
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('src/styles-opt'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(livereload(server))
        .pipe(gulp.dest('src/styles-opt'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('src/scripts-opt'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(livereload(server))
        .pipe(gulp.dest('src/scripts-opt'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(livereload(server))
        .pipe(gulp.dest('src/images-opt'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['src/styles-opt', 'src/scripts-opt', 'src/images-opt'], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('styles', 'scripts', 'images');
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

        // Watch image files
        gulp.watch('src/images/**/*', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.start('images');
        });

        // Start web server
        gulp.start('webserver');
});