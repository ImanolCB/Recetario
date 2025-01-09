const Recipe = require('../models/Recipe');

// Obtener todas las recetas
const getAllRecipes = async () => {
    return await Recipe.find();
};

// Crear una receta
const createRecipe = async (recipeData) => {
    const recipe = new Recipe(recipeData);
    return await recipe.save();
};

// Exportar funciones
module.exports = {
    getAllRecipes,
    createRecipe,
};
