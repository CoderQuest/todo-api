var Sequelize = require('Sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite', // sets what sql to use
	'storage': __dirname + '/basic-sqlite-database.sqlite'
}); // creating an instance of sequelize

var Todo = sequelize.define('todo', {
		description: {
			type: Sequelize.STRING,
			allowNull: false, // when set to false, user has to provide description
			validate: {
				len: [1, 250] // the string has to be 1 to 250 length long
			}
		},
		completed: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}) //define takes in two arguments, the model(to in this case)name, and attribute configuration

// to reset everything and drop all the table you can insert 'force:true' in the .sync(force: true)
// ex: sequelize.sync(force: true).then(function()...

sequelize.sync({
	// force: true
}).then(function() {
	console.log('Everything is synced')
	Todo.findById(3).then(function(todo) {
		if (todo) {
			console.log(todo);
		} else {
			console.log('Todo not found');
		}
	});
	// Todo.create({
	// 	description: 'Take out trash'

	// }).then(function(todo) {
	// 	return Todo.create({
	// 		description: 'clean room'
	// 	});
	// }).then(function() {
	// 	// return Todo.findById(1) 				// this will find specific todo by its ID number
	// 	return Todo.findAll({ // this will find  todos with individual attribute
	// 		where: {
	// 			description: {
	// 				$like: '%Room%'
	// 			}
	// 		}
	// 	})
	// }).then(function(todos) { // if we used findAll above, make sure to change the callback argument to plural
	// 	if (todos) { // and keep in mind this plural is an array. 
	// 		todos.forEach(function(todo) {
	// 			console.log(todo.toJSON()); // .toJSON makes the result easier to read	
	// 		})
	// 	} else {
	// 		console.log('no to do found!');
	// 	}
	// }).catch(function(e) {
	// 	console.log(e.message);
	// })
})

// sequelize is going to help us managing out data as javascript objects and arrays. and it's going to convert those to sqlite calls to the database