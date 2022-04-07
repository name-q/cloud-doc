module.exports = (options, app) => {
    return async function whoami(ctx, next) {
        try {
            if(!ctx.header.qwt) return ctx.status = 404
            await ctx.service.qwt.parseQWT(options.api, ctx.header.qwt)
            await next()
        } catch(error) {
            if(error==='超时失效') return ctx.LoginExpiration('登入过期')
            ctx.status = 404
            return
        }
    }
}