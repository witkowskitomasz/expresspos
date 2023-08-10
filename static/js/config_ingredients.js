const groupList = document.querySelector('#group-list')
const addBtn = document.querySelector('#add-btn')
const groupInput = document.querySelector('#group')

const createGroupListElement = (name) => {
    const li = document.createElement('li')
    const div = document.createElement('div')
    div.classList.add('li')
    const p = document.createElement('p')
    const button = document.createElement('button')

    p.textContent = name
    button.innerText = 'Usuń'

    div.append(p)
    div.append(button)
    li.append(div)
    groupList.append(li)
}

const createGroupList = async () => {
    const mainWindow = await myAPI.groupList()
    mainWindow.forEach(element => {
        createGroupListElement(element)
    })
}

const removeGroup = (e) => {
    if (e.target.tagName === 'BUTTON') {
    myAPI.removeGroup(e.target.previousSibling.textContent)
    e.target.parentNode.remove()
    }
}

const addGroup = () => {
    myAPI.addGroup(groupInput.value)  
    groupInput.value = ''
    groupList.innerHTML = ''
    setTimeout(() => {
        createGroupList()
    }, 200)
}

document.addEventListener('DOMContentLoaded', createGroupList())
groupList.addEventListener('click', (e) => removeGroup(e))
addBtn.addEventListener('click', () => addGroup())
groupInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addGroup()
    }
})