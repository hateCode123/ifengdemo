const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getErrorupload = require('./getErrorUpload');
const getPolyfill = require('./getPolyfill');
const moderPolyfill = require('./getModernPolyfill');
const headScripts = require('./getHeadScripts');
const env = process.env.NODE_ENV;

module.exports = function getHTML(globPath, extendName, level, filepath, mode, type, modern) {
    const isEdit = type == 'edit';
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
    let low_templete = [];
    if (level === 'low') {
        files.map(file => {
            let path = file.replace('./client/pc/', '').replace('./client/mobile/', '');
            let paths = path.split('/');
            paths.pop();
            let entryName = paths.join('_');
            const conf = {
                isEdit: isEdit,
                filename: `${entryName}${extendName}_include.html`,
                template: './client/common/low.ejs',
                inject: false,
                hase: false,
                chunks: [entryName],
            };
            low_templete.push(new HtmlWebpackPlugin(conf));
        });
    }
    return [
        ...low_templete,
        ...files.map(file => {
            let path = file.replace('./client/pc/', '').replace('./client/mobile/', '');
            let paths = path.split('/');
            paths.pop();
            let entryName = paths.join('_');
            const modernName = modern ? '_modern' : '';
            const conf = {
                isEdit: isEdit,
                filename: `${entryName}${extendName}${modernName}.html`,
                polyfill: getPolyfill(level, mode),
                errorupload: getErrorupload(level, mode), //env === 'production' ? getErrorupload() :getErrorupload(),
                modernPolyfill: moderPolyfill,
                headScripts: headScripts,
                template: modern ? './client/common/modern.ejs' : file,
                inject: false,
                hase: false,
                includeName: `${entryName}${extendName}_modern`,
                includelowName: `${entryName}${extendName}_low_include`,
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
        }),
    ];
};
