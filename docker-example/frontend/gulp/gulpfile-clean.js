var gulp = require('gulp');
var del = require('del');
var dest = require('./gulpfile-options')().dest;

gulp.task('clean', ['clean-bower', 'clean-assets', 'clean-app'], function (onDoneCb) {
    return del(dest.base(), {
        force: true
    }, onDoneCb);
});

gulp.task('clean-bower', function (onDoneCb) {
    return del(dest.lib(), {
        force: true
    }, onDoneCb);
});

gulp.task('clean-assets', function (onDoneCb) {
    return del(dest.assets(), {
        force: true
    }, onDoneCb);
});

gulp.task('clean-app', function (onDoneCb) {
    return del(dest.app(), {
        force: true
    }, onDoneCb);
});
