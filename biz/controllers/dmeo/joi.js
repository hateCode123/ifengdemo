const Joi = require('joi');
const {validate} = require('../../common/validate');
const redis = require('../../common/redis');
const logger = require('../../common/logger');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
});

// joi 中间件使用demo1
exports.joi = {
    path: '/joi',
    method: 'get|post', //大小写都支持
    type:'json',
    //schema:schema,
    handler: async (ctx) => {
        console.log(123);
        ctx.json({name:"zhangshan",age:26})
        //ctx.json({name: 'ifeng', age: '666'});
    }
};

// joi 中间件使用demo2, 可参考validate来自定义验证中间件
exports.joi_customize = {
    path: '/joi/customize',
    method: 'get|post',
    middleware: validate(schema ,'json'),
    handler: async (ctx) => {
        ctx.json({name: 'join customize'});
    }
};