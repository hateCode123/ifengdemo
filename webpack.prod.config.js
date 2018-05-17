const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const packageJson = require('./package.json');
const appName = packageJson.name.split('.').join('');
const env = process.env.NODE_ENV;

const pcCssConfig = {
    test: /\.css$/,
    include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader?modules&localIdentName=[local]-[hash:base64]',
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
};

const commoncss = {
    test: /\.css$/,
    exclude: [path.resolve(__dirname, 'node_modules/@ifeng')],
    include: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader',
        ],
    }),
};

const mobileCssConfig = {
    test: /\.css$/,
    include: [path.resolve(__dirname, 'node_modules/@ifeng'), path.resolve(__dirname, 'client')],
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            'css-loader?modules&localIdentName=[local]-[hash:base64]',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: function() {
                        return [
                            postImport(),
                            aspectRatioMini(),
                            writeSvg({utf8: false}),
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
    }),
};

const fileExtend = {
    pc_view : '',
    pc_edit: '_edit',
    mobile_view: '_mobile',
    mobile_edit: '_mobile_edit'
};

const createConfig = function(type, platform, cssConfig) {
    return {
        devtool: 'source-map',
        entry: getEntrys(platform === 'pc' ? './client/pc/**/app.jsx' : './client/mobile/**/app.jsx'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `[name].${platform}_${type}.[chunkhash].js`,
            publicPath: '//p0.ifengimg.com/fe/zl/test/live/' + appName + '/',
            publicPath: env === 'pre_development'? '/' : ('//p0.ifengimg.com/fe/zl/test/live/' + appName + '/'),
            chunkFilename: `[name].${platform}_${type}.[chunkhash].js`,
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
                cssConfig,
                commoncss,
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
                filename:'[name].[contenthash].css',
                allChunks: true
            }),
            new CleanPlugin(['dist']),
            ...getHTMLs(platform === 'pc' ? './client/pc/**/template.html' : './client/mobile/**/template.html', fileExtend[`${platform}_${type}`]),
        ],
    };
};

module.exports = [createConfig('view', 'pc', pcCssConfig), createConfig('edit', 'pc', pcCssConfig), createConfig('view', 'mobile', mobileCssConfig), createConfig('edit', 'mobile', mobileCssConfig)];

