var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet sister for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
}, {
	id: 3,
	description: 'clean my room',
	completed: true
}]

app.get('/', function(req, res) {
	res.send('Todo API Root');
})

// GET /todos
app.get('/todos', function(req, res) {
	//need to convert object to JSON first
	res.json(todos); // this is another way here to convert the array or objecgt into JSON and send it back to whoever called the API
})

// GET /todos/:id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10); //converts the params.id string to number
	var matchedTodo;
	// Iterate of todos array, Find the match.
	// return res.status(404).send() if no match found.
	todos.forEach(function(todo) {
		if (todo.id === todoId) {
			matchedTodo = todo;
		};
	})

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}

	// res.send('Asking for todo with id of ' + req.params.id)
})

app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
})