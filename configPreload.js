const {ipcRenderer, contextBridge} = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    groupList: async () => {
        try {
            const answer = await ipcRenderer.invoke('groupList')
            return answer
        } catch (error) {
            console.log(error)
            return []
        }
    },
    removeGroup: (name) => {
        try {
            ipcRenderer.send('removeGroup', name)
        } catch(error) {
            console.log(error)
        }
    },
    addGroup: (name) => {
        try {
            ipcRenderer.send('addGroup', name)
        } catch(error) {
            console.log(error)
        }
    }
})


