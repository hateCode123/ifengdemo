const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getErrorupload = require('./getErrorUpload');
const getPolyfill = require('./getPolyfill');
const moderPolyfill = require('./getModernPolyfill');
const env = process.env.NODE_ENV;

module.exports = function getHTML(globPath, extendName, level, filepath, mode, type, modern) {
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
        const modernName = modern ? '_modern' : '';
        const conf = {
            filename: `${entryName}${extendName}${modernName}.html`,
            polyfill: getPolyfill(level, mode),
            errorupload: getErrorupload(level, mode), //env === 'production' ? getErrorupload() :getErrorupload(),
            modernPolyfill: moderPolyfill,
            template: modern ? './client/common/modern.ejs' : file,
            inject: false,
            hase: false,
            includeName: `${entryName}${extendName}_modern`,
            isDevMode: mode === 'dev',
            useMorden: level !== 'low' && type === 'view',
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
