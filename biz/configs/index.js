/**
 * 常量配置
 */
const glob = require('glob');
const path = require('path');
const logger = require('../common/logger');
const env = process.env.NODE_ENV || 'development';
const pattern = path.join(__dirname, env, '/**/*.json');

const configs = {};

glob.sync(pattern).forEach(file => {
    // console.log(file);
    const name = path.basename(file, '.json');

    try {
        configs[name] = require(file);
    } catch (e) {
        logger.error(`Invalid config file. ${file}\n${e}`);
    }
});

console.info(JSON.stringify(configs));
module.exports = configs;
