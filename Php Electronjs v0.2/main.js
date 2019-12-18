const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const remote = require('electron').remote;
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem
let win

function createWindow () {
  win = new BrowserWindow({ width: 1000, height: 700, icon: __dirname + '/icon.ico'})
 win.loadFile('index.html')
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
if (process.platform !== 'windows') {
var myBatFilePath = "stop.bat";
const spawn = require('child_process').spawn;
const bat = spawn('cmd.exe', ['/c', myBatFilePath]);
app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})