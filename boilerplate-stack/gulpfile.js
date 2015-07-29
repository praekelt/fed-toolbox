"use strict()";

/* PATHS */
var paths = {
    'src': 'project/src/',
    'dist': 'project/dist/'
};



/* DEPENDENCIES */
// TODO: Get gulp-load-plugins to work with non-gulp npm packages for cleaner code.
var gulp = require('gulp'),
    del = require('del'),
    runsequence = require('run-sequence'),
    pngquant = require('imagemin-pngquant'),
    bower = require('main-bower-files'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-ruby-sass': 'sass',
            'gulp-minify-css': 'minify',
            'gulp-bower-normalize': 'bowerNormalizer'
        }
    });


/* ===================================== */
/* DEFAULT TASK */
/* ===================================== */

    gulp.task('default',function() {
        console.log('Building the project into the dist folder.');
        runsequence(['bower', 'sass', 'requirejs', 'images', 'iconify']);
    });

/* ===================================== */


/* ===================================== */
/* WATCH */
/* ===================================== */

    gulp.task('watch',function() {
        gulp.watch(paths.src + 'app/**/*.scss', ['sass']);
        gulp.watch(paths.src + 'app/**/*.js', ['requirejs']);
        gulp.watch(paths.src + 'app/images/**/*.*', ['images']);
        gulp.watch(paths.src + 'icons/*.svg', ['iconify']);
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
        // TODO: Create task to generate optimised r.js code
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

    // NB: If this fails to run, and you are on OSX,
    // try running this command:
    // $ ulimit -S -n 2048
    gulp.task('iconify', function() {

        // Since we're copying the SVGs to the dist, they need to be cleaned.
        del(paths.dist + 'icons/*.svg');

        // Generate icon library
        plugins.iconify({
            src: paths.src + 'icons/*.svg',
            pngOutput: paths.dist + 'icons/png',
            cssOutput: paths.dist + 'css/iconify',
            styleTemplate: paths.src + 'icons/_icon_gen.scss.mustache'
        });

        // Copy across the svgs from src to dist (since iconify does not do this itself)
        gulp.src(paths.src + 'icons/*.svg')
            .pipe(plugins.flatten())
            .pipe(gulp.dest(paths.dist + 'icons'));
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
            .pipe(gulp.dest(paths.src + 'libs/'));
    });

/* ===================================== */


/* ===================================== */
/* BOWER DEPENDENCIES */
/* ===================================== */

    gulp.task('bower', function() {

        // TODO: Prevent modernizr-custom.js from being deleted.
        del(paths.src + 'libs/*.js');

        gulp.src(bower(), {base: './bower_components'})
            .pipe(plugins.bowerNormalizer({bowerJson: './bower.json'}))
            .pipe(gulp.dest(paths.src + 'libs'));

        // Rebuild the custom Modernizr, since it gets deleted.
        runsequence('modernizr');
    });

/* ===================================== */
