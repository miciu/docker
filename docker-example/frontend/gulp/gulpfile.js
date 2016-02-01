require('./gulpfile-clean');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var runSeq = require('run-sequence');
var less = require('gulp-less');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var path = require('path');
var del = require('del');
var ref = require('./gulpfile-options')();
var opt = ref.opt;
var base = ref.base;
var source = ref.source;
var dest = ref.dest;
var bower = ref.bower;

var injectAppJs, injectLibWithOrderFromBowerJs, injectLibWithOrderFromBowerCss;


gulp.task('watch', ['app-with-clean'], function () {
    var watcher;
    watcher = watch(source.jsAndHtml(), function () {
        return runSeq(['app-js'], 'app-main-html');
    });
    watcher.on('unlink', function (file) {
        var dstFolder, relFile;
        relFile = path.relative(base(), file);
        dstFolder = path.resolve(dest.base());
        return del.sync(path.resolve(dstFolder, relFile), {
            force: true
        });
    });
    watch(source.mainHtml(), function () {
        return runSeq('app-main-html');
    });
    return watch(source.less(), function () {
        return runSeq('app-less');
    });
});

gulp.task('app-with-clean', ['clean-app'], function (callback) {
    return runSeq(['app'], callback);
});

gulp.task('app', ['bower', 'app-js', 'app-less', 'assets'], function (callback) {
    return runSeq('app-main-html', callback);
});

gulp.task('app-main-html', function () {
    return gulp.src(source.mainHtml()).pipe(injectAppJs()).pipe(injectLibWithOrderFromBowerJs()).pipe(injectLibWithOrderFromBowerCss()).pipe(gulp.dest(dest.base()));
});

gulp.task('bower', function () {
    var lessBowerSrc = mainBowerFiles(bower.less);
    var jsBowerSrc = mainBowerFiles(bower.js);

    gulp.src('../bower_components/bootstrap/dist/fonts/*.*').pipe(gulp.dest(dest.lib()+ 'bootstrap/fonts/'));

    gulp.src(lessBowerSrc, {base: base() + 'bower_components/'})
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.lib()));


    return gulp.src(jsBowerSrc, {base: base() + 'bower_components/'}).pipe(gulp.dest(dest.lib()));
});

gulp.task('assets', function () {
    return gulp.src(source.assets()).pipe(gulp.dest(dest.assets()));
});

gulp.task('app-js', function () {
    return gulp.src(source.jsAndHtml()).pipe(gulp.dest(dest.app()));
});

gulp.task('app-less', function () {
    return gulp.src(source.less())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.app()));
});

injectAppJs = lazypipe().pipe(function () {
    var appJs = gulp.src([dest.appJs(), dest.appCss()], {
        read: false
    });
    return inject(appJs, {
        ignorePath: dest.base(),
        addRootSlash: false,
        name: 'aws-app'
    });
});

injectLibWithOrderFromBowerCss = lazypipe().pipe(function () {
    var appLibCss = gulp.src(dest.libCss(), {
        read: false
    });
    return inject(appLibCss, {
        ignorePath: dest.base(),
        addRootSlash: false,
        name: 'aws-css'
    });
});

injectLibWithOrderFromBowerJs = lazypipe().pipe(function () {
    var jsBowerSrc = mainBowerFiles(bower.js);

    var src = gulp.src(jsBowerSrc, {
        read: false
    });
    return inject(src, {
        ignorePath: '../bower_components/',
        addPrefix: 'lib',
        addRootSlash: false,
        name: 'aws-lib'
    });
});
