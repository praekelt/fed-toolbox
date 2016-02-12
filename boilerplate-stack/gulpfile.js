const Gulp = require('gulp'),
    Path = require('path'),
    RunSequence = require('run-sequence'),
    Sass = require('gulp-ruby-sass'),
    SassLint = require('gulp-sass-lint'),
    SourceMaps = require('gulp-sourcemaps'),
    Autoprefixer = require('gulp-autoprefixer'),
    Bless = require('gulp-bless'),
    PixRem = require('gulp-pixrem'),
    CssNano = require('gulp-cssnano');

const SourceFolder = Path.join(__dirname, 'app');
const DistFolder = Path.join(__dirname, 'dist');

Gulp.task('default', function() {
    RunSequence('styles', 'process-styles');
});

Gulp.task('styles', ['lint-sass'], function() {
    return Sass(SourceFolder + '/**/*.s+(a|c)ss')
        .on('error', Sass.logError)
        .pipe(Gulp.dest(DistFolder + '/css'));
});

Gulp.task('process-styles', function() {
    return Gulp.src(DistFolder + '/css/*.css')
        .pipe(Autoprefixer())
        .pipe(Bless())
        .pipe(PixRem())
        .pipe(CssNano())
        .pipe(Gulp.dest(DistFolder + '/css'));
})

Gulp.task('lint-sass', function() {
    return Gulp.src(SourceFolder + '/**/*.s+(a|c)ss')
        .pipe(SassLint())
        .pipe(SassLint.format())
        .pipe(SassLint.failOnError());
});
