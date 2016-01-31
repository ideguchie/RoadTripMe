mainModule.controller('defaultController', function($scope, $routeParams, defaultFactory, $http, $q) {
	var title = "";
	var image = "";
	var price = "";
	var detail = "";
	var weather = "";
	var wDescript = "";
	var id = "";
	var lat = "";
	var lon = "";
	var activity = [];
	$scope.result = [];

	var getAllUsers = function(){
		// console.log("Controller - getAllUsers");
		defaultFactory.getAllUsers(function(users){
			// console.log("Back to controller, done with factory by a callback function");
			// console.log(users);
			$scope.users = users;
		});
	}

	var getTrip = function() {

		defaultFactory.getActivity()
			.then(function(response) {
				// console.log(response);

				for (var i = 0; i < 10; i++) {
					var obj = {};
					activity = response.data.activities[i];
					// id = returned_data_from_server.activities[0].id;
					// console.log(id);

					obj.id = activity.id;
					obj.title = activity.title;
					obj.image = activity.imageUrl;
					obj.price = activity.fromPrice;
					obj.detail = '';

					$scope.result.push(obj);
				}

				// Define the initial promise
				var sequence = $q.defer();
				sequence.resolve();
				sequence = sequence.promise;

				angular.forEach($scope.result, function(val,key){
				    sequence = sequence.then(function() {
				        return getTripDetails(val);
				    });
				});

				console.log($scope.result);
			});
	}

	var getTripDetails = function(val) {
		// console.log("trip details", id);
		defaultFactory.getActivityDetails(val.id)
			.then(function(response_activity) {
				var index = $scope.result.indexOf(val);
				$scope.result[index].detail = response_activity.data.metaDescription;
				$scope.result[index].latlng = response_activity.data.latLng.split(",");
				// console.log($scope.result[index].latlng);
				getWeather($scope.result[index]);
			});
	}

	var getWeather = function(val) {
		// console.log(val);
		var input = {}
		input.lon = val.latlng[1];
		input.lat = val.latlng[0];

		defaultFactory.getWeather(input)
		.then(function (response_weather) {
			var index = $scope.result.indexOf(val);
			// console.log(response_weather);
			$scope.result[index].weather = response_weather.data.weather[0].main;
			$scope.result[index].wDescript = response_weather.data.weather[0].description;
		});
	}

	getTrip();

	// getAllUsers();

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
				// console.log(response.routes[0].overview_path);
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
			$http({
			  method: 'GET',
			  url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pointLat + "," + pointLng + "&key=AIzaSyDdevJaZwheD-E6s1g0r-66f147zHLvYp4"
			}).then(function successCallback(response) {
			    // this callback will be called asynchronously when the response is available
					// console.log(response.data.results[0].address_components);
					addComps = response.data.results[0].address_components;
					var cityString = "";
					var hasBoth = false;
					for (var j = 0; j < addComps.length; j++) {
						if(addComps[j].types.indexOf("locality") !== -1) {
							cityString += addComps[j].long_name;
							hasBoth = true;
						}
						if(addComps[j].types.indexOf("administrative_area_level_1") !== -1) {
							cityString += ", " + addComps[j].short_name;
						}
					}
					if (hasBoth) {
						// console.log(cityString);
						cities.push(cityString);
					}
			  }, function errorCallback(response) {
					console.log("failed to get cities");
			  });
				console.log(cities);
		}

	}
});
