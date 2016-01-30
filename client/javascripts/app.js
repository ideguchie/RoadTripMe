var mainModule = angular.module('mainModule', ['ngRoute', 'ui.bootstrap']);

mainModule.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/defaultPartial.html'
	})
	.when('/secondPartial', {
		templateUrl: 'partials/secondaryDefaultPartial.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});
