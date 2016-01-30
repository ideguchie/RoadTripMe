mainModule.factory('defaultFactory', function($http) {
	var factory = {};
	var users = [];

	factory.getAllUsers = function(callback){
		var id = "";
		var lat = "";
		var lon = "";
		var active = [];
		console.log("Factory - getAllUsers");
		console.log("Executing $http.get getAllUsers");

		//get TTDs
		$http.get('http://terminal2.expedia.com/x/activities/search?location=London&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9').success(function(returned_data_from_server){
			console.log("Server responded with: ", returned_data_from_server);
			//callback(returned_data_from_server);
			for (var i = 0; i < 10; i++) {
				active[i] = returned_data_from_server.activities[i];
				// id = returned_data_from_server.activities[0].id;
				// console.log(id);

				id = active[i].id;
				//get TTD description
				$http.get("http://terminal2.expedia.com/x/activities/details?activityId="+ id +"&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9").success(function(returned_data_from_server){
					console.log("Server responded with: ", returned_data_from_server);
					lat = returned_data_from_server.latLng.split(",");
					lon = lat[1];
					lat = lat[0];

					//get Location weather
					$http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&APPID=485450c2da837aceda525ff9a4165fe1").success(function(returned_data_from_server){
						console.log("Server responded with: ", returned_data_from_server);
					});

				});
			}
		});
	}
	return factory;
});
