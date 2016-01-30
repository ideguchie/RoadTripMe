mainModule.controller('defaultController', function($scope, $routeParams, defaultFactory, $http) {

	var getAllUsers = function(){
		// console.log("Controller - getAllUsers");
		defaultFactory.getAllUsers(function(users){
			// console.log("Back to controller, done with factory by a callback function");
			// console.log(users);
			$scope.users = users;
		});
	}

	getAllUsers();

	$scope.test = 'abc';

	var getRoute = function(directionsService, directionsDisplay) {
		console.log("Controller - getRoute");

	  var directionsService = new google.maps.DirectionsService;
	  var directionsDisplay = new google.maps.DirectionsRenderer;

	  directionsService.route({
	    origin: "seattle, wa",
	    destination: "portland, or",
	    travelMode: google.maps.TravelMode.DRIVING
	  }, function(response, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
				console.log(response.routes[0].overview_path);
				getCities(response.routes[0].overview_path);
	    } else {
	      window.alert('Directions request failed due to ' + status);
	    }
	  });
	}
	getRoute();

	var getCities = function(latLongs) {
		console.log("Controller - getCities");
		var cities = [];
		console.log(latLongs[0].lat());
		console.log(latLongs[0].lng());
		for(var i = 0; i < latLongs.length; i++) {
			console.log(latLongs[i].lat());
			console.log(latLongs[i].lng());
			var pointLat = latLongs[i].lat();
			var pointLng = latLongs[i].lng();
			$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pointLat + "," + pointLng + "&key=AIzaSyDdevJaZwheD-E6s1g0r-66f147zHLvYp4")
				.success(function(return_data){
				cities.push(return_data);
			});
		}
		console.log(cities);
	}
});
