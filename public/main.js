const { app, BrowserWindow, ipcMain } = require('electron')
// 去除安全警告 react-router-dom 会被安全meta限制
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 700,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  // isDev 判断是开发模式还是产品模式
  mainWindow.loadURL(isDev ? 'http://localhost:1234' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
  // 挂载IPC监听
  mountMainIPC()
};

app.whenReady().then(() => {
  createWindow();
});

// 所有IPC方法
const mountMainIPC = () => {

  /* 异步通讯 需监听返回值 */
  // ipcMain.on('asynchronous-message', function(event, arg) {
  //   console.log(arg)
  //   event.sender.send('asynchronous-reply', 'pong');
  // });

  /* 同步通讯 即得返回值 */
  // ipcMain.on('synchronous-message', function(event, arg) {
  //   console.log(arg)
  //   event.returnValue = 'pong';
  // });

  // 退出程序
  ipcMain.on('exit', () => {
    app.exit()
  });

}
