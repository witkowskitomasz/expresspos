const { app, BrowserWindow } = require('electron')
const path = require('path')
const { Groups, Ingredients } = require('./src/db')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    })

  win.loadFile('./views/config_ingredients.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})