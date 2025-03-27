// src/index.js
const express = require('express');
const { sequelize, db } = require('./models/associations'); // Importar db y sequelize desde associations
const ejemploRoutes = require('./routes/ejemploRoutes');
const countryRoutes = require('./routes/countryRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar JSON en las peticiones
app.use(express.json());

// Configurar CORS
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corsOptions));

// Rutas
app.use('/auth', authRoutes);
app.use('/ejemplos', ejemploRoutes);
app.use('/countries', countryRoutes);
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

// Sincronizar modelos con la base de datos (crea tablas si no existen)
sequelize.sync({ alter: false })
    .then(() => {
        console.log('Base de datos sincronizada.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
    });
