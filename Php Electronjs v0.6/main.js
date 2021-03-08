process.env ['ELECTRON_DISABLE_SECURITY_WARNINGS']='true';
const { app, BrowserWindow } = require('electron')
const { join, normalize } = require('path');
let win

function createWindow () {
  win = new BrowserWindow({ width: 1000, height: 700, icon: join(__dirname, 'icon/icon.ico'), webPreferences: {webviewTag: true,nodeIntegration: true, contextIsolation: false}})
  win.setMenu(null)
  win.loadFile('index.html')
  win.on('closed', () => {
    win = null;
	app.quit();
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'windows') {
	  const exec = require('child_process').exec;
        exec('taskkill /F /IM php.exe', (e, stdout, stderr)=> {
        if (e instanceof Error) {
        console.error(e);
        throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
        });
    app.quit();
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})