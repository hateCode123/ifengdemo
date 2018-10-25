const package = require('../package.json');
const request = require('../biz/common/request');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const glob = require('glob');
const log = console.log;
const npmPackageUrl = 'http://npm.ifengcloud.ifeng.com/-/verdaccio/packages';
const shell = require('shelljs');
const crlf = require('crlf');
const cheerio = require('cheerio');

function info(str) {
    log(chalk.blue(str));
}

function warn(str) {
    log(chalk.yellow(str));
}

function error(str) {
    log(chalk.red(str));
}

async function warp(title, callback) {
    console.log(title);
    console.time('耗时');
    await callback();
    console.timeEnd('耗时');
    console.log('');
}

(async () => {
    console.time('总耗时');
    await warp('## 检查内网npm包版本', checkPackagesVersion);
    await warp('## 检查crlf格式文件并转化成lf文件', checkCrlffile);
    await warp('## 检查模板', checkPageInjectScript);
    await warp('## 检查api引入是否正确', checkAPI);
    console.timeEnd('总耗时');
})();

// 检查内网 npm 包版本
async function checkPackagesVersion() {
    let list = await request.get({ url: npmPackageUrl, json: true });
    let npm_packages = {};
    for (let item of list) {
        npm_packages[item.name] = item.version;
    }
    //let local_packages = Object.assign(package.dependencies, package.devDependencies);
    let warn_status = false;
    let check = (json, param) => {
        for (const key in json) {
            if (json[key] == 'latest') {
                warn_status = true;
                error(`"${key}": "${json[key]}" -- 禁止使用latest来安装依赖包！`);
            } else if (npm_packages[key]) {
                try {
                    let package = require(`../node_modules/${key}/package.json`);
                    if (package.version != npm_packages[key]) {
                        warn_status = true;
                        warn(
                            `"${key}": "${package.version}" -- 本地安装版本较低，发现新版本${
                                npm_packages[key]
                            }, 建议升级到最新版！命令：npm i --save${param} ${key}@${
                                npm_packages[key]
                            } --registry http://npm.ifengcloud.ifeng.com`,
                        );
                    }
                } catch (err) {
                    console.log(err);
                    warn_status = true;
                    error(`"${key}": "${json[key]}" -- 本地没有找到该包，请检查该包是否正确安装！`);
                }
            }
        }
    };
    check(package.dependencies, '');
    check(package.devDependencies, '-dev');

    if (!warn_status) {
        info(`没有内部包需要更新！`);
    }
}

// 检查页面错误上报，polyfile是否已经正确引入
async function checkCrlffile() {
    let checkType = file => {
        return new Promise((resolve, reject) => {
            crlf.get(path.join(__dirname, '../', file), null, function(err, endingType) {
                resolve(endingType);
            });
        });
    };

    let changeType = file => {
        return new Promise((resolve, reject) => {
            crlf.set(path.join(__dirname, '../', file), 'LF', function(err, endingType) {
                // console.log(file,endingType); // LF
                // file was using LF and now uses CRLF
                resolve(endingType);
            });
        });
    };
    let files = [];
    let patterns = [
        '.*',
        '*',
        'bin/**/*',
        'biz/**/*',
        'static/**/*',
        'webpackUtils/**/*',
        'client/**/*.{js,ejs,jsx,css}',
    ];
    for (const pattern of patterns) {
        files = files.concat(glob.sync(pattern, { nodir: true }));
    }

    for (const file of files) {
        let filetype = await checkType(file);
        if (filetype === 'LF' || filetype == 'NA') {
            continue;
        }

        changeType(file);
        info(`${filetype} ${file} -> LF`);
    }

    // shell.exec('crlf --set=LF .*');
    // shell.exec('crlf --set=LF *');
    // shell.exec('crlf --set=LF bin/**/*');
    // shell.exec('crlf --set=LF biz/**/*');
    // shell.exec('crlf --set=LF static/**/*');
    // shell.exec('crlf --set=LF webpackUtils/**/*');
    // shell.exec('crlf --set=LF client/**/*.{js,ejs,jsx,css}');
}

// 检查页面错误上报，polyfile是否已经正确引入
async function checkPageInjectScript() {
    glob.sync(`${__dirname}/../client/pc/**/template.*`).forEach(file => {
        if (path.extname(file) !== '.ejs') {
            warn(`### 模板文件：${path.join(file)}\t扩展名应为.ejs`);
        }
    });

    glob.sync(`${__dirname}/../client/pc/**/*.ejs`).forEach(file => {
        if (path.basename(file) !== 'template.ejs') {
            warn(`### 模板文件：${path.join(file)} 命名错误，期望：template.ejs，实际：${path.basename(file)}`);
        }
    });

    glob.sync(`${__dirname}/../client/pc/**/template.ejs`).forEach(file => {
        let text = fs.readFileSync(file, 'utf-8');
        let errList = [];
        // 错误上报
        if (!/{{{.+htmlWebpackPlugin.options.errorupload.+}}}/.test(text)) {
            errList.push(
                `请在head中添加错误上报代码(在页面所有js代码之前引入)：{{{ htmlWebpackPlugin.options.errorupload }}}`,
            );
        }

        // 兼容代码
        if (!/{{{.+htmlWebpackPlugin.options.polyfill.+}}}/.test(text)) {
            errList.push(`请在head中添加polyfill兼容代码：{{{ htmlWebpackPlugin.options.polyfill }}}`);
        }

        // 统计
        if (!/\<\%\- *statisticsData\.statisticsHead *\%\>/.test(text)) {
            errList.push(`请在head中添加统计代码：<%- statisticsData.statisticsHead %>`);
        }
        if (!/\<\%\- *statisticsData\.statisticsBody *\%\>/.test(text)) {
            errList.push(`请在body中添加统计代码：<%- statisticsData.statisticsBody %>`);
        }

        // 广告
        if (!/\<\%\- *decodeURIComponent\(adData.adHead\) *\%\>/.test(text)) {
            errList.push(`请在head中添加广告代码：<%- decodeURIComponent(adData.adHead) %>`);
        }
        if (!/\<\%\- *decodeURIComponent\(adData.adBody\) *\%\>/.test(text)) {
            errList.push(`请在body中添加广告代码：<%- decodeURIComponent(adData.adBody) %>`);
        }

        if (
            !(
                /<\%\- *JSON\.stringify\(adData\) *\%\>/.test(text) &&
                text.indexOf('decodeURIComponent(adData[key])') > 0
            )
        ) {
            errList.push(`请对广告碎片做容错处理`);
        }

        $ = cheerio.load(text);

        if ($('title').length == 0) {
            errList.push(`<title>标签缺失`);
        } else {
            if (!$('title').text()) {
                errList.push(`请设置<title>标签内容`);
            }
        }

        if ($('meta[name=keywords]').length == 0) {
            errList.push(`<meta name="keywords">标签缺失`);
        } else {
            if (!$('meta[name=keywords]').attr('content')) {
                errList.push(`<meta name="keywords">标签, content属性不能为空`);
            }
        }

        if ($('meta[name=description]').length == 0) {
            errList.push(`<meta name="description">标签缺失`);
        } else {
            if (!$('[name=description]').attr('content')) {
                errList.push(`<meta name="description">标签, content属性不能为空`);
            }
        }

        if (errList.length > 0) {
            warn(`\n### 文件：${file} 发现问题`);
            for (const item of errList) {
                warn(`    ${item}`);
            }
        }
    });
}

// 检查api接口是否都放在了service中
async function checkAPI() {
    let files = glob.sync(path.resolve(`${__dirname}/../client/pc/**/*.js*`));
    for (let file of files) {
        if (/client\/pc\/services/.test(file)) {
            continue;
        }

        let text = fs.readFileSync(file, 'utf-8');

        if (/@ifeng\/ui_base/.test(text) && (/jsonp\(/.test(text) || /ajax\(/.test(text))) {
            warn(`\n文件：${file}`);
            text = text.replace(/\r\n/g, '#$ifeng$##$ifeng$#');
            text = text.replace(/\n/g, '#$ifeng$##$ifeng$#');

            let lines = text.split('#$ifeng$##$ifeng$#');
            // console.log(lines)

            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                if (/jsonp\(/.test(line) || /ajax\(/.test(text)) {
                    warn(`第${i + 1}行:${line} ...  `);
                }
            }
            warn(`警告：api请求应该放到/pc/services/api.js`);
        }
    }
}
