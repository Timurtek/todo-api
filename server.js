var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
  id:1,
  description: 'Get shit done',
  completed : false
},{
  id:2,
  description: 'Go to market',
  completed : false
},{
  id:3,
  description: 'get pencil',
  completed : true
}];

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


app.listen(PORT,function(){
  console.log('Server started');
});
