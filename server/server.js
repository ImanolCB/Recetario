const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); // Agregar esta línea para importar 'path'
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set Content-Security-Policy header
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
      "default-src 'self'; " +
      "font-src 'self' data: https://fonts.gstatic.com; " +
      "script-src 'self'; " +
      "style-src 'self' 'unsafe-inline';");
    next();
});

// Servir archivos estáticos de la carpeta "client"
app.use(express.static(path.join(__dirname, 'client')));


// Middlewares
app.use(express.json());
app.use(cors());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api', recipeRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
