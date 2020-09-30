let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let apiRoutes = require('./api-routes.js');
const uri = 'mongodb+srv://kevin:g4fGJnxTUqQhRLp5@cluster0.sbpt3.gcp.mongodb.net/pokemon?retryWrites=true&w=majority';

let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(uri, {
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
