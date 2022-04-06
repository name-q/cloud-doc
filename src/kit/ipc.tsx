const ipcRenderer = window.require('electron').ipcRenderer;


// 发送异步消息
export const asyncSend = (key: string) => {
    ipcRenderer.send(key);
}

// 监听异步返回
export const getAsyncSend = async (key: string) => {
    let res: any = 'error'
    try {
        let promise = new Promise((res) => {
            ipcRenderer.on(key, function (event, arg) {
                res(arg)
            });
        })
        res = await promise
    } catch (error) {
        console.log(error, '<<<< get async send error')
    }
    return res
}

// 发送同步消息并返回 返回值
export const syncSend = (key: string, value: any) => (ipcRenderer.sendSync(key, value))