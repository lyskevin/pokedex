let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let apiRoutes = require('./api-routes.js');
require('dotenv').config();
const uri = 'mongodb+srv://kevin:' + process.env.PASSWORD
  + '@cluster0.sbpt3.gcp.mongodb.net/pokemon?retryWrites=true&w=majority';
let cors = require('cors');

let app = express();

app.use(cors());

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
