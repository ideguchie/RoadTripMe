mainModule.controller('activityController', function($scope, $routeParams, defaultFactory) {
	$scope.result = [];
	$scope.activity = [];

	$scope.$on('pushActivities', function(event, data) { 
		console.log("received", data);
		$scope.result = data;
	});

	$scope.addActivity = function(data) {
		if($scope.activity.length <= 8) {
			if($scope.activity.indexOf(data) == -1) {
				$(".act-" + data.id).removeClass('hidden');
				$scope.activity.push(data);
			} else {
				$(".act-" + data.id).addClass('hidden');
				$scope.activity.splice($scope.activity.indexOf(data), 1);
			}
		} else {
			alert("Cannot pick more than 8 locations!");
		}
	}

});
