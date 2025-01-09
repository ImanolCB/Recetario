const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/dbConnection'); // Conexión a MongoDB
const recipeRoutes = require('./routes/recipeRoutes'); // Rutas de recetas

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.json()); // Analizar JSON en solicitudes

// Conectar a la base de datos
connectDB();

// Rutas de la API
app.use('/api/recipes', recipeRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
