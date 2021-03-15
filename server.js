const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');

const createTodoSchema = Joi.object({
  title: Joi.string().required(),
  text: Joi.string().required()
});

const todoSchema = createTodoSchema.append({
  id: Joi.number(),
  createdAt: Joi.date(),
  modifiedAt: Joi.date()
});

let id = 0;
const todos = {
  [id]: {
    id,
    createdAt: new Date(),
    modifiedAt: new Date(),
    title: "Example TODO item",
    text: "This example item is created automatically on startup."
  }
};

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
})

app.get(['/', '/index.html'], (req, res) => {
  res.status(200).header('Content-Type', 'text/html').send(`
    <html>
      <body>
        <h1>TODO Backend Server</h1>
        <ul>
        <li><pre>GET</pre> <a href="/todos">/todos</a> : retrieves the list of TODO items</li>
        <li><pre>GET</pre> /todos/:id : retrieves a specific TODO item
        <li><pre>POST</pre> /todos : creates a new TODO item
        <li><pre>PUT</pre> /todos/:id : updates an existing TODO item with new values
        <li><pre>DELETE</pre> /todos/:id : deletes an existing TODO item
        </ul>
      </body>
    </html>
  `)
})

app.get('/todos', (req, res) => {
  res.json(Object.values(todos));
});

app.get('/todos/:id', (req, res) => {
  const todo = todos[req.params.id];
  if ( ! todo) {
    res.status(404).send();
    return;
  }

  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { value, error } = createTodoSchema.validate(req.body);
  if (error) {
    res.status(400).json(error).send();
    return;
  }
  const now = new Date();
  const todoId = ++id;
  todos[todoId] = {
    id: todoId,
    createdAt: now,
    modifiedAt: now,
    ... value
  };
  res.status(201).header('Location', `/todos/${todoId}`).send();
});

app.put('/todos/:id', (req, res) => {
  const todo = todos[req.params.id];
  if ( ! todo) {
    res.status(404).send();
    return;
  }

  const { value, error } = createTodoSchema.validate(req.body);
  if (error) {
    res.status(400).json(error).send();
    return;
  }

  todo.title = value.title;
  todo.text = value.text;
  todo.modifiedAt = new Date();

  res.status(204).send();
});

app.delete('/todos/:id', (req, res) => {
  const todo = todos[req.params.id];
  if ( ! todo) {
    res.status(404).send();
    return;
  }

  delete todos[req.params.id];

  return res.status(204).send();
});

app.listen(8080, 'localhost');