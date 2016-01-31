//GET CITIES ALONG THE WAY
//reference Rithvik

//FROM INDIVIDUAL CITY
var title = "";
var image = "";
var price = "";
var detail = "";
var weather = "";
var wDescript = "";
var start = "";//get from input; form YYYY-MM-DD
var end = "";//get from input; form YYYY-MM-DD
var location = "";//get from input; CITY
var url =  "http://terminal2.expedia.com/x/activities/search?location="+ location +"&startDate="+ start +"&endDate="+ end +"&apikey=KvTSobGaExiwiazfRdtoMYpNaRhBk2E9";
var response = [""];
$scope.add = function(){
    $http.get(url).then(function(response){
        queries = response.queries;
        $scope.newMessage = queries.request.totalResults;
    })
}

//parse json for coordinates
var response = '{"result":true,"count":1}',
    obj = JSON && JSON.parse(response) || $.parseJSON(response);

//feed latitide and longitude into weather api
var lat = "";//latitude
var lon = "";//longitude
var url =  "api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon +"";
$scope.add = function(){
    $http.get(url).then(function(response){
        queries = response.queries;
        $scope.newMessage = queries.request.totalResults;
    })
}

//COMPILE LIST
//sort TTD by recommendation score
TTD.sort(function(a, b) {
  //return parseInt we are sorting by???
    return parseInt(a.attribute) - parseFloat(b.attribute);
});
//take top N entries of list
//add to route_list
//two options of moving list items
Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

Array.prototype.move = function (old_index, new_index) {
    while (old_index < 0) {
        old_index += this.length;
    }
    while (new_index < 0) {
        new_index += this.length;
    }
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};
//display route_list with corresponding weather next to it in row

//route_list items can be selected
//dynamically add to user_list

//DISPLAY ROUTE WITH TTD WAYPOINTS
//user confirms list
//reference Rithvik
