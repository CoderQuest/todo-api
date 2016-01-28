var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json()); // anytime a JSON request comes in express is going to parse it and we'll be able to access it via req.body
app.get('/', function(req, res) {
		res.send('Todo API root.')
	})
	// GET /todos
	// GET /todos?completed = true
app.get('/todos', function(req, res) {
	var queryParams = req.query; // this is an object, the value of the key is string, never boolean
	var filteredTodos = todos;

	// if has property && completed === "false"
	// filteredTodos = _.where(filteredTodos, ?)
	// else if has property && completed if 'false'
	if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
		filteredTodos = _.where(filteredTodos, {
			completed: false
		});
	} else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
		filteredTodos = _.where(filteredTodos, {
			completed: true
		});
	}

	res.json(filteredTodos);
	//need to convert object to JSON first
	// res.json(todos); // this is another way here to convert the array or objecgt into JSON and send it back to whoever called the API
})

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10); //converts the params.id string to number
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
	// res.send('Asking for todo with id of ' + req.params.id)
})

// POST /todos
app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed'); // use _.pick to only pic description and completed

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send(); // 400 means bad request, can't be completed
	}

	// set body.description to be trimmed value
	body.description = body.description.trim();
	// add id field	
	body.id = todoNextId++ // it will start with one and then increment everytime a new post is made
		// push body into array
		todos.push(body);
	// console.log('description: ' + body.description);

	res.json(body); // pass the body back to the user

});

//DELETE /todos/:id
app.delete('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});

	if (matchedTodo) {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	} else {
		res.status(404).json({
			"error": "no todo found with that id"
		});
	};
})

// PUT -- updating /todos/:id
app.put('/todos/:id', function(req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});
	var validAttributes = {};

	if (!matchedTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	} else if (body.hasOwnProperty('completed')) {
		return res.status(400).send();
	};

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description.trim();
	} else if (body.hasOwnProperty('description')) {
		return res.status(400).send();
	};

	_.extend(matchedTodo, validAttributes); // doesn't need to declare a variable because .extend updates the *destination* object
	res.json(matchedTodo);
})

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
})