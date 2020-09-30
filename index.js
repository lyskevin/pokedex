let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let apiRoutes = require('./api-routes.js');

let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://0.0.0.0/pokedex', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;

if (db) {
  console.log("DB connected successfully");
} else {
  console.log("Error connecting DB");
}

var port = process.env.PORT || 8080;

app.get('/', (request, response) => response.send('Welcome to my Pokedex'));
app.use('/api', apiRoutes);

app.listen(port, function() {
  console.log("Running Pokedex on port " + port);
});

module.exports = {
  app
};
