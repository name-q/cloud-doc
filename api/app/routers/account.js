/* 账号相关路由 */
'use strict';
module.exports = (app) => {
    const { router, controller } = app;
    const { get, post, put } = router
    const { account } = controller


    // 获取验证码
    get('/api/getVerificationCode', account.getVerificationCode)

    // 注册账号
    post('/api/registerAnAccount', account.registerAnAccount)

    // 登入账号
    post('/api/loginAccount', account.loginAccount)

    // 退出账号
    get('/api/quitAccount', account.quitAccount)

    // 修改密码
    put('/api/changePassword', account.changePassword)
}