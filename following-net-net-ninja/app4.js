var express = require('express');
var bodyParser = require('body-parser');

// Fire the express function you imported to have access to all the express methods
var app = express();

// Middleware that parses POST data
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine', 'ejs');
// Middleware; Any request made to /assets is gonna map to assets folder
app.use('/assets', express.static('assets'));


// Express Routing
// app.post and app.delete also available
app.get('/', function(req, res){
  //res.sendFile(__dirname + '/routing/index.html');
  res.render('index');
});

app.get('/contact', function(req, res){
  //res.sendFile(__dirname + '/routing/contact.html');
  res.render('contact', {qs: req.query});
});

// Post gets urlencoded bodies
app.post('/contact', urlencodedParser ,function(req, res){
  console.log(req.body);
  res.render('contact-success', {data: req.body});
});

app.get('/profile/:name', function(req, res){
  var data = {age: 24, job: 'ninja', hobbies: ['eating', 'sleeping' , 'coding']};
  res.render('profile', {person: req.params.name, data: data});
});

var port = 3000;
app.listen(port);
