var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var browserSync = require('browser-sync').create();

const WEBPACK_SERVER_PORT = 7001;

const paths = {
    All: ['app/**/*.js', 'app/**/*.jsx']
};

gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.plugins = myConfig.plugins.concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        gulp.src('assets/**/*')
        .pipe(gulp.dest('/Users/prathameshpalyekar/personal/vendor-app/vendor-app-backend/assets'));
        callback();
    });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
    // return gulp.src('app/main.js')
    // .pipe(webpackStream(myDevConfig))
    // .pipe(gulp.dest('dist/'));
    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function() {
    gulp.watch(["app/**/*"], ["webpack:build-dev"]);
});


gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "inline-source-map";
    myConfig.debug = true;

    myConfig.plugins = myDevConfig.plugins.concat(
        new webpack.HotModuleReplacementPlugin()
    );

    myConfig.entry = [
        'webpack-dev-server/client?http://localhost:' + WEBPACK_SERVER_PORT, 
        'webpack/hot/only-dev-server',
        './app/main.js',
    ];

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: '/assets/',
        contentBase: 'dist/',
        historyApiFallback: true,
        stats: 'errors-only',
        // hot: true,
        inline: true,
        // noInfo: true,
        progress: true,
        stats: {
            colors: true
        },
        proxy: {
            '/api/*': {
                target: 'http://localhost:7000/'
            },
            '/nes/*': {
                target: 'http://localhost:7000/'
            },
            '/uploads/*': {
                target: 'http://localhost:7000/'
            }
        },
    }).listen(WEBPACK_SERVER_PORT, "0.0.0.0", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:" + WEBPACK_SERVER_PORT + "/webpack-dev-server/index.html");
    });
});

gulp.task('default', ['webpack-dev-server']);
// Production build
gulp.task("build", ["webpack:build"]);
