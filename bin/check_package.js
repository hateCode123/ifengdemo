const package = require('../package.json');
const request = require('../biz/common/request');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const chalk = require('chalk');
const log = console.log;
const npmPackageUrl = 'http://npm.ifengcloud.ifeng.com/-/verdaccio/packages';
// console.dir(package, {depth: null});
const n = require.resolve('request');
// console.log('--------');
// console.log(n);
// console.log('--------');
// return;
(async () => {
    let list = await request.get({ url: npmPackageUrl, json: true });
    let npm_packages = {};
    for (let item of list) {
        npm_packages[item.name] = item.version;
    }
    // console.dir(npm_packages, { depth: null });

    let local_packages = Object.assign(package.dependencies, package.devDependencies);
    // console.dir(local_packages, { depth: null });
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
                            `"${key}": "${package.version}" -- 本地安装版本较低，发现新版本${npm_packages[key]}, 建议升级到最新版！命令：npm i --save ${key}@${npm_packages[key]} --registry http://npm.ifengcloud.ifeng.com`,
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
    if(!warn){
        log(chalk.blue(`没有内部包需要更新！`));
    }
})();
