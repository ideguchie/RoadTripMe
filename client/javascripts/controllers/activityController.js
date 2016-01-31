mainModule.controller('activityController', function($rootScope, $scope, $routeParams, defaultFactory) {
	$scope.result = [];
	$scope.activity = [];

	$scope.$on('pushActivities', function(event, data) {
		console.log("received", data);
		$scope.result = data;
	});

	$scope.submitActivity = function() {
		$("#activityController").addClass('hidden');
		$rootScope.$broadcast('findPath', $scope.activity);
	}

	$scope.addActivity = function(data) {
		if($scope.activity.length < 8) {
			if($scope.activity.indexOf(data) == -1) {
				$(".act-" + data.id).removeClass('hidden');
				$scope.activity.push(data);
			} else {
				$(".act-" + data.id).addClass('hidden');
				$scope.activity.splice($scope.activity.indexOf(data), 1);
			}
		} else {
			alert("You'll never get there at that rate! Please choose 8 locations or less.");
		}
	}

});
