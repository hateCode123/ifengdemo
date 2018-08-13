const gulp = require('gulp');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const cdn = require('@ifeng/tool_gulp_cdn_replace');
const rev = require('gulp-rev');
const gulpif = require('gulp-if');
const revReplace = require('gulp-rev-replace');
const path = require('path');
const del = require('del');
const packageJson = require('./package.json');
const appName = packageJson.name.split('.').join('');
const env = process.env.NODE_ENV;
const cdnPath = env === 'pre_development' ? '/' : `//p0.ifengimg.com/fe/zl/test/live/${appName}/`;

gulp.task('polyfill', () => {
    return gulp
        .src('dist/*.html')
        .pipe(
            useref({
                transformPath: filePath => {
                    return path.join(filePath.replace('dist', 'static'));
                },
            }),
        )
        .pipe(gulpif('*.js', uglify({ ie8: true })))
        .pipe(gulpif('*.js', rev()))
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    del(['./dist/*.min.min.js']);
});

gulp.task('cdn', () => {
    return gulp
        .src(path.join(__dirname, '/dist/*.html'))
        .pipe(
            cdn({
                dir: './dist',
                root: {
                    js: cdnPath,
                    css: cdnPath,
                },
            }),
        )
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['polyfill'], () => {
    gulp.start('cdn');
    // gulp.start('clean');
});
