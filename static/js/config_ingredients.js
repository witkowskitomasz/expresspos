const Keyboard = window.SimpleKeyboard.default;
const keyboardContainer = document.querySelector('.simple-keyboard')

const addBtn = document.querySelector('#add-btn')
const groupInput = document.querySelector('#group')
const groupTable = document.querySelector('.group-table')

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
    const row = document.createElement('tr')
    const nameTd = document.createElement('td')
    nameTd.innerHTML = name
    const btnsTd = document.createElement('td')
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Usuń'

    btnsTd.append(deleteBtn)
    row.append(nameTd, btnsTd)
    groupTable.append(row)
}

const createGroupList = async () => {
    const mainWindow = await myAPI.groupList()
    mainWindow.forEach(element => {
        createGroupListElement(element)
    })
}

const removeGroup = (e) => {
    if (e.target.tagName === 'BUTTON') {
    myAPI.removeGroup(e.target.closest('tr').firstChild.innerHTML)
    e.target.closest('tr').remove()
    }
}

const addGroup = () => {
    myAPI.addGroup(groupInput.value)  
    groupInput.value = ''
    groupTable.innerHTML = ''
    setTimeout(() => {
        createGroupList()
    }, 200)
}
//End

groupNavBtn.addEventListener('click', () => showGroupWindow())
ingredientsNavBtn.addEventListener('click', () => showIngredientsWindow())

document.addEventListener('DOMContentLoaded', createGroupList())
groupTable.addEventListener('click', (e) => removeGroup(e))
addBtn.addEventListener('click', () => addGroup())
groupInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addGroup()
    }
})


//keyboard
let myKeyboard = null

groupInput.addEventListener('focus', () => {
    if (myKeyboard === null) {
    
        myKeyboard = new Keyboard({
            onChange: input => onChange(input),
            onKeyPress: button => onKeyPress(button)
        })
    
        function onChange(input) {
            groupInput.value = input;
            console.log("Input changed", input);
        }
    
        function onKeyPress(button) {
            if (button === '{enter}') {
                myKeyboard.destroy()
                myKeyboard = null
                addGroup()
            }
        }
    }
})

document.addEventListener('click', (e) => {
    if (!keyboardContainer.contains(e.target) && e.target !== groupInput) {
        if (myKeyboard) {
            myKeyboard.destroy();
            myKeyboard = null;
        }
    }
})
//end