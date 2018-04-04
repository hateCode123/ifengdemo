const path = require('path');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');
const px2rem = require('postcss-px2rem');
const nextcss = require('postcss-cssnext');
const postImport = require('postcss-import');
const CleanPlugin = require('clean-webpack-plugin');
const getEntrys = require('./webpackUtils/getEntry');
const getHTMLs = require('./webpackUtils/getHTMLs');
const createConfig = function(type) {
    return {
        devtool: 'cheap-module-source-map',
        entry: getEntrys('./client/views/*/app.js'),
        output: {
            path: path.resolve(__dirname, 'devtmp'),
            filename: `js/[name]_${type}.js`,
            publicPath: '/',
            chunkFilename: `js/[name]_${type}.js`,
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
                },
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
                { test: /\.html$/, loader: 'handlebars-loader' },
            ],
        },

        plugins: [
            new WriteFileWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                // ChipStaticUrl: JSON.stringify('https://ucms.ifeng.com/shard/static/edit/'),
                // ChipRecommendUrl: JSON.stringify('https://ucms.ifeng.com/shard/recommend/edit/'),
                ChipStaticUrl: JSON.stringify('https://wugs.ucms.ifeng.com:8843/shard/static/edit/'),
                ChipRecommendUrl: JSON.stringify(' https://wugs.ucms.ifeng.com:8843/shard/recommend/edit/'),
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'manifest'],
                minChunks: 2,
            }),
            new webpack.NamedModulesPlugin(),
            ...getHTMLs('./client/views/*/template.html', type === 'view' ? '' : '_edit'),
        ],
    };
};
module.exports = [createConfig('view'), createConfig('visualediting')];
