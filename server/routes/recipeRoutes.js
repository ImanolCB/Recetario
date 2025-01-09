const express = require('express');
const { getAllRecipes, createRecipe } = require('../services/recipeService.js');
const router = express.Router();

// Ruta para obtener todas las recetas
router.get('/', async (req, res) => {
    try {
        const recipes = await getAllRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener recetas' });
    }
});

// Ruta para crear una nueva receta
router.post('/', async (req, res) => {
    try {
        const newRecipe = await createRecipe(req.body);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear receta' });
    }
});

module.exports = router;