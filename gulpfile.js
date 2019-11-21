// 引入所有需要的檔案
const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const htmlreplace = require('gulp-html-replace');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');

const path = {
    HTML: './public/index.html',
    public: './public/*',
    MINIFIED_OUT: 'bundle.min.js',
    OUT: 'bundle.js',
    DEST: 'build',
    ENTRY_POINT: './app/index.js',
    SCRIPTS: './app/*'
};

gulp.task('watch', function () {
    gulp.watch(path.public, gulp.series('copy'));

    gulp.watch(path.SCRIPTS, gulp.series('bundle'));

    // var watcher = watchify(browserify({
    //     entries: [path.ENTRY_POINT],
    //     debug: true,
    // }));
    // return watcher.on('update', function () {
    //     watcher.transform(['babelify', { presets: ['@babel/preset-env', '@babel/preset-react'], plugins: ['@babel/plugin-proposal-class-properties'] }])
    //         .bundle()
    //         .pipe(source(path.OUT))
    //         .pipe(gulp.dest(path.DEST))
    //     console.log('Updated on ', new Date().toLocaleString());
    // })
    //     .bundle()
    //     .pipe(source(path.OUT))
    //     .pipe(gulp.dest(path.DEST));

});

gulp.task('copy', function () {
    return gulp.src(path.public)
        .pipe(gulp.dest(path.DEST));
});

gulp.task('bundle', function () {
    return browserify({
        entries: [path.ENTRY_POINT]
    })
        .transform(['babelify', { presets: ['@babel/preset-env', '@babel/preset-react'], plugins: ['@babel/plugin-proposal-class-properties'] }])
        .bundle()
        .pipe(source(path.OUT))
        .pipe(gulp.dest(path.DEST));
});

gulp.task('build-minify', function (done) {
    browserify({
        entries: [path.ENTRY_POINT]
    })
        .transform(['babelify', { presets: ['@babel/preset-env', '@babel/preset-react'], plugins: ['@babel/plugin-proposal-class-properties'] }])
        .bundle()
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify(path.MINIFIED_OUT)))
        .pipe(gulp.dest(path.DEST));

    done();
})

gulp.task('replaceHTML', function (done) {
    let replace = {
        'react': '<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>\n    ' +
            '<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>',
        'bundle': '<script type="text/babel" src="' + path.MINIFIED_OUT + '"></script>',
        'buildTime': new Date().toISOString(),
        'buildId': process.env.npm_config_buildId ? process.env.npm_config_buildId.substr(0, 7) : "xxxxxxx"
    }

    gulp.src(path.HTML)
        .pipe(htmlreplace(replace))
        .pipe(gulp.dest(path.DEST));
    done();
});

gulp.task('apply-prod-environment', function (done) {
    process.env.NODE_ENV = 'production';
    done();
});


exports.production = gulp.series('copy', 'build-minify', 'replaceHTML', 'apply-prod-environment');
exports.default = gulp.parallel('watch', 'copy', 'bundle');