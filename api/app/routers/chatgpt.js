/* 账号相关路由 */
'use strict';
module.exports = (app, whoami) => {
    const { router, controller } = app;
    const { get, post, put } = router
    const { chatgpt } = controller

    // 需登入后才可调用的API
    const tokencheck = whoami({ api: 'user-login-ok' })

    // ping 校验QWT是否过期 如登入状态正常则返回QWT解密后的数据
    post('/api/chatgpt/question', tokencheck, chatgpt.post.question)
    // 继续旧的对话
    post('/api/chatgpt/linkchat', tokencheck, chatgpt.post.linkChat)

    // 聊天列表
    get('/api/chatgpt/chatlist', tokencheck, chatgpt.get.chatList)

}