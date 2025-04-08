const {app, shell, BrowserWindow, Menu} = require('electron');

let win;
let willQuitApp = false;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    backgroundColor: '#5ab5f0',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    show: false,
  });

  win.once('ready-to-show', () => {
    setTimeout(() => {
      win.show();
      win.focus();
    }, 200);
  });

  win.loadURL(`file://${__dirname}/dist/index.html`);
  // win.loadURL(`http://localhost:4202`);
  // win.webContents.openDevTools();

  win.webContents.on('new-window', function (event, url) {
    event.preventDefault();
    console.log('open url ', url);
    shell.openExternal(url);
  });

  win.on('close', function (event) {
    if (willQuitApp) {
      win = null;
    } else {
      event.preventDefault();
      win.hide();
    }
  });

  const template = [
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'}
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            require('electron').shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    });

    // Edit menu
    template[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    )

    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.on('before-quit', function () {
  willQuitApp = true;
});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (win === null) {
    createWindow();
  } else {
    win.show();
  }
});
