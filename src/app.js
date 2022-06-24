
const addTodo = document.querySelector('.btn_add_todo')
const delTodo = document.querySelector('.btn_del_todo')
const input = document.querySelector('.todo_input')
const todoList = document.querySelector('.todo_list')
let todos = JSON.parse(localStorage.getItem('todos')) || []


addTodo.addEventListener('click', ()=> { 
    addNewTodo(input.value)
})

input.addEventListener('keypress', (e)=> {
    if (!input.value) return;
    if(e.keyCode === 13){
        addNewTodo(input.value)
    }
})

let addNewTodo = (msg) =>{
    let todo = creatTodo(msg)
    todoList.appendChild(todo)
    updateTodos()
    input.value = ''
    input.focus()
}

let removeTodo = (todo) => {
    btn = todo.target
    btn.parentElement.remove()
    updateTodos()
}

let creatTodo = (msg) => {
    let todo = document.createElement('div')
    let del = creatDelBtn()
    todo.classList.add('todo')
    todo.innerText = msg
    todo.appendChild(del)
    return todo
}

let creatDelBtn = () => {
    let btn = document.createElement('button')
    btn.classList.add('btn','btn_del_todo')
    btn.addEventListener('click', removeTodo)
    btn.innerText = 'X'
    return btn
}

let updateTodos = () => {
    let toJSON = []
    let updatedTodos = document.querySelectorAll('.todo')
    updatedTodos.forEach(e => {
        msg = e.innerText.replace('\nX', '')
        toJSON.push(msg)
    })
    let todoJSON = JSON.stringify(toJSON)
    localStorage.setItem('todos', todoJSON)
}

let genTodos = () => {
    for(todo of todos) {
        addNewTodo(todo)
    }
}

genTodos()