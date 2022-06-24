/* 账号相关路由 */
'use strict';
module.exports = (app, whoami) => {
    const { router, controller } = app;
    const { get, post, put } = router
    const { user } = controller

    // 需登入后才可调用的API
    const tokencheck = whoami({ api: 'user-login-ok' })

    // ping 校验QWT是否过期 如登入状态正常则返回QWT解密后的数据
    get('/api/getUserInfo', tokencheck, user.get.info)

    // 用户获取头像上传STS
    get('/api/getAvatarSTS', tokencheck, user.get.getAvatarSTS)

}