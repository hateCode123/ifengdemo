/**
 * 常量配置
 */
const glob = require('glob');
const path = require('path');
const logger = require('../common/logger');
const env = process.env.NODE_ENV || "development";
const pattern = path.join(__dirname,env,'/**/*.json');
console.log(pattern);
let configs = {};
glob.sync(pattern).forEach(file => {
    console.log(file);
    let name = path.basename(file,'.json');
    try {
        configs[name] = require(file);
    }catch (e){
        logger.error(`Invalid config file. ${file}\n${e}`);
    }
});
console.dir(configs,{depth:null});
module.exports = configs;
