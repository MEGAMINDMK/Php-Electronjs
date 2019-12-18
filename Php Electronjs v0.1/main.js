const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem
let win

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600, icon: __dirname + '/icon.ico'})
  win.loadURL('http://localhost/')
 // win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('ready', function () {

  createWindow();
  const template = [
      {
      label: 'Server',
      submenu: [		
		{
      label: 'Start',
  click: () => { 
  var myBatFilePath = "start.bat";
const spawn = require('child_process').spawn;
const bat = spawn('cmd.exe', ['/c', myBatFilePath]);
        }
		},
		
		{
      label: 'Stop',
  click: () => { 
  var myBatFilePath = "stop.bat";
const spawn = require('child_process').spawn;
const bat = spawn('cmd.exe', ['/c', myBatFilePath]);
        }
		},
		
		{
      label: 'Reload',
	  role: 'reload'
		},
		
		{role: 'quit'}
		
        ]
    }
  ];
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});