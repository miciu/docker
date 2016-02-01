_ = require('lodash');

module.exports = function () {
    var concatPath, concatWithApp, options;
    options = {
        base: '../',
        source: {
            app: 'app/',
            appJs: ['**/*.js', '!**/*Spec.js', '!**/*Mock.js'],
            appHtml: ['**/*.html', '!index.html'],
            appLess: ['**/*.less'],
            assets: 'app-data/**/*',
            mainHtml: 'index.html'
        },
        destination: {
            base: '../target/docker-example/WEB-INF/classes/static/',
            lib: 'lib/',
            assets: 'assets/',
            app: 'app/'
        },
        bowerPath: {
            bowerDirectory: '../bower_components',
            bowerJson: '../bower.json'
        }
    };

    concatPath = function () {
        var slice = [].slice;
        var paths = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        var path = paths.join('');
        if (path.indexOf('!') >= 0) {
            return '!' + path.replace('!', '');
        } else {
            return path;
        }
    };
    concatWithApp = _.curry(concatPath, 3)(options.base, options.source.app);

    return {
        base: function () {
            return options.base;
        },
        bower: {
            js: {
                paths: options.bowerPath,
                filter: new RegExp('.js$', 'i')
            },
            less: {
                paths: options.bowerPath,
                filter: new RegExp('.less$', 'i')
            },
            css: {
                paths: options.bowerPath,
                filter: new RegExp('.css$', 'i')
            }
        },
        source: {
            app: function () {
                return concatPath(options.base, options.source.app, '**/*.*');
            },
            js: function () {
                var j, js, len1, ref1, results;
                ref1 = options.source.appJs;
                results = [];
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    js = ref1[j];
                    results.push(concatWithApp(js));
                }
                return results;
            },
            html: function () {
                var html, j, len1, ref1, results;
                ref1 = options.source.appHtml;
                results = [];
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    html = ref1[j];
                    results.push(concatWithApp(html));
                }
                return results;
            },
            jsAndHtml: function () {
                var i, jsAndHtml, len, ref, results;
                ref = options.source.appJs.concat(options.source.appHtml);
                results = [];
                for (i = 0, len = ref.length; i < len; i++) {
                    jsAndHtml = ref[i];
                    results.push(concatWithApp(jsAndHtml));
                }
                return results;
            },
            less: function () {
                var j, len1, less, ref1, results;
                ref1 = options.source.appLess;
                results = [];
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    less = ref1[j];
                    results.push(concatWithApp(less));
                }
                return results;
            },
            assets: function () {
                return "" + options.base + options.source.assets;
            },
            mainHtml: function () {
                return "" + options.base + options.source.app + options.source.mainHtml;
            }
        }
        ,
        dest: {
            base: function () {
                return "" + options.base + options.destination.base;
            },
            lib: function () {
                return "" + options.base + options.destination.base + options.destination.lib;
            },
            libCss: function () {
                return "" + options.base + options.destination.base + options.destination.lib + "**/*.css";
            },
            assets: function () {
                return "" + options.base + options.destination.base + options.destination.assets;
            },
            app: function () {
                return "" + options.base + options.destination.base + options.destination.app;
            },
            appCss: function () {
                return "" + options.base + options.destination.base + options.destination.app + "**/*.css";
            },
            appJs: function () {
                return "" + options.base + options.destination.base + options.destination.app + "**/*.js";
            }
        }
    };
}
;