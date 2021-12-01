const { app, BrowserWindow } = require('electron')

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // 12版本后中不能直接require(electron).remote
  // npm i -D @electron/remote
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents)
  // isDev 判断是开发模式还是产品模式，开发模式读取本地服务器，非开发模式读取 React 生成文件的 index.html 文件。
  mainWindow.loadURL(isDev ? 'http://localhost:1234' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
};

app.whenReady().then(() => {
  createWindow();
});
