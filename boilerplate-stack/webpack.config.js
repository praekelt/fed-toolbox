const Webpack = require('webpack'),
    Path = require('path'),
    Autoprefixer = require('autoprefixer'),
    CssNano = require('cssnano'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

var modulesDirectories = ['node_modules', 'bower_components'];

module.exports = {
    'target': 'web',
    'context': Path.join(__dirname, 'app'),
    'resolve': {
        'modulesDirectories': modulesDirectories,
        'extensions': [
            '',
            '.js',
            '.scss',
            '.sass'
        ]
    },
    'entry': {
        'barron': './main.js'
    },
    'output': {
        'path': Path.join(__dirname, 'dist'),
        'filename': 'js/[name]-[hash].js',
        'publicPath': '/'
    },
    'module': {
        'loaders': [
            {
                'test': /\.js$/,
                'loader': 'babel',
                'exclude': modulesDirectories
            },
            {
                'test': /\.s[a|c]ss$/,
                'loader': 'style!css?sourceMap!postcss-loader!ruby-sass?requires[]=compass!sasslint',
                'exclude': modulesDirectories
            }
        ]
    },
    'plugins': [
        // Cleans Dist folder before compile.
        new CleanWebpackPlugin(['dist/js'], {
            'root': __dirname,
            'verbose': true,
            'dry': false
        })
    ],
    'postcss': function() {
        return [Autoprefixer, CssNano];
    },
    'sasslint': {
        'configFile': __dirname + '/.sass-lint.yml'
    }
}
