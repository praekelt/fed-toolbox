"use strict()";

/* PATHS */
var paths = {
    'src': 'project/src/',
    'dist': 'project/dist/'
};



/* DEPENDENCIES */
var gulp = require('gulp'),
    del = require('del'),
    runsequence = require('run-sequence'),
    pngquant = require('imagemin-pngquant'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-ruby-sass': 'sass',
            'gulp-minify-css': 'minify'
        }
    });



/* ===================================== */
/* WATCH */
/* ===================================== */

    gulp.task('watch',function() {
        gulp.watch(paths.src + 'app/**/*.scss', ['sass']);
        gulp.watch(paths.src + 'app/**/*.js', ['requirejs']);
        gulp.watch(paths.src + 'app/images/**/*.*', ['images']);
    });

/* ===================================== */


/* ===================================== */
/* SASS */
/* ===================================== */

    gulp.task('sass', ['modernizr'], function () {

        plugins.sass(paths.src + 'app/patterns/',
            {
                compass: true
            })
            .on('error', function (err) {
                console.error('Error!', err.message);
            })
            .pipe(plugins.plumber())
            .pipe(plugins.autoprefixer())
            .pipe(plugins.bless({
                imports: false
            }))
            .pipe(plugins.minify())
            .pipe(gulp.dest(paths.dist + 'css'));

    });

/* ===================================== */


/* ===================================== */
/* RequireJS */
/* ===================================== */

    gulp.task('requirejs', function() {
        console.log('Optimize Require');
    });

/* ===================================== */


/* ===================================== */
/* IMAGES */
/* ===================================== */

    gulp.task('images', function() {
        gulp.src(paths.src + 'images/**/*.*')
            .pipe(plugins.changed(paths.dist + 'images'))
            .pipe(plugins.imagemin({
                progressive: true,
                use: [pngquant()]
            }))
            .pipe(gulp.dest(paths.dist + 'images'))
            .pipe(plugins.webp({
                quality: 70
            }))
            .pipe(gulp.dest(paths.dist + 'images'));
    });

/* ===================================== */


/* ===================================== */
/* ICONIFY */
/* ===================================== */

    gulp.task('iconify',function() {
        console.log('Generate icon library');
    });

/* ===================================== */


/* ===================================== */
/* MODERNIZR */
/* ===================================== */

    gulp.task('modernizr', function() {

        var compiledName = 'modernizr-custom.js';

        del([paths.src + 'lib/' + compiledName], function(err, files) {
            console.log('Cleaned before compile: \n', files.join('\n'));
        });

        gulp.src([paths.src + 'app/**/*.js', paths.src + 'app/**/*.scss'])
            .pipe(plugins.plumber())
            .pipe(plugins.modernizr(compiledName))
            .pipe(gulp.dest(paths.src + 'lib/'));
    });

/* ===================================== */
