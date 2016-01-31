mainModule.controller('defaultController', function($rootScope, $scope, $routeParams, defaultFactory, $http, $q) {
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
	$scope.cities = [];
	$scope.cities_promise = [];

	var getAllUsers = function(){
		// console.log("Controller - getAllUsers");
		defaultFactory.getAllUsers(function(users){
			// console.log("Back to controller, done with factory by a callback function");
			// console.log(users);
			$scope.users = users;
		});
	}

	var getTrip = function(loc) {
		console.log("Controller - getTrip");
		defaultFactory.getActivity(loc)
			.then(function(response) {
				// console.log(response);

				for (var i = 0; i < response.data.activities.length; i++) {
					if (i % 2 == 0) {
						var obj = {};
						var duplicate = false;
						activity = response.data.activities[i];

						for (var j = 0; j < $scope.result.length; j++) {
							if (activity.id == $scope.result[j].id) {
								duplicate = true;
							}
						}
						// Should we loop through $scope.result to see if id already there?

						if (!duplicate) {
							obj.id = activity.id;
							obj.title = activity.title;
							obj.image = activity.imageUrl;
							obj.price = activity.fromPrice;
							obj.detail = '';
							obj.city = loc;

							$scope.result.push(obj);
						}
					}
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
				// console.log($scope.result);
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
		// input.lon = val.latlng[1];
		// input.lat = val.latlng[0];
		// input.city = val.city;

		defaultFactory.getWeather(val.city)
		.then(function (response_weather) {
			var index = $scope.result.indexOf(val);
			// console.log(response_weather);
			$scope.result[index].weather = response_weather.data.weather[0].main;
			$scope.result[index].wDescript = response_weather.data.weather[0].description;
		});
	}

	// var newarr = ["Seattle, WA", "Olympia, WA", "Portland, OR"];

	var getRouteData = function(arr) {
		// Define the initial promise
		var sequence2 = $q.defer();
		sequence2.resolve();
		sequence2 = sequence2.promise;
		// console.log(arr);
		angular.forEach(arr, function(val,key){
				if(key % 10 == 0) {
				sequence2 = sequence2.then(function() {
						return getCities(val);
				});
			}
		});
	}

	var getRoute = function(data) {
		console.log("Controller - getRoute", data);

	  var directionsService = new google.maps.DirectionsService;
	  var directionsDisplay = new google.maps.DirectionsRenderer;

	  directionsService.route({
	    origin: "seattle, wa, usa",
	    destination: "portland, or, usa",
	    travelMode: google.maps.TravelMode.DRIVING
	  }, function(response, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
	      // directionsDisplay.setDirections(response);
				// console.log(response.routes[0].overview_path);
				getRouteData(response.routes[0].overview_path);
	    } else {
	      window.alert('Directions request failed due to ' + status);
	    }
	  });
	}

	var getCities = function(latLongs) {
		console.log("Controller - getCities");
		var addComps = [];
			var pointLat = latLongs.lat();
			var pointLng = latLongs.lng();
			$http({
			  method: 'GET',
			  url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pointLat + "," + pointLng + "&key=AIzaSyCI90XMltpo78jUrUkAdiFYdq1JdEGxa7A"
			}).then(
				function successCallback(response) {
					// console.log(response);
			    // this callback will be called asynchronously when the response is available
					// console.log(response.data.results[0].address_components);
					if(response.data.results[0]) {
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
							// console.log("added", cityString);
							$scope.cities.push(cityString);
							// console.log($scope.cities);
						}
					}
			  }, function errorCallback(response) {
					console.log("failed to get cities");
			  }
			);
	}

	// var fakeFinal = [
	// 	{
	// 		location: "47.6062095,-122.3320708",
	// 		stopover: true
	// 	},
	// 	{
	// 		location: "45.5230622,-122.6764816",
	// 		stopover: true
	// 	},
	// 	{
	// 		location: "45.6698392,-121.8906354",
	// 		stopover: true
	// 	}
	// ];

	var getFinalRoute = function(userChoices) {
		console.log("Controller - getFinalRoute");

	  var directionsService = new google.maps.DirectionsService;
	  var directionsDisplay = new google.maps.DirectionsRenderer;

		var waypoints = [];
		for(var y in userChoices) {
			// console.log(userChoices[y]);
			if(userChoices[y].latlng && y % 8 == 0) {
				var waypoint = {
					location : userChoices[y].latlng[0] + "," + userChoices[y].latlng[1],
					stopover: true
				}
				waypoints.push(waypoint);
			}

		}

	  directionsService.route({
	    origin: "seattle, wa, usa",
	    destination: "portland, or, usa",
			waypoints: waypoints,
    	optimizeWaypoints: true,
	    travelMode: google.maps.TravelMode.DRIVING
	  }, function(response, status) {
	    if (status === google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
				console.log(response);
				// Display route
				// console.log(response.routes[0].overview_path);
	    } else {
	      window.alert('Directions request failed due to ' + status);
	    }
	  });
	}

	// getFinalRoute(fakeFinal);
	$scope.$on('getTrip', function(event, data) {
		console.log("received", data);
		getRoute(data);

		setTimeout(function() {
			console.log("cities", $scope.cities);
			for(var e = 0; e < $scope.cities.length; e++) {
				getTrip($scope.cities[e]);
			}
		}, 5000);
	});

	// setTimeout(function() {
	// 	console.log($scope.result);
	// 	getFinalRoute($scope.result);
	// }, 10000);

	$scope.$watch('result', function () {
		console.log('pushing', $scope.result);
		$rootScope.$broadcast('pushActivities', $scope.result);
	}, true);
});
