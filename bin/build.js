const shell = require('shelljs');
const del = require('del');
const path = require('path');

// 清除dist目录
del.sync([path.join(__dirname + '/../dist/**')]);

const callback = type => {
    return (code, stdout, stderr) => {
        console.timeEnd(type);
        if (/ERROR in/gi.test(stdout)) {
            throw new Error('Webpack packaging failed, please check the front-end code! ');
        }
    };
};

console.time('pc_low');
console.time('pc');
console.time('pc_modern');
console.time('pc_edit');
console.time('mobile');
console.time('mobile_modern');
console.time('mobile_edit');

shell.exec('webpack --config webpack.prod.config.js --env.name pc_low', { async: true }, callback('pc_low'));
shell.exec('webpack --config webpack.prod.config.js --env.name pc', { async: true }, callback('pc'));
shell.exec('webpack --config webpack.prod.config.js --env.name pc_modern', { async: true }, callback('pc_modern'));
shell.exec('webpack --config webpack.prod.config.js --env.name pc_edit', { async: true }, callback('pc_edit'));
shell.exec('webpack --config webpack.prod.config.js --env.name mobile', { async: true }, callback('mobile'));
shell.exec(
    'webpack --config webpack.prod.config.js --env.name mobile_modern',
    { async: true },
    callback('mobile_modern'),
);
shell.exec('webpack --config webpack.prod.config.js --env.name mobile_edit', { async: true }, callback('mobile_edit'));
