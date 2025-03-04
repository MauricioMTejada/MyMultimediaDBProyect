// src/index.js
const express = require('express');
const sequelize = require('./config/database');
const ejemploRoutes = require('./routes/ejemploRoutes');
const countryRoutes = require('./routes/countryRoutes');
const movieRoutes = require('./routes/movieRoutes'); // <-- Importar movieRoutes
const cors = require('cors');
require('./models/Country');
require('./models/Genre');
require('./models/Movie');
require('./models/MovieGenre')
require('./models/UserMovie')
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
app.use('/api/ejemplos', ejemploRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/movies', movieRoutes); // <-- Usar movieRoutes

// Sincronizar modelos con la base de datos (crea tablas si no existen)
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
    });
