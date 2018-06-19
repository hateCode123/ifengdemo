const glob = require('glob');
const isWin = require('./isWin');
const _ = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function getHTML(globPath, extendName, filepath) {
    // console.log('html');
    let files = glob.sync(globPath);
    if (filepath !== '**') {
        let list = [];
        for (const item of files) {
            for (const path of filepath) {
                // console.log(item+'----'+path);
                if (item.indexOf(path) > -1) {
                    list.push(item)
                }
            }
            
        }
        files = list;

    }
    console.log(files);;

    return files.map(file => {
        // const paths = file.split(isWin() ? '/' : '/');
        // const entryName =  paths[paths.length - 2];

        let path = file.replace('./client/pc/', '').replace('./client/mobile/', '');
        let paths = path.split('/');
        paths.pop();
        let entryName = paths.join('_');

        const conf = {
            filename: `${entryName}${extendName}.html`,
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

// getHTMLs('./views/*/template.ejs');
