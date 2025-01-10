const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe'); // Modelo de receta

// Obtener todas las recetas
router.get('/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Consulta todas las recetas desde MongoDB
        res.json(recipes); // Enviar las recetas como respuesta en JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener recetas' });
    }
});

module.exports = router;
