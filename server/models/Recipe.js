const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [String],
    steps: [String],
    image: String,
    duration: String,
    category: [String],
});

module.exports = mongoose.model('Recipe', recipeSchema);
