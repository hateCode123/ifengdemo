const path = require('path');
// const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');
// const px2rem = require('postcss-px2rem');
const nextcss = require('postcss-cssnext');
const postImport = require('postcss-import');
const aspectRatioMini = require('postcss-aspect-ratio-mini');
const pxToViewport = require('postcss-px-to-viewport');
const viewPortUnits = require('postcss-viewport-units');
const writeSvg = require('postcss-write-svg');
const CleanPlugin = require('clean-webpack-plugin');
const getEntrys = require('./webpackUtils/getEntry');
const getHTMLs = require('./webpackUtils/getHTMLs');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: 1 });

const pcCssConfig = {
    test: /\.css$/,
    // exclude: /node_modules/,
    include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
    use: [
        'style-loader',
        'css-loader?modules&localIdentName=[path][name]_[local]',
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                plugins: function() {
                    return [
                        postImport(),
                        nextcss({
                            browsers: ['last 2 versions', 'ie >= 9'],
                            // browsers: ['chrome >= 56'],
                        }),

                        // px2rem({
                        //     remUnit: 75,
                        // }),
                    ];
                },
            },
        },
    ],
};

const commoncss = {
    test: /\.css$/,
    exclude: [path.resolve(__dirname, 'node_modules/@ifeng')],
    include: /node_modules/,
    use: ['style-loader', 'css-loader'],
};

const mobileCssConfig = {
    test: /\.css$/,
    // exclude: /node_modules/,
    include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
    use: [
        'style-loader',
        'css-loader?modules&localIdentName=[path][name]_[local]',
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                plugins: function() {
                    return [
                        postImport(),
                        aspectRatioMini(),
                        writeSvg({
                            utf8: false,
                        }),
                        pxToViewport({
                            viewportWidth: 750,
                            viewportHeight: 1334,
                            unitPrecision: 5,
                            viewportUnit: 'vw',
                            selectorBlackList: ['.ignore', '.hairlines'],
                            minPixelValue: 1,
                            mediaQuery: false,
                        }),
                        viewPortUnits(),
                        nextcss({
                            browsers: ['last 2 versions', 'ie >= 9'],
                            // browsers: ['chrome >= 56'],
                        }),

                        // px2rem({
                        //     remUnit: 75,
                        // }),
                    ];
                },
            },
        },
    ],
};

const fileExtend = {
    pc_view: '',
    pc_edit: '_edit',
    pc_view_low: '_low',
    mobile_view: '_mobile',
    mobile_edit: '_mobile_edit',
};

const getAliasFrame = function getAliasFram(level) {
    return level === ''
        ? {}
        : {
              react: 'anujs/dist/ReactIE.js',
              'react-dom': 'anujs/dist/ReactIE.js',
              'prop-types': 'anujs/lib/ReactPropTypes',
              devtools: 'anujs/lib/devtools',
              'create-react-class': 'anujs/lib/createClass',
          };
};

const createConfig = function(type, platform, cssConfig, level,filepath) {
    return {
        devtool: 'cheap-module-source-map',
        entry: getEntrys(platform === 'pc' ? `./client/pc/**/app.jsx` : `./client/mobile/**/app.jsx`,filepath),
        output: {
            path: path.resolve(__dirname, 'devtmp'),
            filename: `js/[name]_${platform}_${type}${level ? '_' + level : ''}.js`,
            publicPath: '/',
            chunkFilename: `js/[name]_${platform}_${type}${level ? '_' + level : ''}.js`,
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx'],
            alias: {
                Chip:
                    type === 'view'
                        ? '@ifeng/visualediting/src/components/ChipView'
                        : '@ifeng/visualediting/src/components/Chip',
                ChipEdit:
                    type === 'view'
                        ? '@ifeng/visualediting/src/components/ChipEditView'
                        : '@ifeng/visualediting/src/components/ChipEdit',
                ...getAliasFrame(level),
            },
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: 'happypack/loader?id=babel',
                    // use: {
                    //     loader: 'babel-loader',
                    //     options: {
                    //         cacheDirectory: true,
                    //         presets: [
                    //             [
                    //                 'env',
                    //                 {
                    //                     targets: {
                    //                         browsers: ['last 2 versions', level === '' ? 'ie >= 9' : 'ie >= 7'],
                    //                     },
                    //                     modules: level === '' ? false : 'commonjs',
                    //                     useBuiltIns: true,
                    //                     debug: false,
                    //                 },
                    //             ],
                    //             'react',
                    //             'stage-2',
                    //         ],

                    //         plugins: ['transform-runtime'],
                    //     },
                    // },
                    // exclude: /node_modules/,
                    include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
                },
                cssConfig,
                commoncss,
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 100,
                                name: 'asset/[name].[ext]',
                            },
                        },
                    ],
                },
                // {
                //     test: /\.ejs$/,
                //     use: ['f.lib.ejs-loader', 'f.lib.ejs-src-loader'],
                // },
                {
                    test: /\.html$/,
                    loader: 'handlebars-loader',
                },
            ],
        },
        mode: 'development',
        plugins: [
            // new BundleAnalyzerPlugin(),
            // new WriteFileWebpackPlugin(),
            ...(level === '' ? [] : [new es3ifyPlugin()]),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                ChipUrl: JSON.stringify('https://ucms.ifeng.com/shard'),
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['vendor', 'manifest'],
            //     minChunks: 2,
            // }),
            // new webpack.NamedModulesPlugin(),

            new HappyPack({
                id: 'babel',
                loaders: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: [
                                [
                                    'env',
                                    {
                                        targets: {
                                            browsers: ['last 2 versions', level === '' ? 'ie >= 9' : 'ie >= 7'],
                                        },
                                        modules: level === '' ? false : 'commonjs',
                                        useBuiltIns: true,
                                        debug: false,
                                    },
                                ],
                                'react',
                                'stage-2',
                            ],

                            plugins: ['transform-runtime'],
                        },
                    },
                ],
                threadPool: happyThreadPool,
                verbose: true,
            }),
            ...getHTMLs(
                platform === 'pc' ? `./client/pc/**/template.html` : `./client/mobile/**/template.html`,
                fileExtend[`${platform}_${type}${level ? '_' + level : ''}`],
                filepath
            ),
        ],
    };
};


let json = process.argv[process.argv.length-1]
json = decodeURIComponent(json);
json = JSON.parse(json);
console.log(json);
// { platform: [ 'pc', 'mobile' ],
//   type: [ 'view', 'edit' ],
//   path: [ 'finace/index', 'finace/money' ] }
let list = [];
if(json.platform.indexOf('pc')>-1 && json.type.indexOf('view')>-1){

    list.push(createConfig('view', 'pc', pcCssConfig, '',json.path));
}

if(json.platform.indexOf('pc')>-1 && json.type.indexOf('low')>-1){
    list.push(createConfig('view', 'pc', pcCssConfig, 'low',json.path));
}

if(json.platform.indexOf('pc')>-1 && json.type.indexOf('edit')>-1){
    list.push(createConfig('edit', 'pc', pcCssConfig, '',json.path));
}

if(json.platform.indexOf('mobile')>-1 && json.type.indexOf('view')>-1){
    list.push(createConfig('view', 'mobile', mobileCssConfig, '',json.path));
}

if(json.platform.indexOf('mobile')>-1 && json.type.indexOf('edit')>-1){
    list.push(createConfig('edit', 'mobile', mobileCssConfig, '',json.path));
}
module.exports = list;

// console.log(json);
// // module.exports = [createConfig('view', 'pc', pcCssConfig), createConfig('visualediting', 'pc', pcCssConfig)];
// module.exports = [
//     createConfig('view', 'pc', pcCssConfig, ''),
//     createConfig('view', 'pc', pcCssConfig, 'low'),
//     createConfig('edit', 'pc', pcCssConfig, ''),
//     createConfig('view', 'mobile', mobileCssConfig, ''),
//     createConfig('edit', 'mobile', mobileCssConfig, ''),
// ];
// // module.exports = [createConfig('view', 'pc', pcCssConfig), createConfig('edit', 'pc', pcCssConfig)];
