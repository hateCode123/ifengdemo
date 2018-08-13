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

(async () => {
    await warp('## 检查内网npm包版本', checkPackagesVersion);
    await warp('## 检查crlf格式文件并转化成lf文件', checkCrlffile);
    await warp('## 检查页面 错误上报，polyfile等是否已经正确引入', checkPageInjectScript);
})();

async function warp(title, callback) {
    console.log(title);
    console.time('耗时');
    await callback();
    console.timeEnd('耗时');
    console.log('');
}

// 检查内网 npm 包版本
async function checkPackagesVersion() {
    let list = await request.get({ url: npmPackageUrl, json: true });
    let npm_packages = {};
    for (let item of list) {
        npm_packages[item.name] = item.version;
    }
    let local_packages = Object.assign(package.dependencies, package.devDependencies);
    let warn = false;
    for (const key in local_packages) {
        if (local_packages[key] == 'latest') {
            warn = true;
            log(chalk.red(`"${key}": "${local_packages[key]}" -- 禁止使用latest来安装依赖包！`));
        } else if (npm_packages[key]) {
            try {
                let package = require(`../node_modules/${key}/package.json`);
                if (package.version != npm_packages[key]) {
                    warn = true;
                    log(
                        chalk.red(
                            `"${key}": "${package.version}" -- 本地安装版本较低，发现新版本${
                                npm_packages[key]
                            }, 建议升级到最新版！命令：npm i --save ${key}@${
                                npm_packages[key]
                            } --registry http://npm.ifengcloud.ifeng.com`,
                        ),
                    );
                }
            } catch (error) {
                warn = true;
                log(chalk.red(`"${key}": "${local_packages[key]}" -- 本地没有找到该包，请检查该包是否正确安装！`));
            }

            //console.log(key, package.version, '--', local_packages[key], '--', npm_packages[key]);
        }
    }
    if (!warn) {
        log(chalk.blue(`没有内部包需要更新！`));
    }
}

// 检查页面错误上报，polyfile是否已经正确引入
async function checkCrlffile() {
    shell.exec('crlf --set=LF *');
    shell.exec('crlf --set=LF bin/**/*');
    shell.exec('crlf --set=LF biz/**/*');
    shell.exec('crlf --set=LF static/**/*');
    shell.exec('crlf --set=LF webpackUtils/**/*');
    shell.exec('crlf --set=LF client/**/*.{js,ejs,jsx,json,css}');
}

// 检查页面错误上报，polyfile是否已经正确引入
async function checkPageInjectScript() {
    glob.sync(`${__dirname}/../client/**/**/template.ejs`).forEach(file => {
        let text = fs.readFileSync(file, 'utf-8');
        let errList = [];
        if (!/{{{.+htmlWebpackPlugin.options.errorupload.+}}}/.test(text)) {
            errList.push(
                `请在头部添加错误上报代码(在页面所有js代码之前引入)：{{{ htmlWebpackPlugin.options.errorupload }}}`,
            );
        }

        if (!/{{{.+htmlWebpackPlugin.options.polyfill.+}}}/.test(text)) {
            errList.push(`请在头部添加polyfill兼容代码：{{{ htmlWebpackPlugin.options.polyfill }}}`);
        }
        if (errList.length > 0) {
            log(chalk.red(`### 文件：${file} 发现问题`));
            for (const item of errList) {
                log(chalk.cyan(`    ${item}`));
            }
        }
    });
}
