// BASE Setup
// ===================================================

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client')));

// require('./server/config/mongoose.js');
// require('./server/config/routes.js')(app);

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

//API prefixes
app.use('/api', router);

app.listen(1337, function(){
	console.log("Server is running at 1337");
})