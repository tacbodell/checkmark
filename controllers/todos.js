const Todo = require('../models/Todo')

module.exports = {
    // fetches todo page for user
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false})

            // sort items by due date
            todoItems.sort((a,b) => a.dueDate.getTime() - b.dueDate.getTime())
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    // creates a new todo document in database
    createTodo: async (req, res)=>{
        try{
            await Todo.create({title: req.body.title, description: req.body.description, dueDate: req.body.dueDate, imageUrl: req.body.imageUrl, completed: false, deleted: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    // sets the completed flag on one item to true
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.taskId},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    // sets the completed flag on one item to false
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.taskId},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    // sets the deleted flag on one item to deleted
    deleteTodo: async (req, res)=>{
        console.log(req.body.taskId)
        try{
            await Todo.findOneAndDelete({_id:req.body.taskId})
            console.log('Deleted Todo')
            res.json('Deleted Todo')
        }catch(err){
            console.log(err)
        }
    }
}    