module.exports = function(app) {
	var users = require('../controllers/users.js');

	app.get('/getAllUsers', function(request, response){
		console.log("Server - recieved GET request for /getAllUsers");
		users.getAllUsers(request, response);
	})
};