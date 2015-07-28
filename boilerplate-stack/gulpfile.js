"use strict()";

var paths = {
    'src': 'project/src/',
    'dist': 'project/dist/'
};

var gulp = require('gulp'),
    del = require('del'),
    runsequence = require('run-sequence'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-ruby-sass': 'sass',
            'gulp-minify-css': 'minify'
        }
    });

gulp.task(
    'watch',
    function() {
        console.log('Watch folders for changes');
    }
);

gulp.task('sass', ['modernizr'], function () {

    del([paths.dist + 'css'], function(err, files) {
        console.log('Cleaned before compile: \n', files.join('\n'));
    });

    plugins.sass(paths.src + 'app/patterns/',
        {
            compass: true
        })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(plugins.autoprefixer())
        .pipe(plugins.bless({
            imports: false
        }))
        .pipe(plugins.minify())
        .pipe(gulp.dest(paths.dist + 'css'));
});

gulp.task(
    'js', ['modernizr'],
    function() {
        console.log('Compile JS');
    }
);

gulp.task(
    'images',
    function() {
        console.log('Compile Images');
    }
);

gulp.task(
    'iconify',
    function() {
        console.log('Generate icon library');
    }
);

gulp.task(
    'modernizr',
    function() {

        var compiledName = 'modernizr-custom.js';

        del([paths.src + 'lib/' + compiledName], function(err, files) {
            console.log('Cleaned before compile: \n', files.join('\n'));
        });

        gulp.src([paths.src + 'app/**/*.js', paths.src + 'app/**/*.scss'])
            .pipe(plugins.plumber())
            .pipe(plugins.modernizr(compiledName))
            .pipe(gulp.dest(paths.src + 'lib/'));
    }
);
