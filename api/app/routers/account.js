/* 账号相关路由 */
'use strict';
module.exports = (app, whoami) => {
    const { router, controller } = app;
    const { get, post, put } = router
    const { account } = controller


    // 获取验证码
    get('/api/getVerificationCode', account.getVerificationCode)

    // 注册账号
    post('/api/registerAnAccount', account.registerAnAccount)

    // 登入账号
    post('/api/loginAccount', account.loginAccount)

    // 修改密码
    put('/api/changePassword', account.changePassword)

    // 需登入后才可调用的API
    const tokencheck = whoami({ api: 'user-login-ok' })

    // 获取个人配置 及 公共配置 
    // get('/api/configs',tokencheck, account.getVerificationCode)
}