const Joi = require('joi');

/**
 * joi参数验证
 * @param {Object} schemas
 * @param {String} type 类型
 * @return {Funciton}
 */
exports.validate = (schemas, type) => {
    return async function (ctx, next) {
        if (schemas) {
            let ret = Joi.validate(Object.assign({}, ctx.query, ctx.params, ctx.request.body), schemas, {
                allowUnknown: true,
            });
            if (ret.error) {
                switch (type) {
                    case 'html':
                        ctx.body = `<!DOCTYPE html>
                                        <html>
                                            <head></head>
                                            <body>
                                                <p>params validate occurs Error:</p>
                                                <p>${JSON.stringify(ret.error.details)}</p>
                                            </body>
                                        </html>`;
                    default:
                        ctx.json(1, 'params validate occurs Error', ret.error.details);
                }
                return;
            }
        }
        return next();
    };
};