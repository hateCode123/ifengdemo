exports.match = (type, cache, edit, ctrlPath, handler) => {
    return async(ctx, next) => {
        ctx.urlinfo = { type, cache, edit, ctrlPath };

        return await handler(ctx, next);
    };
};
