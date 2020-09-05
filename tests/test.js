// Import testing dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

// Configure chai (Use the "Should" style)
chai.use(chaiHttp);
chai.should();

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
