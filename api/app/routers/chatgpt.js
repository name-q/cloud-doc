/* 账号相关路由 */
'use strict';
module.exports = (app, whoami) => {
    const { router, controller } = app;
    const { get, post, put } = router
    const { chatgpt } = controller

    // 需登入后才可调用的API
    const tokencheck = whoami({ api: 'user-login-ok' })

    // 创建新的ChatGPT提问
    post('/api/chatgpt/question', tokencheck, chatgpt.post.question)
    // 继续旧的对话
    post('/api/chatgpt/linkchat', tokencheck, chatgpt.post.linkChat)

    // 获取聊天列表
    get('/api/chatgpt/chatlist', tokencheck, chatgpt.get.chatList)
    // 获取对话详情
    get('/api/chatgpt/dialogueDetails', tokencheck, chatgpt.get.dialogueDetails)

}