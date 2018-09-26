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
const glob = require('glob');
const fs = require('fs');
const sourcemaps = require('gulp-sourcemaps');

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
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(gulpif('*.js', uglify({ ie8: true })))
        .pipe(gulpif('*.js', rev()))
        .pipe(revReplace())
        .pipe(gulpif('*.js', sourcemaps.write('./')))
        .pipe(gulp.dest('dist'));
});

gulp.task('merge_modern', () => {
    let files = glob.sync(`${__dirname}/dist/*.html`);
    for (const file of files) {
        try {
            if (file.indexOf('_modern.html') > -1) {
                continue;
            }

            let text = fs.readFileSync(file, 'utf-8');
            if (/\<\!--include *file="(.+\.html)" -->/.test(text)) {
                let match = text.match(/\<\!--include *file="(.+\.html)" -->/);
                let modern_name = match[1];
                let modern_text = fs.readFileSync(path.join(__dirname, `/dist/${modern_name}`), 'utf-8');
                text = text.replace(/\<\!--include *file="(.+\.html)" -->/, modern_text);
                fs.writeFileSync(file, text, 'utf-8');
            }
        } catch (error) {
            console.log(error);
        }
    }
    del.sync([path.join(__dirname + '/dist/*_modern.html')]);
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
    gulp.start('merge_modern');
    gulp.start('cdn');
    // gulp.start('clean');
});
