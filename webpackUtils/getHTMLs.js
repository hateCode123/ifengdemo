const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getErrorupload = require('./getErrorUpload');
const getPolyfill = require('./getPolyfill');
const env = process.env.NODE_ENV;

module.exports = function getHTML(globPath, extendName, level, filepath) {
    let files = glob.sync(globPath);
    if (filepath && filepath !== '**') {
        let list = [];
        for (const item of files) {
            for (const path of filepath) {
                if (item.indexOf(path) > -1) {
                    list.push(item);
                }
            }
        }
        files = list;
    }

    return files.map(file => {
        let path = file.replace('./client/pc/', '').replace('./client/mobile/', '');
        let paths = path.split('/');
        paths.pop();
        let entryName = paths.join('_');

        const conf = {
            filename: `${entryName}${extendName}.html`,
            polyfill: getPolyfill(level),
            errorupload: env === 'production' ? getErrorupload() : '',
            template: file,
            inject: false,
            hase: false,
            // minify: {
            //     // 压缩HTML文件
            //     removeComments: true, // 移除HTML中的注释
            //     collapseWhitespace: false, // 删除空白符与换行符
            // },
            chunks: [entryName],
        };
        return new HtmlWebpackPlugin(conf);
    });
};
