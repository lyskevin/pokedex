// Model contains the app's business logic

let pokemonTypes = new Set(['Normal', 'Fire', 'Fighting', 'Water',
  'Flying', 'Grass', 'Poison', 'Electric', 'Ground', 'Psychic', 'Rock',
  'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy']);

var mongoose = require('mongoose');

// Setup schema
var pokemonSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pokedexNumber: {
    type: Number,
    required: true
  },
  primaryType: {
    type: String,
    required: true
  },
  secondaryType: {
    type: String,
  }
})

// Export Pokemon model
var Pokemon = module.exports = mongoose.model('pokemon', pokemonSchema);

module.exports.get = function (callback, limit) {
  Pokemon.find(callback).limit(limit).sort('pokedexNumber');
}
