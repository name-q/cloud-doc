module.exports = (options, app) => {
    return async function whoami(ctx, next) {
        try {
            await ctx.service.qwt.parseQWT(options.api, ctx.header.qwt)
            await next()
        } catch {
            ctx.status = 404
            return
        }
    }
}