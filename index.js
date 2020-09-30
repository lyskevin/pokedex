let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let apiRoutes = require('./api-routes.js');
require('dotenv').config();

let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

if (db) {
  console.log("DB connected successfully");
} else {
  console.log("Error connecting DB");
}

var port = 4321;

app.get('/', (request, response) => response.send('Welcome to my Pokedex'));
app.use('/api', apiRoutes);

app.listen(port, function() {
  console.log("Running Pokedex on port " + port);
});

module.exports = {
  app
};
