// Initialize Express router
let router = require('express').Router();

// Set default API response
router.get('/', function (request, response) {
    response.json({
        status: 'API working',
        message: 'Welcome to my Pokedex',
    });
});

// Import Pokemon controller
var pokemonController = require('./pokemon/controller.js');

// Pokemon rules
router.route('/pokemon')
  .get(pokemonController.index)
  .post(pokemonController.new);

router.route('/pokemon/:name')
  .get(pokemonController.view)
  .patch(pokemonController.update)
  .put(pokemonController.update)
  .delete(pokemonController.delete);

// Export API routes
module.exports = router;
