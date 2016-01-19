var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json()); // anytime a JSON request comes in express is going to parse it and we'll be able to access it via req.body

// GET /todos
app.get('/todos', function(req, res) {
	//need to convert object to JSON first
	res.json(todos); // this is another way here to convert the array or objecgt into JSON and send it back to whoever called the API
})

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);  //converts the params.id string to number
	var matchedTodo = _.findWhere(todos, {id: todoId});
	
	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}

	// res.send('Asking for todo with id of ' + req.params.id)
})

// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');  // use _.pick to only pic description and completed

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();   // 400 means bad request, can't be completed
	}
	
	// set body.description to be trimmed value
  body.description = body.description.trim();
	// add id field	
	body.id = todoNextId++    // it will start with one and then increment everytime a new post is made
	// push body into array
	todos.push(body);
	// console.log('description: ' + body.description);

	res.json(body);  // pass the body back to the user

});

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
})