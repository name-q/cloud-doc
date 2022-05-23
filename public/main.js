const { app, BrowserWindow, ipcMain } = require('electron')
// 去除安全警告 react-router-dom 会被安全meta限制
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 750,
    frame: false,
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      // session
      webSecurity: false,
      allowRunningInsecureContent: true,
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
  //   event.reply('asynchronous-message', 'pong');
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

  // 改变窗口大小
  ipcMain.on('changeWindowsSize', (event, arg = '350,750') => {
    let [w, h] = arg.split(',')
    mainWindow.setSize(parseInt(w), parseInt(h))
    event.reply('changeWindowsSize', `changeWindowsSize ${w} X ${h} OK!`)
  })

  // 窗口最小化
  ipcMain.on('minimize', (event, arg) => {
    mainWindow.minimize()
    event.reply('minimize', 'minimize OK!')
  })
}
