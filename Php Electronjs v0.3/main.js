const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem
let win

function createWindow () {
  win = new BrowserWindow({ width: 1000, height: 700, icon: __dirname + '/icon.ico'})
  win.setMenu(null)
 win.loadFile('index.html')
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
if (process.platform !== 'windows') {
//var myBatFilePath = "stop.bat";
//const spawn = require('child_process').spawn;
//const bat = spawn('cmd.exe', ['/c', myBatFilePath]);
const exec = require('child_process').exec;
        exec('taskkill /F /IM php.exe', (e, stdout, stderr)=> {
        if (e instanceof Error) {
        console.error(e);
        throw e;
        }
        console.log('stdout ', stdout);
        console.log('stderr ', stderr);
        });
app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})