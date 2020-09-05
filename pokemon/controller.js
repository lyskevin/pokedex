// Import Pokemon model
Pokemon = require('./model.js');

// Handle index actions (i.e. display retrieved list of pokemon)
// GET /api/pokemon
exports.index = function (request, response) {
  Pokemon.get(function (error, pokemon) {
    if (error) {
      response.json({
        status: 'error',
        message: error
      });
    } else {
      response.json({
        status: 'success',
        message: 'Pokemon retrieved successfully',
        data: pokemon
      });
    }
  });
};

// Handle create pokemon actions
// POST /api/pokemon
exports.new = function (request, response) {
  var pokemon = new Pokemon();
  pokemon.name = request.body.name;
  pokemon.pokedexNumber = request.body.pokedexNumber;
  pokemon.primaryType = request.body.primaryType;
  pokemon.secondaryType = request.body.secondaryType;

  // Save the pokemon and check for errors
  pokemon.save(function (error) {
    if (error) {
      response.json(error);
    } else {
      response.json({
        message: 'New Pokemon created!',
        data: pokemon
      })
    }
  });
};

// Handle view pokemon info
// GET /api/pokemon/{name}
exports.view = function(request, response) {
  Pokemon.find({
    name: request.params.name
  }, function (error, pokemon) {
    if (error) {
      response.send(error);
    } else {
      response.json({
        message: 'Pokemon details loading...',
        data: pokemon
      })
    }
  });
};

// Handle update Pokemon info
// PUT /api/pokemon/{name}
exports.update = function (request, response) {
  Pokemon.find({
    name: request.params.name
  }, function (error, pokemon) {
    if (error) {
      response.send(error);
    } else {
      pokemon.name = request.body.name;
      pokemon.pokedexNumber = request.body.pokedexNumber;
      pokemon.primaryType = request.body.primaryType;
      pokemon.secondaryType = request.body.secondaryType;

      // Save the Pokemon and check for errors
      pokemon.save(function (error) {
        if (error) {
          response.json(error);
        } else {
          response.json({
            message: 'Pokemon details updated',
            data: pokemon
          });
        }
      });
    }
  });
};

// Handle delete Pokemon
// DELETE /api/pokemon/{name}
exports.delete = function (request, response) {
  Pokemon.deleteOne({
    name: request.body.name
  }, function (error) {
    if (error) {
      response.send(error);
    } else {
      response.json({
        status: 'success',
        message: 'Pokemon deleted'
      });
    }
  });
};
