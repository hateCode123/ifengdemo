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
const _edit_inject_html = `
<head>
<script>
    try {
        document.getElementsByTagName('html')[0].style.visibility = 'hidden';
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://ucms.ifeng.com/api/heartbeat', true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                document.getElementsByTagName('html')[0].style.visibility = '';
            } else {
                window.location.href=window.location.href.split('/visualediting').join('');
            }
          }
        }
        xhr.timeout = 2000;
        xhr.send(null,'');
    } catch (e) {
        window.location.href=window.location.href.split('/visualediting').join('');
    }
</script>`;

// 合并js
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

// 将现代浏览器js注入到页面
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

//将编辑页外网判断注入页面
gulp.task('merge_edit_inject', () => {
    let files = glob.sync(`${__dirname}/dist/*edit.html`);

    for (const file of files) {
        try {
            let text = fs.readFileSync(file, 'utf-8');
            if (file.indexOf('_edit.html') > -1) {
                text = text.replace(/\<head\>/, _edit_inject_html);
                fs.writeFileSync(file, text, 'utf-8');
            }
        } catch (error) {
            console.log(error);
        }
    }
    del.sync([path.join(__dirname + '/dist/*_modern.html')]);
});

// 将合并后的js链接，转为 cdn 链接
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

// 默认执行
gulp.task('default', ['polyfill'], () => {
    gulp.start('merge_modern');
    gulp.start('merge_edit_inject');
    gulp.start('cdn');
});
