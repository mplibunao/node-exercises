/*
var http = require("http");

var port = 8081;
http.createServer(requestListener).listen(port);
console.log("Server is listening on", port);

// Callback
function requestListener(req, res){
	//API Abstraction for setting the content type of the response to be sent along with the status codeno
	res.writeHead(200, {'Content-Type': 'text/plain'});
	console.log("Request recieved, responding now ...");
	res.end("Hello");
}
*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// lodash is a library for data/form validation. Cool
const _ = require('lodash');
const config = require('config');

// loads globally the middleware function. Always 1st middleware to execute
// Order is important; If moved below, the http method, then it doesn't reach those requests
app.use(bodyParser.json());

app.listen(config.port);

var taskList = [];

app.get('/list', (req, res) => {
	res.send(taskList);
});

/*
app.post('/task', (req, res) => {
	// Validates if task received in the body message is empty
	if (_.isEmpty(task)){
		return res.status(422).send("Task is empty");
	}
	taskList.push(req.body.task);
	res.send(taskList);
});
*/

/*
DRY and write the validation functionality in a middleware
Link the middleware to the callback handler
Next moves the execution to the next middleware callback /The eventloop fetches
the next callback from the event queeue to the execution stack
*/
var validationMiddleware = (req, res, next) => {
	if (_.isEmpty(req.body.task)){
		return res.status(442).send("Task is empty");
	}
	return next();
};

/* So you put the middleware and the callback inside an array so when you call
next() it goes to the next middleware/callback in the array?? */
app.post('/task', [validationMiddleware, (req, res) => {
	taskList.push(req.body.task);
	res.send(taskList);
}]);

app.put('/task/:taskIndex', [validationMiddleware, (req, res) => {
	taskList[req.params.taskIndex] = req.body.task;
	res.send(taskList);
}]);


app.delete('/task/:taskIndex', (req, res)=>{
	let taskIndex = req.params.taskIndex;
	taskList.splice(taskIndex, 1);
	res.send(taskList);
});

/*
app.use(requestListener).listen(port);
console.log("Server is listening on", port);

function requestListener(req, res){
	console.log("responding now...");
	res.send("Hello");
}
*/
