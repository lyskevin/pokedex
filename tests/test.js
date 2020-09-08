// Import testing dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index')

// Configure chai (Use the "Should" style)
chai.use(chaiHttp);
chai.should();

// Configure mock database
var mongodb = require('mongo-mock');
mongodb.max_delay = 0;
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost/pokedex';
var docs = [
  {
    "name": "Bulbasaur",
    "pokedexNumber": 1,
    "primaryType": "Grass",
    "secondaryType": "Poison"
  },
  {
    "name": "Ivysaur",
    "pokedexNumber": 2,
    "primaryType": "Grass",
    "secondaryType": "Poison"
  },
  {
    "name": "Venusaur",
    "pokedexNumber": 3,
    "primaryType": "Grass",
    "secondaryType": "Poison"
  }
];

MongoClient.connect(url).then(client => {
  var collection = client.collection('pokemon');
  collection.insertMany(docs, function (err, result){
    // Close connection
    client.close();
  });
});

describe('Pokemon', () => {
  describe('GET', () => {

    // Test to get all Pokemon
    it("should get all Pokemon", (done) => {
      chai.request(app)
        .get('/api/pokemon')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.should.be.a('object');
          done();
        });
    });

    // Test to get a single Pokemon
    it("should get Bulbasaur", (done) => {
      chai.request(app)
        .get('/api/pokemon/Bulbasaur')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('pokedexNumber');
          result.body.data.should.have.property('primaryType');
          result.body.data.should.have.property('secondaryType');
          result.body.data.name.should.equal('Bulbasaur');
          result.body.data.pokedexNumber.should.equal(1);
          result.body.data.primaryType.should.equal('Grass');
          result.body.data.secondaryType.should.equal('Poison');
          done();
        });
    });
  });
});
