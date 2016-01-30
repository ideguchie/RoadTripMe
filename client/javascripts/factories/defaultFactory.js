mainModule.factory('defaultFactory', function($http) {
	var factory = {};
	var users = [];

	factory.getAllUsers = function(callback){
		var id = "";
		var lat = "";
		var lon = "";
		console.log("Factory - getAllUsers");
		console.log("Executing $http.get getAllUsers");
		$http.get('http://terminal2.expedia.com/x/activities/search?location=London&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9').success(function(returned_data_from_server){
			console.log("Server responded with: ", returned_data_from_server);
			//callback(returned_data_from_server);
			id = returned_data_from_server.activities[0].id;
			// console.log(id);
			$http.get("http://terminal2.expedia.com/x/activities/details?activityId="+ id +"&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9").success(function(returned_data_from_server){
				console.log("Server responded with: ", returned_data_from_server);
				lat = returned_data_from_server.latLng.split(",");
				lon = lat[1];
				lat = lat[0];
				// console.log(lat);
				// console.log(lon);
				$http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&APPID=485450c2da837aceda525ff9a4165fe1").success(function(returned_data_from_server){
					console.log("Server responded with: ", returned_data_from_server);
				});
			});
		});
	}
	return factory;
});
