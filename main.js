
let btn = document.querySelector('#addBtn')
let user = document.querySelector('#userName')
let list = document.querySelector('#list')
let html = document.querySelector('html')
let modal   
let changeNameBTN = document.querySelector('#changeName')
let logoutBtn = document.querySelector('#logout')

//  Name Changer and actions with Local storage
changeNameBTN.addEventListener('click', changeName)
logoutBtn.addEventListener('click', clearLocalStor)



function changeName(){
    let newName = prompt('Введите имя')
    if(newName){
    user.innerHTML = `Hello, ${newName}`
    localStorage.setItem('name', newName)
    } else {
        alert("You don't write name")
    }

}

function localStor(){
    let userName = localStorage.getItem('name')
    if(userName){
        user.innerHTML = `Hello, ${userName}`
    } else {
        user.innerHTML = "Hello, <span id='nameInput'>write your name</span>"
    }
}

localStor() // Check for name in local storage

function clearLocalStor(){
    localStorage.clear()
    localStor()
}


// Creating and removing TODO items
btn.addEventListener('click', openModalCreaterTODO)

function openModalCreaterTODO(){
    modal = document.createElement('div')
    modal.classList.add('modal')
    modal.innerHTML = `
        <div class="modal__window">
            <div class="modal__window-inner">
            <span>Target: </span><input type="text" id="title" class="title"> <br>
            <span>Write you'r description: </span><input type="text" id="description" class="description">
            </div>
            <button id="createTodo" class="createBtn">Create</button>
        </div>
        <div class="modal__bg" id="modalBG"></div>
        `
    user.before(modal)
    let modalBG = document.querySelector('#modalBG')
    let createBtn = document.querySelector('#createTodo')
    modalBG.addEventListener('click', closeModal)
    createBtn.addEventListener('click', createToDo)
}



function closeModal(){
    modal.remove()
}



function createNewTODOItem(title = 'Title', description = 'Here can be your text'){
    if(list.firstChild === document.querySelector('.emptyList')){
       list.innerHTML = ''
    }
    let newItem = document.createElement('div')
    newItem.classList.add('todo__item')
    newItem.innerHTML = `
                <span class="todo__item-delete">&#10006;</span>
                <div class="todo__title">${title}</div>
                <hr>
                <div class="todo__description">${description}</div>
    `
    list.append(newItem)
    let crosses = document.querySelectorAll('.todo__item-delete')
    crosses.forEach(el => el.addEventListener('click', deleteThatListItem))
    
}




function createToDo(){
    let title = document.querySelector('#title')
    let description = document.querySelector('#description')
    let titleText = title.value !== '' ? title.value : undefined
    let descriptionText = description.value !== '' ? description.value : undefined
    createNewTODOItem(titleText, descriptionText)
    closeModal()
}




function deleteThatListItem(element){   
    element.target.removeEventListener('click', deleteThatListItem)
    element.path[1].remove()
    if(list.children.length === 0){
        list.innerHTML = '<span class="emptyList"> Here will be your targets </span>'
    }
}



createNewTODOItem("You're first target", "You need to do something")
