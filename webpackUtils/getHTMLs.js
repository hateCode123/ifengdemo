const glob = require('glob');
const isWin = require('./isWin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function getHTML(globPath, extendName) {
    const files = glob.sync(globPath);
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
            inject: 'body',
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
