mainModule.controller('mapController', function($scope, $routeParams, defaultFactory) {


  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(41.85,-87.65),
    mapTypeId: google.maps.MapTypeId.TERRAIN
  }

  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

  $scope.markers = [];

  var infoWindow = new google.maps.InfoWindow();

  var createMarker = function (info){

    var marker = new google.maps.Marker({
      map: $scope.map,
      position: new google.maps.LatLng(info.lat, info.long),
      title: info.city
    });
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

    google.maps.event.addListener(marker, 'click', function(){
      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
      infoWindow.open($scope.map, marker);
    });

    $scope.markers.push(marker);

  }

  for (i = 0; i < cities.length; i++){
    createMarker(cities[i]);
  }

  $scope.openInfoWindow = function(e, selectedMarker){
    e.preventDefault();
    google.maps.event.trigger(selectedMarker, 'click');
  }

  //Sample https://developers.google.com/maps/documentation/javascript/examples/directions-waypoints
  var getFinalRoute = function(userChoices) {
    console.log("getFinalRoute");
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   zoom: 6,
    //   center: {lat: 41.85, lng: -87.65}
    // });
    directionsDisplay.setMap($scope.map);

    var waypts = [];
    for(var y in userChoices) {
      // console.log(userChoices[y]);
      if(userChoices[y].latlng) {
        var waypoint = {
          location : userChoices[y].latlng[0] + "," + userChoices[y].latlng[1],
          stopover: true
        }
        waypts.push(waypoint);
      }

    }

    console.log("waypoints", waypts);

    directionsService.route({
      origin: "seattle, wa, usa",
      destination: "portland, or, usa",
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });

  }

  $scope.$on('findPath', function(event, data) {
    console.log("final route", data);
    getFinalRoute(data);
  }, true);

});

	//Data
  var cities = [
              // {
              //     city : 'India',
              //     desc : 'This is the best country in the world!',
              //     lat : 23.200000,
              //     long : 79.225487
              // },
              // {
              //     city : 'New Delhi',
              //     desc : 'The Heart of India!',
              //     lat : 28.500000,
              //     long : 77.250000
              // },
              // {
              //     city : 'Mumbai',
              //     desc : 'Bollywood city!',
              //     lat : 19.000000,
              //     long : 72.90000
              // },
              // {
              //     city : 'Kolkata',
              //     desc : 'Howrah Bridge!',
              //     lat : 22.500000,
              //     long : 88.400000
              // },
              // {
              //     city : 'Chennai  ',
              //     desc : 'Kathipara Bridge!',
              //     lat : 13.000000,
              //     long : 80.250000
              // }
              ];
