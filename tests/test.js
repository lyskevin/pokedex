// Import testing dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index').app;
const { expect } = require('chai');

// Configure chai (Use the 'Should' style)
chai.use(chaiHttp);
chai.should();

var blaziken = {
  'name': 'Blaziken',
  'pokedexNumber': 257,
  'primaryType': 'Fire',
  'secondaryType': 'Fighting'
}

var mewtwo = {
  'name': 'Mewtwo',
  'pokedexNumber': 150,
  'primaryType': 'Psychic'
}

describe('Pokemon', () => {
  describe('POST', () => {
    // Test to add Blaziken
    it('should add Blaziken', function(done) {
      this.timeout(10000);
      chai.request(app)
        .post('/api/pokemon')
        .set('content-type', 'application/json')
        .send(blaziken)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('New Pokemon created!');
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('pokedexNumber');
          result.body.data.should.have.property('primaryType');
          result.body.data.should.have.property('secondaryType');
          result.body.data.name.should.equal(blaziken.name);
          result.body.data.pokedexNumber.should.equal(blaziken.pokedexNumber);
          result.body.data.primaryType.should.equal(blaziken.primaryType);
          result.body.data.secondaryType.should.equal(blaziken.secondaryType);
          done();
        });
    });

    // Test to add Mewtwo (no secondary type)
    it('should add Mewtwo', function(done) {
      this.timeout(10000);
      chai.request(app)
        .post('/api/pokemon')
        .set('content-type', 'application/json')
        .send(mewtwo)
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('New Pokemon created!');
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('pokedexNumber');
          result.body.data.should.have.property('primaryType');
          result.body.data.name.should.equal(mewtwo.name);
          result.body.data.pokedexNumber.should.equal(mewtwo.pokedexNumber);
          result.body.data.primaryType.should.equal(mewtwo.primaryType);
          done();
        });
    });
  });

  describe('GET', () => {
    // Test to get all Pokemon
    // Cannot test for the actual returned dictionary values here because MongoDB entries are created with unique IDs;
    // the test assertion will always fail because there is no way of knowing the unique ID of each entry
    // Storing the ID of each entry inside the GET tests is possible but that introduces side effects to the GET tests
    it('should get all Pokemon', function(done) {
      this.timeout(10000);
      chai.request(app)
        .get('/api/pokemon')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Pokemon retrieved successfully');
          result.body.should.be.a('object');
          done();
        });
    });

    // Test to get a single Pokemon
    it('should get Blaziken', function(done) {
      this.timeout(10000);
      chai.request(app)
        .get('/api/pokemon/Blaziken')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Blaziken details');
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('pokedexNumber');
          result.body.data.should.have.property('primaryType');
          result.body.data.should.have.property('secondaryType');
          result.body.data.name.should.equal(blaziken.name);
          result.body.data.pokedexNumber.should.equal(blaziken.pokedexNumber);
          result.body.data.primaryType.should.equal(blaziken.primaryType);
          result.body.data.secondaryType.should.equal(blaziken.secondaryType);
          done();
        });
    });

    it('should get Mewtwo', function(done) {
      this.timeout(10000);
      chai.request(app)
        .get('/api/pokemon/Mewtwo')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Mewtwo details');
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('pokedexNumber');
          result.body.data.should.have.property('primaryType');
          result.body.data.name.should.equal(mewtwo.name);
          result.body.data.pokedexNumber.should.equal(mewtwo.pokedexNumber);
          result.body.data.primaryType.should.equal(mewtwo.primaryType);
          done();
        });
    });
  });

  describe('PUT', () => {
    // Test to update a Pokemon's details
    it('should update Blaziken\'s details', function(done) {
      this.timeout(10000);
      chai.request(app)
        .put('/api/pokemon/Blaziken')
        .set('content-type', 'application/json')
        .send({
          'name': blaziken.name,
          'pokedexNumber': 400,
          'primaryType': 'Psychic',
          'secondaryType': 'Water'
        })
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Pokemon details updated');
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('pokedexNumber');
          result.body.data.should.have.property('primaryType');
          result.body.data.should.have.property('secondaryType');
          result.body.data.name.should.equal(blaziken.name);
          result.body.data.pokedexNumber.should.equal(400);
          result.body.data.primaryType.should.equal('Psychic');
          result.body.data.secondaryType.should.equal('Water');
          done();
        });
    });
  });

  describe('DELETE', () => {
    // Test to delete Blaziken
    it('should delete Blaziken', function(done) {
      this.timeout(10000);
      chai.request(app)
        .delete('/api/pokemon/Blaziken')
        .set('content-type', 'application/json')
        .send({
          'name': blaziken.name,
        })
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Pokemon deleted');
          done();
        });
    });

    // Test to delete Mewtwo
    it('should delete Mewtwo', function(done) {
      this.timeout(10000);
      chai.request(app)
        .delete('/api/pokemon/Mewtwo')
        .set('content-type', 'application/json')
        .send({
          'name': mewtwo.name,
        })
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Pokemon deleted');
          done();
        });
    });
  });
});
