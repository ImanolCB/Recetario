const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI no está definida en el archivo .env");
        }
        
        // Conexión a la base de datos de MongoDB Atlas sin opciones obsoletas
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a MongoDB Atlas establecida');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error.message);
        process.exit(1); // Finaliza la app si falla la conexión
    }
};

module.exports = connectDB;
