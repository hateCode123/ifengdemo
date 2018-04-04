const glob = require('glob');
const isWin = require('./isWin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function getHTML (globPath, extendName) {
    const files = glob.sync(globPath);
    return files.map(file => {
        const paths = file.split(isWin() ? '/' : '/');
        const entryName = paths[paths.length - 2];
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
            chunks: [entryName, 'vendor', 'manifest'],
        };
        return new HtmlWebpackPlugin(conf);
    });

}

// getHTMLs('./views/*/template.ejs');