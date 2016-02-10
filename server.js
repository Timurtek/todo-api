var express = require('express');
var bodyParser = require('body-parser');
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

//GET /todos
app.get('/todos',function(req,res){
  res.json(todos);
});
//GET /todos/:id
app.get('/todos/:id',function(req,res){
  //req parameters are always string
  //you have to turn them into number you want to use it as a number
  var todoId = parseInt(req.params.id,10);
  var matchedTodo;
  //loop through todos array
  todos.forEach(function(todo){
    if(todoId === todo.id){
      matchedTodo = todo;
    }
  });
    if(matchedTodo){
      res.json(matchedTodo);
    }else{
      res.status(404).send('Not Found');
    }
});
// POST new todo item
app.post('/todos', function (req, res) {
  var body = req.body;
  body.id = todoNextId++;
  //add id field
  todos.push(body);

  //push body into array
  console.log(todos);
  console.log('_____________');
  console.log(body);

  res.json(body)
});

//GET /profiles
app.get('/profiles',function(req,res){
  res.json(profiles);
});

//GET /profiles/:id
app.get('/profiles/:id',function(req,res){
  var profileId= parseInt(req.params.id,10);
  var profileMatched;
  profiles.forEach(function(profile){
    if (profileId === profile.id) {
      profileMatched = profile;
    }
  });
  if (profileMatched) {
    res.json(profileMatched);
  }else{
    res.status(404).send('Couldnt find the profile');
  }
});

//POST /profiles/:id
app.post('/profiles/',function(req,res){
  var body = req.body;
  body.id = profileNextId++;
  profiles.push(body);
  console.log(body);
  res.json(body);
});

//listens for server
app.listen(PORT,function(){
  console.log('Server started');
});
