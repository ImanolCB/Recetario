const Recipe = require('../models/Recipe.js');

// Obtener todas las recetas de forma asíncrona y devolverlas
const getAllRecipes = async () => {
    return await Recipe.find();
};

// Crear una receta nueva de forma asíncrona pasando por parámetro los datos de la receta 
const createRecipe = async (recipeData) => {
    const recipe = new Recipe(recipeData);
    return await recipe.save();
};

// Exportar funciones
module.exports = {
    getAllRecipes,
    createRecipe,
};
