// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express

var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var UserController  = require('./controllers/UserController.js');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});






// create a bear (accessed at POST http://localhost:8080/api/bears)


router.get('/user/:name', UserController.get);
router.post('/user', UserController.create);
router.delete('/user/:name', UserController.delete);

	//User.sync({force: true}).then(function () {
	    // Table created
	  //    return


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


module.exports = app

// START THE SERVER
// =============================================================================