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
		for(var i = 0; i < latLongs.length; i++) {
			$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLongs[i].lat() + "," + latLongs[i].lng() + "&key=AIzaSyDdevJaZwheD-E6s1g0r-66f147zHLvYp4").success(function(return_data){
				cities.push(return_data);
			});
		}
		console.log(cities);
		// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
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
