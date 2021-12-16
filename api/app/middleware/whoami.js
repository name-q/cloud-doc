module.exports = yscene => {
    return async function whoami(ctx, next) {
        try {
            if (!ctx.service.qwt.parseQWT(yscene, ctx.header.qwt)) {
                throw 'QWT无效'
            }
            await next()
        } catch {
            ctx.status = 404
            return
        }
    }
}