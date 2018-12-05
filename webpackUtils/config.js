const path = require('path');
const nextcss = require('postcss-cssnext');
const postImport = require('postcss-import');
const adaptive = require('@ifengbuild/postcss-adaptive');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置style-loader，生产模式下会将css提取出来，需要使用 MiniCssExtractPlugin.loader，开发模式使用 style-loader
const setStyleLoader = (plugin => mode => (mode === 'build' ? plugin.loader : 'style-loader'))(MiniCssExtractPlugin);

// 设置样式的名称格式化的方式，在生产环境下，会将样式名后面增加hash
const setStyleName = mode => (mode === 'build' ? '[local]-[hash:base64:8]' : '[path][name]_[local]');

// 根据设备类型不同，设置不同的 postCss-loader plugin
const setPostCssLoaderPulgins = ((nextcss, postImport, adaptive) => (platform, level) =>
    platform === 'pc'
        ? function() {
              return [
                  postImport(),
                  nextcss({
                      browsers: ['last 2 versions', level === 'low' ? 'ie >= 7' : 'ie >= 9'],
                  }),
              ];
          }
        : function() {
              return [
                  postImport(),
                  nextcss({
                      browsers: ['last 2 versions', 'IOS >= 8', 'android>= 4'],
                  }),
                  adaptive({
                      remUnit: 75,
                      autoRem: true,
                      useCssModules: true,
                  }),
              ];
          })(nextcss, postImport, adaptive);

/**
 * 内部开发的样式处理
 * 分为以下6中情况
 *      mode = 'dev', platform = 'pc', level = '' 开发模式pc端
 *      mode = 'dev', platform = 'pc', level = 'low' 开发模式pc端降级
 *      mode = 'dev', platform = 'mobile', level = '' 开发模式移动端
 *      mode = 'build', platform = 'pc', level = '' 生产模式pc端
 *      mode = 'build', platform = 'pc', level = 'low' 生产模式pc端降级
 *      mode = 'build', platform = 'mobile', level = '' 生产模式移动端
 * @param {string} mode 打包模式，默认为dev（开发），build（生产）
 * @param {string} platform 设备类型，默认为 pc，可选还有 mobile，通过设置不同的设备，可以加载不同的 postcss-load plugin
 * @param {string} level 是否需要降级，ie7-8的浏览器下面，传入low，默认为空
 */
const setSelfCssConfig = (mode = 'dev', platform = 'pc', level = '') => {
    return {
        test: /\.css$/,
        include: [path.resolve(__dirname, '../node_modules/@ifeng'), path.resolve(__dirname, '../client')],
        use: [
            setStyleLoader(mode),
            `css-loader?modules&localIdentName=${setStyleName(mode)}`,
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                    plugins: setPostCssLoaderPulgins(platform, level),
                },
            },
        ],
    };
};

/**
 * 依赖的非内部开发组件的样式处理
 * @param {string} mode 打包模式，默认为dev（开发），build（生产）
 */
const setThirdPartCssConfig = mode => ({
    test: /\.css$/,
    exclude: [path.resolve(__dirname, '../node_modules/@ifeng')],
    include: /node_modules/,
    use: [setStyleLoader(mode), 'css-loader'],
});

/**
 * 设置alias，用于区分设备和打包类型
 * 分为以下三种情况
 *      type = 'view', level = '' 展示模式
 *      type = 'view', level = 'low' 展示模式，降级
 *      type = 'edit', level = '' 可视化编辑模式
 * @param {string} type 显示模式，分 view（正常展示） edit（可视化编辑）
 * @param {string} level 是否需要降级，ie7-8的浏览器下面，传入low，默认为空
 */
const setAlias = (type = 'view', level = '') => ({
    ...{
        // 可视化编辑组件，在展示模式下，只需要加载一个空组件，这样可以将可视化的业务代码不暴露到展示页面上。
        Chip:
            type === 'view'
                ? '@ifeng/visualediting/src/components/ChipView'
                : '@ifeng/visualediting/src/components/Chip',
        // 可视化编辑组件，在展示模式下，只需要加载一个空组件，这样可以将可视化的业务代码放在内网。
        ChipEdit:
            type === 'view'
                ? '@ifeng/visualediting/src/components/ChipEditView'
                : '@ifeng/visualediting/src/components/ChipEdit',
        // 数据转换组件。
        chipDataTransform:
            type === 'view'
                ? path.resolve(__dirname, '../biz/common/transformView.js')
                : path.resolve(__dirname, '../biz/common/transform.js'),
    },
    // 对于ie7-8下面，将react库转换成anujs，将video组件转换成flash播放器的组件，将ajv换成空函数
    ...(level === ''
        ? {}
        : {
              react: 'anujs/dist/ReactIE.js',
              'react-dom': 'anujs/dist/ReactIE.js',
              'prop-types': 'anujs/lib/ReactPropTypes',
              devtools: 'anujs/lib/devtools',
              'create-react-class': 'anujs/lib/createClass',
              '@ifeng/ui_pc_video': '@ifeng/ui_pc_video-ie8',
              ajv: path.resolve(__dirname, '../client/pc/utils/ajv.js'),
          }),
});

/**
 * 设置 babel-loader，modern 对支持 script type='module' 的采用es2015+的转换方式
 * https://philipwalton.com/articles/deploying-es2015-code-in-production-today/
 */
const setBabelLoader = (modern = false, level = '') => ({
    loader: 'babel-loader',
    options: {
        cacheDirectory: true,
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        browsers: modern
                            ? ['Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15']
                            : ['last 2 versions', level === 'low' ? 'ie >= 7' : 'ie >= 9'],
                    },
                    loose: level === 'low' ? true : false,
                    modules: 'commonjs',
                    useBuiltIns: 'entry',
                    debug: false,
                },
            ],
            '@babel/preset-react',
        ],
        plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings',
            [
                '@babel/plugin-proposal-decorators',
                {
                    legacy: true,
                },
            ],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',
            '@babel/plugin-transform-async-to-generator',
        ],
    },
});

/**
 * 对于js的配置，根据不同的开发模式，打包选型，是否降级的设置输出不同类型的config
 * 分别对应以下6种情况
 *        mode = 'dev', modern = false, level = '' 开发模式下正常打包
 *        mode = 'dev', modern = true, level = ''  开发模式下支持type=module的打包
 *        mode = 'dev', modern = false, level = 'low' 开发模式下降级打包
 *        mode = 'build', modern = false, level = '' 生产模式下正常打包
 *        mode = 'build', modern = true, level = '' 生产模式下支持type=module的打包
 *        mode = 'build', modern = false, level = 'low' 生产模式下降级打包
 * @param {boolean} modern 是否使用现在模式，默认为false
 * @param {string} level 是否需要降级，ie7-8的浏览器下面，传入low，默认为空
 * @param {string} level 是否需要降级，ie7-8的浏览器下面，传入low，默认为空
 */
const setJsConfig = (mode = 'dev', modern = false, level = '') => ({
    test: /\.jsx?$/,
    use: mode === 'dev' ? setBabelLoader(modern, level) : 'happypack/loader?id=babel',
    // exclude: /node_modules/,
    include: [path.resolve(__dirname, '../node_modules/@ifeng'), path.resolve(__dirname, '../client')],
});

module.exports = {
    setJsConfig,
    setAlias,
    setThirdPartCssConfig,
    setSelfCssConfig,
    setBabelLoader,
};
