const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión a MongoDB Atlas establecida');
    } catch (error) {
        console.error('Error conectando a MongoDB:', error.message);
        process.exit(1); // Finaliza la app si falla la conexión
    }
};

module.exports = connectDB;
