var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    runsequence = require('run-sequence'),
    del = require('del');

    gulp.task('watch', function() {
        gulp.watch('src/**/*.js', ['build']);
    });

    gulp.task('clean', function() {
        del('dist/*', function (err, paths) {
            console.log('Cleaned dist folder:\n', paths.join('\n'));
        });
    });

    gulp.task('js-prod', function() {
        return gulp.src('src/**/*.js')
            .pipe(plumber())
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest('dist/'));
    });

    gulp.task('js-min', function() {
        return gulp.src('src/*.js')
            .pipe(plumber())
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(uglify())
            .pipe(rename({
                extname: '.min.js'
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('build', function() {
        runsequence(['clean', 'js-prod', 'js-min']);
    });

