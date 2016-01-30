mainModule.controller('defaultController', function($scope, $routeParams, defaultFactory) {

	var getAllUsers = function(){
		console.log("Controller - getAllUsers");
		defaultFactory.getAllUsers(function(users){
			console.log("Back to controller, done with factory by a callback function");
			console.log(users);
			$scope.users = users;
		});
	}

	getAllUsers();

	$scope.test = 'abc';
});
