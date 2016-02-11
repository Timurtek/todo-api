var express = require('express');
var bodyParser = require('body-parser');
var _=require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var profiles = [];
var todoNextId = 1;
var profileNextId = 1;

app.use(bodyParser.json());

app.get('/',function(req,res){
  res.send('Todo API Root');

});

//GET /todos?completed=true
app.get('/todos',function(req,res){
  var queryParams = req.query;
  var filteredTodos = todos;
  if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
    filteredTodos = _.where(filteredTodos,{completed:true});
  }else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
    filteredTodos = _.where(filteredTodos,{completed:false});
  }

  if(queryParams.hasOwnProperty('q') && queryParams.q.length > 1){
    filteredTodos = _.filter(filteredTodos, function(todo){
      return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
    });
  }

  res.json(filteredTodos);
});

//GET /todos/:id
app.get('/todos/:id',function(req,res){
  //req parameters are always string
  //you have to turn them into number you want to use it as a number
  var todoId = parseInt(req.params.id,10);
  var matchedTodo = _.findWhere(todos,{id:todoId});

  if(matchedTodo){
    res.json(matchedTodo);
  }else{
    res.status(404).send('Not Found');
  }
});

//DELETE /todos/:id
app.delete('/todos/:id',function(req,res){
  var todoId = parseInt(req.params.id,10);
  var matchedTodo = _.findWhere(todos,{id:todoId});

  if(matchedTodo){
    //removes the matched array item from the array list
    //then adds the array list back to todos var
    todos = _.without(todos, matchedTodo);
    res.json(matchedTodo);
  }else{
    res.status(404).send('Not Found');
  }
});
// POST new todo item
app.post('/todos', function (req, res) {
  var body = _.pick(req.body,'description','completed');

  if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
    return res.status(400).send('Something went wrong');
  }

  //set body.description to be trimmed.
    body.description = body.description.trim();
    body.id = todoNextId++;
    //add id field
    todos.push(body);

    //push body into array
    console.log(todos);
    console.log('_____________');
    console.log(body);

    res.json(body);
});

//PUT /todos/:id
app.put('/todos/:id',function(req,res){
  var todoId = parseInt(req.params.id,10);
  var matchedTodo = _.findWhere(todos,{id:todoId});
  var body = _.pick(req.body,'description','completed');
  var validAttr = {};

  if (!matchedTodo) {
    return res.status(404).send('Coundt find the todo item');
  }
  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validAttr.completed = body.completed;
  }else if(body.hasOwnProperty('completed')){
      return res.status(404).send();
  }
  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
    validAttr.description = body.description;
  }else if(body.hasOwnProperty('description')){
      return res.status(404).send();
  }
  _.extend(matchedTodo, validAttr);
  res.json(matchedTodo);
});


//listens for server
app.listen(PORT,function(){
  console.log('Server started');
});
