// Import testing dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index')

// Configure chai (Use the "Should" style)
chai.use(chaiHttp);
chai.should();

describe('Pokemon', () => {
  describe('POST', () => {
      // Test to add Blaziken
      it("should add Blaziken", function(done) {
        chai.request(app)
          .post('/api/pokemon')
          .set('content-type', 'application/json')
          .send({
            "name": "Blaziken",
            "pokedexNumber": 257,
            "primaryType": "Fire",
            "secondaryType": "Fighting"
          })
          .end((error, result) => {
            result.should.have.status(200);
            result.body.message.should.equal('New Pokemon created!');
            result.body.data.should.have.property('name');
            result.body.data.should.have.property('pokedexNumber');
            result.body.data.should.have.property('primaryType');
            result.body.data.should.have.property('secondaryType');
            result.body.data.name.should.equal('Blaziken');
            result.body.data.pokedexNumber.should.equal(257);
            result.body.data.primaryType.should.equal('Fire');
            result.body.data.secondaryType.should.equal('Fighting');
            done();
          });
      });
  });

  describe('GET', () => {
    // Test to get all Pokemon
    it("should get all Pokemon", function(done) {
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
    it("should get Blaziken", function(done) {
      chai.request(app)
        .get('/api/pokemon/Blaziken')
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Blaziken details');
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('pokedexNumber');
          result.body.data.should.have.property('primaryType');
          result.body.data.should.have.property('secondaryType');
          result.body.data.name.should.equal('Blaziken');
          result.body.data.pokedexNumber.should.equal(257);
          result.body.data.primaryType.should.equal('Fire');
          result.body.data.secondaryType.should.equal('Fighting');
          done();
        });
    });
  });

  describe('PUT', () => {
    // Test to update Blaziken's details
    it("should update Blaziken's details", function(done) {
      chai.request(app)
        .put('/api/pokemon/Blaziken')
        .set('content-type', 'application/json')
        .send({
          "name": "Blaziken",
          "pokedexNumber": 400,
          "primaryType": "Fire",
          "secondaryType": "Water"
        })
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Pokemon details updated');
          result.body.data.should.have.property('name');
          result.body.data.should.have.property('pokedexNumber');
          result.body.data.should.have.property('primaryType');
          result.body.data.should.have.property('secondaryType');
          result.body.data.name.should.equal('Blaziken');
          result.body.data.pokedexNumber.should.equal(400);
          result.body.data.primaryType.should.equal('Fire');
          result.body.data.secondaryType.should.equal('Water');
          done();
        });
    });
  });

  describe('DELETE', () => {
    // Test to delete Blaziken
    it("should delete Blaziken", function(done) {
      chai.request(app)
        .delete('/api/pokemon/Blaziken')
        .set('content-type', 'application/json')
        .send({
          "name": "Blaziken",
        })
        .end((error, result) => {
          result.should.have.status(200);
          result.body.message.should.equal('Pokemon deleted');
          done();
        });
    });
  });
});
