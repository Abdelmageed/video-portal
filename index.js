//requiring NPM modeles
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var db = mongoose.connection;
var path = require('path');
var app = express();

db.on('error', console.error);

//requiring local modeles
var configs = require('./config');
var routes = require('./routes/routes');
var userModel = require('./models/users');
var helperFunctions = require('./helpers/helperFunctions');

console.log('env is: ', process.env.NODE_ENV);
// Uncomment the following lines to start logging requests to consoles.
 app.use(morgan('combined'));
// parse application/x-www-form-urlencoded.
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json.
app.use(bodyParser.json());

//to be able to send requests from dev server at different port
app.use(cors());

//connedting to mongoDB
mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
//populating data if DB is not already populated.
helperFunctions.populateDb();

//Initilizing routes.
routes(app);

// serve video files.
app.use('/videos',express.static('videos'));
// serve client side code.
app.use('/',express.static('client'));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'client/index.html'));
});

//Finally starting the listener
app.listen(configs.applicationPort, function () {
  console.log('Example app listening on port '+configs.applicationPort+'!');
});
