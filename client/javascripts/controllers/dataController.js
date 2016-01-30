dataModule.controller('dataController', function($scope, $routeParams, defaultFactory) {

	var getAllData = function(){
    var url =  "http://terminal2.expedia.com/x/activities/search?location=London&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9"
    var response= "????"
    $scope.add = function(){
        $http.get(url).then(function(response){
            queries = response.queries;
            $scope.newMessage = queries.request.totalResults;
        })
    }
  }
});
