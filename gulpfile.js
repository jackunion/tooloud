var gulp = require('gulp'),
    webpack = require('webpack'),
    config = require('./webpack.config.js'),
    minify = require('./webpack.config.min.js');


gulp.task('default', function() {});

gulp.task('build', function() {
    webpack(config).run(function(err, stats) {});
    webpack(minify).run(function(err, stats) {});
});

gulp.task('watch', function() {
    webpack(config).watch({}, function(err, stats) {});
    webpack(minify).watch({}, function(err, stats) {});
});
