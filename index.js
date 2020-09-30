// Body parser allows the app to parse data from incoming requests
let bodyParser = require('body-parser');

let express = require('express');

// Mongoose is a NodeJS package for modelling MongoDB.
// It handles validation and business logic for MongoDB on NodeJS
let mongoose = require('mongoose');

let app = express();

// Import routes
let apiRoutes = require('./api-routes.js');

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));

// Returns middleware that only parses JSON
app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect('mongodb://localhost/pokedex', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set Mongoose connection variable
var db = mongoose.connection;

// Check for DB connection
if (db) {
  console.log("DB connected successfully");
} else {
  console.log("Error connecting DB");
}

// Set up server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (request, response) => response.send('Welcome to my Pokedex'));

// Use API routes in the app
app.use('/api', apiRoutes);

// Launch app and listen to specified port
app.listen(port, function() {
  console.log("Running Pokedex on port " + port);
});

module.exports = app;
module.exports.myFunction = app;

