// var person = {
// 	name: 'Yi',
// 	age: 21
// }

// function updatePerson(obj) {
// 	// obj = {						// this doesn't update the original object because you assigned the new values to an variable
// 	// 	name: 'Yi',
// 	// 	age: 30
// 	// }
// 	obj.age = 30 // this actually mutates the object because you called something on the original
// }

// updatePerson(person);
// console.log(person);


// Array example

var anArray = [1, 2, 3, 4]

function updateArray(array) {
  array.push(55)
  debugger;				// this is a special keyword that tells node where to stop the program
}									// to start debugging, type 

updateArray(anArray)
console.log(anArray)