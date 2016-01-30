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
	    origin: "seattle, wa, usa",
	    destination: "portland, or, usa",
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
		var addComps = [];

		for(var i = 0; i < latLongs.length; i += 20) {
			var pointLat = latLongs[i].lat();
			var pointLng = latLongs[i].lng();
			var cityString = "";

			$http({
			  method: 'GET',
			  url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pointLat + "," + pointLng + "&key=AIzaSyDdevJaZwheD-E6s1g0r-66f147zHLvYp4"
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously when the response is available

					console.log(response.data);

					// addComps = response.data.results[0].address_components;
					// for (var j = 0; j < addComps.length; j++) {
					// 	if(addComps[j].types.indexOf("locality") != -1) {
					// 		cityString += addComps[j].long_name;
					// 	}
					// 	if(addComps[j].types.indexOf("administrative_area_level_1") != -1) {
					// 		cityString += ", " + addComps[j].short_name;
					// 	}
					// }

			  }, function errorCallback(response) {
					console.log("failed to get cities");
			  });
		}
		console.log(cities);
	}
});
