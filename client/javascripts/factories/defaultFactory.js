mainModule.factory('defaultFactory', function($http) {
	var factory = {};
	var users = [];

	factory.getAllUsers = function(callback){
		var title = "";
		var image = "";
		var price = "";
		var detail = "";
		var weather = "";
		var wDescript = "";
		var id = "";
		var lat = "";
		var lon = "";
		var active = [];
		// console.log("Factory - getAllUsers");
		// console.log("Executing $http.get getAllUsers");

		//get TTDs
		$http.get('http://terminal2.expedia.com/x/activities/search?location=London&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9').success(function(returned_data_from_server){
			console.log("Server responded with: ", returned_data_from_server);
			//callback(returned_data_from_server);
			for (var i = 0; i < 10; i++) {
				active[i] = returned_data_from_server.activities[i];
				// id = returned_data_from_server.activities[0].id;
				// console.log(id);

				id = active[i].id;
				title = active[i].title;
				image = active[i].imageUrl;
				price = active[i].fromPrice;
				//get TTD description
				$http.get("http://terminal2.expedia.com/x/activities/details?activityId="+ id +"&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9").success(function(returned_data_from_server1){
					console.log("Server responded with: ", returned_data_from_server1);
					detail = returned_data_from_server1.metaDescription;
					lat = returned_data_from_server1.latLng.split(",");
					lon = lat[1];
					lat = lat[0];

					//get Location weather
					$http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&APPID=485450c2da837aceda525ff9a4165fe1").success(function(returned_data_from_server2){
						// console.log("Server responded with: ", returned_data_from_server2);
						weather = returned_data_from_server2.weather[0].main;
						wDescript = returned_data_from_server2.weather[0].description;

					});

				});
				console.log(title + "\n" +image + "\n" +price + "\n" +detail + "\n" +weather + "\n" +wDescript + "\n");
			}
		});
	}
	return factory;
});
