const { app, BrowserWindow } = require('electron')
// 去除安全警告 react-router-dom 会被安全meta限制
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  // 12版本后中不能直接require(electron).remote
  // yarn add -D @electron/remote
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents)
  // isDev 判断是开发模式还是产品模式
  mainWindow.loadURL(isDev ? 'http://localhost:1234' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
};

app.whenReady().then(() => {
  createWindow();
});
