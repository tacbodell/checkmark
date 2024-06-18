// selectors
const selectTodoButton = document.querySelectorAll('.selectTodo')
const todoAreaImage = document.getElementById('todoImage')
const todoAreaTitle = document.getElementById('todoTitle')
const todoAreaDescription = document.getElementById('todoDescription')
const todoAreaDueDate = document.getElementById('todoDueDate')
const todoCompleteButton = document.getElementById('todoCompleteButton')
const todoIncompleteButton = document.getElementById('todoIncompleteButton')
const todoDeleteButton = document.getElementById('todoDeleteButton')

// event listeners
todoCompleteButton.addEventListener('click', markComplete)
todoIncompleteButton.addEventListener('click', markIncomplete)
todoDeleteButton.addEventListener('click', deleteTask)

Array.from(selectTodoButton).forEach((el)=>{
    el.addEventListener('click', selectTodo)
})

//update styling of page
Array.from(selectTodoButton).forEach(el => {
    if (el.dataset.completed === "true") {
        el.classList.add("line-through")
        el.classList.add("text-slate-500")
    }
})

// updates task info area upon task selection
function selectTodo(){
    todoAreaTitle.dataset.taskid = this.dataset.id

    todoAreaImage.src = this.dataset.imageurl
    todoAreaTitle.innerText = this.dataset.title
    todoAreaDescription.innerText = this.dataset.description
    todoAreaDueDate.innerText = this.dataset.duedate === "null" ? "No due date" : new Date(this.dataset.duedate).toLocaleString()

    todoDeleteButton.style.display = "inline-block"
    if (this.dataset.completed === "true") {
        todoCompleteButton.style.display = "none"
        todoIncompleteButton.style.display = "inline-block"
    } else {
        todoCompleteButton.style.display = "inline-block"
        todoIncompleteButton.style.display = "none"
    }
}

// deletes the selected task
async function deleteTask(){
    const taskId = todoAreaTitle.dataset.taskid
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'taskId': taskId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// marks the selected task as complete
async function markComplete(){
    const taskId = todoAreaTitle.dataset.taskid
    
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'taskId': taskId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// marks the selected task as incomplete
async function markIncomplete(){
    const taskId = todoAreaTitle.dataset.taskid
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'taskId': taskId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}