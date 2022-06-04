const express = require('express')
const fetch = require('node-fetch');
const app = express()
const port = 3000

// get all todos except usrId 
// api "http://localhost:3000/todos"
app.get("/todos", async (req, res) => {
  const todosUrl=`https://jsonplaceholder.typicode.com/todos`
  fetch(todosUrl)
  .then(res=>res.json())
  .then(data=>{
    const todos = data.map((todo) => {
        delete todo.userId;
        return todo;
      });
      console.log(todos)
    res.send(todos)
  })
});


// get specific user data by id with all todos of that user 
// api "http://localhost:3000/user/<pass your user id here>"

app.get('/user/:id', async(req, res)=>{
    const id = req.params.id;
    const userUrl = `https://jsonplaceholder.typicode.com/users/${id}`
    fetch(userUrl)
    .then(res=>res.json()) 
    .then(data=> {
      const user =data; 
      const todoUrl = `https://jsonplaceholder.typicode.com/todos`;
      fetch(todoUrl)
      .then(res=>res.json()) 
      .then(data=> {
      const allTodo = data;
      const todos = allTodo.filter(todo=>todo.userId === user.id)
      const userInfo={...user, todos}
      console.log(userInfo)
      res.send(userInfo)
    })
  })
})

app.get('/', (req, res) => {
  res.send('Hello Todos!')
})

app.listen(port, () => {
  console.log(`Todos app listening on port ${port}`)
})