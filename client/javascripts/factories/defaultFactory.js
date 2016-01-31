mainModule.factory('defaultFactory', function($http) {
	var factory = {};
	var users = [];

	factory.getActivity = function(loc) {
		return $http.get("http://terminal2.expedia.com/x/activities/search?location="+ loc +"&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9")
			.then(function(returned_data_from_server){
				// console.log(returned_data_from_server);
				return returned_data_from_server;
			});
	}

	factory.getActivityDetails = function(id) {
		return $http.get("http://terminal2.expedia.com/x/activities/details?activityId="+ id +"&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9")
			.then(function(returned_data_from_server1){
				// console.log(returned_data_from_server1);
				// console.log("1");
				return returned_data_from_server1;
			});
	}

	factory.getWeather = function(data) {
		return $http.get("http://api.openweathermap.org/data/2.5/weather?q="+ data +"&APPID=485450c2da837aceda525ff9a4165fe1")
			.then(function(returned_data_from_server2){
				// console.log(returned_data_from_server2);
				return returned_data_from_server2;
			});
	}

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
		var activity = [];
		var obj = {};
		// console.log("Factory - getAllUsers");
		// console.log("Executing $http.get getAllUsers");

		//get TTDs
		$http.get('http://terminal2.expedia.com/x/activities/search?location=London&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9')
			.then(function(returned_data_from_server){

			console.log("Server responded with: ", returned_data_from_server);
			//callback(returned_data_from_server);
			for (var i = 0; i < 10; i++) {
				activity = returned_data_from_server.data.activities[i];
				// id = returned_data_from_server.activities[0].id;
				// console.log(id);

				id = activity.id;
				title = activity.title;
				image = activity.imageUrl;
				price = activity.fromPrice;
				//get TTD description
				$http.get("http://terminal2.expedia.com/x/activities/details?activityId="+ id +"&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9")
					.then(function(returned_data_from_server1){

					console.log("Server responded with: ", returned_data_from_server1);
					detail = returned_data_from_server1.data.metaDescription;
					lat = returned_data_from_server1.data.latLng.split(",");
					lon = lat[1];
					lat = lat[0];

					//get Location weather
					$http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"&APPID=485450c2da837aceda525ff9a4165fe1")
						.then(function(returned_data_from_server2){
						// console.log("Server responded with: ", returned_data_from_server2);
						weather = returned_data_from_server2.data.weather[0].main;
						wDescript = returned_data_from_server2.data.weather[0].description;

					});
				});
				console.log(title + "\n" +image + "\n" +price + "\n" +detail + "\n" +weather + "\n" +wDescript + "\n");
			}
		});
	}
	return factory;
});
