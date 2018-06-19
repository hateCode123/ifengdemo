
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
// const px2rem = require('postcss-px2rem');
const nextcss = require('postcss-cssnext');
const postImport = require('postcss-import');
const aspectRatioMini = require('postcss-aspect-ratio-mini');
const pxToViewport = require('postcss-px-to-viewport');
const viewPortUnits = require('postcss-viewport-units');
const writeSvg = require('postcss-write-svg');
const CleanPlugin = require('clean-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const getEntrys = require('./webpackUtils/getEntry');
const getHTMLs = require('./webpackUtils/getHTMLs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const packageJson = require('./package.json');
const appName = packageJson.name.split('.').join('');
const env = process.env.NODE_ENV;

const HappyPack = require('happypack');
const os = require('os');
// const halfCpuCount = Math.floor(os.cpus().length / 2);
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });

console.log('cpus============>', os.cpus().length);

const pcCssConfig = function(level) {
    return {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader?modules&localIdentName=[local]-[hash:base64:8]',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: function() {
                        return [
                            postImport(),
                            nextcss({
                                browsers: ['last 2 versions', level === '' ? 'ie >= 9' : 'ie >= 7'],
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
};

const commoncss = {
    test: /\.css$/,
    exclude: [path.resolve(__dirname, 'node_modules/@ifeng')],
    include: /node_modules/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
};

const mobileCssConfig = function(level) {
    return {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader?modules&localIdentName=[local]-[hash:base64:8]',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: function() {
                        return [
                            postImport(),
                            aspectRatioMini(),
                            writeSvg({ utf8: false }),
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
};

const fileExtend = {
    pc_view: '',
    pc_view_low: '_low',
    pc_edit: '_edit',
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

const createConfig = function(type, platform, cssConfig, level) {
    return {
        devtool: 'source-map',
        entry: getEntrys(platform === 'pc' ? './client/pc/**/app.jsx' : './client/mobile/**/app.jsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `[name].${platform}_${type}${level ? '_' + level : ''}.[chunkhash:8].js`,
            // publicPath: '//p0.ifengimg.com/fe/zl/test/live/' + appName + '/',
            publicPath: env === 'pre_development' ? '/' : '//p0.ifengimg.com/fe/zl/test/live/' + appName + '/',
            chunkFilename: `[name].${platform}_${type}${level ? '_' + level : ''}.[chunkhash:8].js`,
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
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: os.cpus().length - 4,
                    uglifyOptions: {
                        ie8: level === '' ? false : true,
                    },
                    sourceMap: true,
                }),
            ],
            splitChunks: {
                // cacheGroups: {
                //     // base: {
                //     //     test: /([\\/]node_modules[\\/]react[\\/])|([\\/]node_modules[\\/]react-dom[\\/])/,
                //     //     name: 'base',
                //     //     chunks: 'all',
                //     //     priority: 20,
                //     // },
                //     comp: {
                //         test: /[\\/]node_modules[\\/]/,
                //         name: 'comp',
                //         chunks: 'all',
                //         priority: 10,
                //     },
                // },
                chunks: 'all',
                // name: 'common',
                // chunks: 'all',
                // minSize: 100,
                // name: 'common',
                // cacheGroups: {
                //     base: {
                //         test: /comp/
                //     }
                // }
            },
            // runtimeChunk: {
            //     name: 'runtime',
            // },
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: 'happypack/loader?id=babel',
                    // use: {
                    //     loader: 'babel-loader',
                    //     options: {
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
                cssConfig(level),
                commoncss,
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 100,
                                name: '[name].[hash:8].[ext]',
                            },
                        },
                    ],
                },
                // {
                //     test: /\.ejs$/,
                //     use: ['f.lib.ejs-loader', 'f.lib.ejs-src-loader'],
                // },
                { test: /\.html$/, loader: 'handlebars-loader' },
            ],
        },
        mode: 'production',
        plugins: [
            // new BundleAnalyzerPlugin(),
            // new BundleAnalyzerPlugin({ analyzerPort: type === 'view' ? 8888 : 8887 }),
            // new webpack.HashedModuleIdsPlugin(),
            // new WebpackChunkHash({ algorithm: 'md5' }),
            new webpack.DefinePlugin({
                // 'process.env.NODE_ENV': JSON.stringify('production'),
                ChipUrl: JSON.stringify('https://ucms.ifeng.com/shard'),
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['vendor'],
            //     minChunks: 2,
            // }),
            // new ExtractTextPlugin({
            //     filename: '[name].[contenthash:8].css',
            //     allChunks: true,
            // }),
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
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
            new CleanPlugin(['dist']),
            ...getHTMLs(
                platform === 'pc' ? './client/pc/**/template.html' : './client/mobile/**/template.html',
                fileExtend[`${platform}_${type}${level ? '_' + level : ''}`],
            ),
        ],
    };
};



console.log('========================='+process.argv[process.argv.length-1]);
let list = [];
// list.push(createConfig('view', 'pc', pcCssConfig, ''));

if(process.argv[process.argv.length-1]=='pc_low'){
    list.push(createConfig('view', 'pc', pcCssConfig, 'low'));
}

if(process.argv[process.argv.length-1]=='pc'){
    console.log('===============123');
    list.push(createConfig('view', 'pc', pcCssConfig, ''));
}

if(process.argv[process.argv.length-1]=='pc_edit'){
    list.push(createConfig('edit', 'pc', pcCssConfig, ''));
}

if(process.argv[process.argv.length-1]=='mobile'){
    list.push(createConfig('view', 'mobile', mobileCssConfig, '')); 
}

if(process.argv[process.argv.length-1]=='mobile_edit'){
    list.push(createConfig('edit', 'mobile', mobileCssConfig, ''));        
}
module.exports = list;
// module.exports = [
//     // createConfig('view', 'pc', pcCssConfig, 'low'),         // pc_low
//     createConfig('view', 'pc', pcCssConfig, ''),            // pc
//     // createConfig('edit', 'pc', pcCssConfig, ''),            // pc_edit
//     // createConfig('view', 'mobile', mobileCssConfig, ''),    // mobile
//     // createConfig('edit', 'mobile', mobileCssConfig, ''), // mobile_edit
// ];
