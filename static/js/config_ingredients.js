const groupList = document.querySelector('#group-list')
const addBtn = document.querySelector('#add-btn')
const groupInput = document.querySelector('#group')

const groupNavBtn = document.querySelector('.groups-nav')
const ingredientsNavBtn = document.querySelector('.ingredients-nav')
const groupWindow = document.querySelector('.groups')
const ingredientsWindow = document.querySelector('.ingredients')

const showGroupWindow = () => {
    if (!groupNavBtn.classList.contains('selected-btn') && !groupNavBtn.classList.contains('unselected-btn')) {
        groupNavBtn.classList.add('selected-btn')
        ingredientsNavBtn.classList.add('unselected-btn')
        groupWindow.classList.add('show')
    } else if (groupNavBtn.classList.contains('unselected-btn')) {
        groupNavBtn.classList.remove('unselected-btn')
        groupNavBtn.classList.add('selected-btn')
        groupWindow.classList.add('show')
        ingredientsNavBtn.classList.remove('selected-btn')
        ingredientsNavBtn.classList.add('unselected-btn')
        ingredientsWindow.classList.remove('show')
    }
}

const showIngredientsWindow = () => {
    if (!ingredientsNavBtn.classList.contains('selected-btn') && !ingredientsNavBtn.classList.contains('unselected-btn')) {
        ingredientsNavBtn.classList.add('selected-btn')
        groupNavBtn.classList.add('unselected-btn')
        ingredientsWindow.classList.add('show')
    } else if (ingredientsNavBtn.classList.contains('unselected-btn')) {
        ingredientsNavBtn.classList.remove('unselected-btn')
        ingredientsNavBtn.classList.add('selected-btn')
        ingredientsWindow.classList.add('show')
        groupNavBtn.classList.remove('selected-btn')
        groupNavBtn.classList.add('unselected-btn')
        groupWindow.classList.remove('show')
    }
}

//Group ops
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
//End

groupNavBtn.addEventListener('click', () => showGroupWindow())
ingredientsNavBtn.addEventListener('click', () => showIngredientsWindow())

document.addEventListener('DOMContentLoaded', createGroupList())
groupList.addEventListener('click', (e) => removeGroup(e))
addBtn.addEventListener('click', () => addGroup())
groupInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addGroup()
    }
})