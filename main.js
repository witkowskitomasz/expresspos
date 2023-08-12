const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { Groups, Ingredients } = require('./src/db')
const { dir } = require('console')


function createMainWindow () {
    const startAndConfigWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'configPreload.js')
        }
    })
    startAndConfigWindow.loadFile('./views/index.html')
}

// Group ops listners
ipcMain.handle('groupList', async e =>{
    try {
        const groups = new Groups()
        const groupList = await groups.getAllGroups()
        return groupList
    } catch (error) {
        console.log(error)
        return []
    }
})

ipcMain.on ('addGroup', (e, args) => {
    const groups = new Groups()
    groups.createGroup(args)
})

ipcMain.on ('removeGroup', (e, args) => {
    const groups = new Groups()
    groups.deleteGroup(args)
})
// End

app.whenReady().then(() => {
    createMainWindow()

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