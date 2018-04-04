const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const px2rem = require('postcss-px2rem');
const nextcss = require('postcss-cssnext');
const postImport = require('postcss-import');
const CleanPlugin = require('clean-webpack-plugin');
const getEntrys = require('./webpackUtils/getEntry');
const getHTMLs = require('./webpackUtils/getHTMLs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJson = require('./package.json');
const appName = packageJson.name.split('.').join('');

const createConfig = function(type) {
    return {
        devtool: 'source-map',
        entry: getEntrys('./client/views/*/app.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `[name].${type}.[chunkhash:5].js`,
            publicPath: '//p0.ifengimg.com/fe/zl/test/live/' + appName + '/',
            //publicPath: '/',
            chunkFilename: `[name].${type}.[chunkhash:5].js`,
        },
        resolve: {
            alias: {
                Chip:
                    type === 'view'
                        ? '@ifeng/visualediting/src/components/ChipView'
                        : '@ifeng/visualediting/src/components/Chip',
                ChipEdit:
                    type === 'view'
                        ? '@ifeng/visualediting/src/components/ChipEditView'
                        : '@ifeng/visualediting/src/components/ChipEdit',
            },
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    'env',
                                    {
                                        targets: {
                                            browsers: ['last 2 versions', 'ie >= 9'],
                                        },
                                        modules: false,
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
                    // exclude: /node_modules/,
                    include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
                },
                {
                    test: /\.css$/,
                    include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader?modules&localIdentName=[local]-[hash:base64:5]',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: function() {
                                        return [
                                            postImport(),
                                            nextcss({
                                                browsers: ['last 2 versions', 'ie >= 9'],
                                            }),
                                            // px2rem({
                                            //     remUnit: 75,
                                            // }),
                                        ];
                                    },
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 100,
                                name: '[name].[ext]',
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

        plugins: [
            // new BundleAnalyzerPlugin({
            //     analyzerPort: type === 'view' ? 8888 : 8887
            // }),
            new webpack.HashedModuleIdsPlugin(),
            new WebpackMd5Hash(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
                ChipStaticUrl: JSON.stringify('https://ucms.ifeng.com/shard/static/edit/'),
                ChipRecommendUrl: JSON.stringify('https://ucms.ifeng.com/shard/recommend/edit/'),
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor'],
                minChunks: 2,
            }),
            new ExtractTextPlugin({
                filename:'[name].[contenthash:5].css',
                allChunks: true
            }),
            new CleanPlugin(['dist']),
            ...getHTMLs('./client/views/*/template.html', type === 'view' ? '' : '_edit'),
        ],
    };
};

module.exports = [createConfig('view'), createConfig('visualediting')];
