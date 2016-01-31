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
	$scope.cities = [];

	var getRouteData = function(arr) {
		// Define the initial promise
		var sequence2 = $q.defer();
		sequence2.resolve();
		sequence2 = sequence2.promise;

		// console.log(arr);
		angular.forEach(arr, function(val,key){
				if(key % 20 == 0) {
				sequence2 = sequence2.then(function() {
						return getCities(val);
				});
			}
		});

		// for (var key = 0; key < arr.length; key += 20) {
		// 	// console.log("value", arr[key], key, arr.length);
		// 	sequence2 = sequence2.then(function() {
		// 			console.log(key, arr.length);
		// 		  // if (key < arr.length) {
		// 				console.log("running");
		// 				return getCities(arr[key]);
		// 			// }
		// 	});
		// }

	}

	var getRoute = function() {
		console.log("Controller - getRoute");

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
				// console.log($scope.cities);
	    } else {
	      window.alert('Directions request failed due to ' + status);
	    }
	  });
	}
	getRoute();

	var getCities = function(latLongs) {
		console.log("Controller - getCities");
		// var cities = [];
		var addComps = [];

		for(var i = 0; i < latLongs.length; i += 20) {
			var pointLat = latLongs[i].lat();
			var pointLng = latLongs[i].lng();
			$http({
			  method: 'GET',
			  url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pointLat + "," + pointLng + "&key=AIzaSyCI90XMltpo78jUrUkAdiFYdq1JdEGxa7A"
			}).then(function successCallback(response) {
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
		// }
		// console.log("Cities array: ");
		// console.log($scope.cities);
	}
	getRoute();

	// var getFinalRoute = function(start, end, TTDs) {
	// 	console.log("Controller - getRoute");
	//
	//   var directionsService = new google.maps.DirectionsService;
	//   var directionsDisplay = new google.maps.DirectionsRenderer;
	//
	//   directionsService.route({
	//     origin: "seattle, wa, usa",
	//     destination: "portland, or, usa",
	//     travelMode: google.maps.TravelMode.DRIVING
	//   }, function(response, status) {
	//     if (status === google.maps.DirectionsStatus.OK) {
	//       directionsDisplay.setDirections(response);
	// 			// console.log(response.routes[0].overview_path);
	// 			getRouteData(response.routes[0].overview_path);
	//     } else {
	//       window.alert('Directions request failed due to ' + status);
	//     }
	//   });
	// }

	// ELLIOTS STUFF

	// var getAllUsers = function(){
	// 	// console.log("Controller - getAllUsers");
	// 	defaultFactory.getAllUsers(function(users){
	// 		// console.log("Back to controller, done with factory by a callback function");
	// 		// console.log(users);
	// 		$scope.users = users;
	// 	});
	// }
	//
	// var getTrip = function() {
	//
	// 	defaultFactory.getActivity()
	// 		.then(function(response) {
	// 			console.log(response);
	//
	// 			for (var i = 0; i < 10; i++) {
	// 				var obj = {};
	// 				activity = response.data.activities[i];
	// 				// id = returned_data_from_server.activities[0].id;
	// 				// console.log(id);
	//
	// 				obj.id = activity.id;
	// 				obj.title = activity.title;
	// 				obj.image = activity.imageUrl;
	// 				obj.price = activity.fromPrice;
	// 				obj.detail = '';
	//
	// 				$scope.result.push(obj);
	// 			}
	//
	// 			// Define the initial promise
	// 			var sequence = $q.defer();
	// 			sequence.resolve();
	// 			sequence = sequence.promise;
	//
	// 			angular.forEach($scope.result, function(val,key){
	// 					sequence = sequence.then(function() {
	// 							return getTripDetails(val);
	// 					});
	// 			});
	//
	// 			console.log($scope.result);
	// 		});
	// }
	//
	// var getTripDetails = function(val) {
	// 	// console.log("trip details", id);
	// 	defaultFactory.getActivityDetails(val.id)
	// 		.then(function(response_activity) {
	// 			var index = $scope.result.indexOf(val);
	// 			$scope.result[index].detail = response_activity.data.metaDescription;
	// 			$scope.result[index].latlng = response_activity.data.latLng.split(",");
	// 			// console.log($scope.result[index].latlng);
	// 			getWeather($scope.result[index]);
	// 		});
	// }
	//
	// var getWeather = function(val) {
	// 	// console.log(val);
	// 	var input = {}
	// 	input.lon = val.latlng[1];
	// 	input.lat = val.latlng[0];
	//
	// 	defaultFactory.getWeather(input)
	// 	.then(function (response_weather) {
	// 		var index = $scope.result.indexOf(val);
	// 		// console.log(response_weather);
	// 		$scope.result[index].weather = response_weather.data.weather[0].main;
	// 		$scope.result[index].wDescript = response_weather.data.weather[0].description;
	// 	});
	// }
	//
	// getTrip();
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

mainModule.directive("flip", function(){

  function setDim(element, width, height){
    element.style.width = width;
    element.style.height = height;
  }

  var cssString =
    "<style> \
    .flip {float: left; overflow: hidden} \
    .flipBasic { \
    position: absolute; \
    -webkit-backface-visibility: hidden; \
    backface-visibility: hidden; \
    transition: -webkit-transform .5s; \
    transition: transform .5s; \
    -webkit-transform: perspective( 800px ) rotateY( 0deg ); \
    transform: perspective( 800px ) rotateY( 0deg ); \
    } \
    .flipHideBack { \
    -webkit-transform:  perspective(800px) rotateY( 180deg ); \
    transform:  perspective(800px) rotateY( 180deg ); \
    } \
    .flipHideFront { \
    -webkit-transform:  perspective(800px) rotateY( -180deg ); \
    transform:  perspective(800px) rotateY( -180deg ); \
    } \
    </style> \
    ";

  document.head.insertAdjacentHTML("beforeend", cssString);


  return {
    restrict : "E",
    controller: function($scope, $element, $attrs){

      var self = this;
      self.front = null,
      self.back = null;


      function showFront(){
        self.front.removeClass("flipHideFront");
        self.back.addClass("flipHideBack");
      }

      function showBack(){
        self.back.removeClass("flipHideBack");
        self.front.addClass("flipHideFront");
      }

      self.init = function(){
        self.front.addClass("flipBasic");
        self.back.addClass("flipBasic");

        showFront();
        self.front.on("click", showBack);
        self.back.on("click", showFront);
      }

    },

    link : function(scope,element,attrs, ctrl){

      var width = attrs.flipWidth || "100px",
        height =  attrs.flipHeight || "100px";

      element.addClass("flip");

      if(ctrl.front && ctrl.back){
        [element, ctrl.front, ctrl.back].forEach(function(el){
          setDim(el[0], width, height);
        });
        ctrl.init();
      }
      else {
        console.error("FLIP: 2 panels required.");
      }

    }
  }

});

mainModule.directive("flipPanel", function(){
  return {
    restrict : "E",
    require : "^flip",
    //transclusion : true,
    link: function(scope, element, attrs, flipCtr){
      if(!flipCtr.front) {flipCtr.front = element;}
      else if(!flipCtr.back) {flipCtr.back = element;}
      else {
        console.error("FLIP: Too many panels.");
      }
    }
  }
});
