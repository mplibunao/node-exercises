var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use('/', express.static('public'));

todoController(app);

var port = 3000;
app.listen(port);
console.log('listening to port '+ port);
