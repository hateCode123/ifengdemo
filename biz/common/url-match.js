exports.match = (type, cache, edit, handler) => {
    return async function (ctx, next) {
        ctx.urlinfo = {type, cache, edit};
        return await handler(ctx, next);
    };
};