var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://test:test@ds123351.mlab.com:23351/todo');

// Mongoose promise is deprecated, set to global promise instead
mongoose.Promise = global.Promise;

// Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

// Create a model which uses the todoSchema as its structure
var Todo = mongoose.model('Todo', todoSchema);

/* Create an item of that (Todo) model type
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});
*/
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

  app.get('/todo', function(req, res){
    // Get data from mongodb and pass it to view
    // Same thing with Select *
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    // get data from view and delete it from mongodb
    Todo.find({item: req.params.item.replace(/\-/, ' ')}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });
  });
};
