// src/index.js
const express = require('express');
const {sequelize, db } = require('./config/database'); // importar db y sequelize
const ejemploRoutes = require('./routes/ejemploRoutes');
const countryRoutes = require('./routes/countryRoutes');
const movieRoutes = require('./routes/movieRoutes'); // <-- Importar movieRoutes
const userRoutes = require('./routes/userRoutes'); // <-- Importar userRoutes
const cors = require('cors');
require('dotenv').config();

//importar los modelos
const Movie = require('./models/Movie');
const Country = require('./models/Country');
const Genre = require('./models/Genre');
const MovieGenre = require('./models/MovieGenre');
const UserMovie = require('./models/UserMovie');
const Ejemplo = require('./models/ejemplo');
const User = require('./models/User')

//agregar los modelos a db
db.Movie = Movie;
db.Country = Country;
db.Genre = Genre;
db.MovieGenre = MovieGenre;
db.UserMovie = UserMovie;
db.Ejemplo = Ejemplo;
db.User = User;

// Require associations AFTER all models are defined
require('./models/associations'); // Add this line

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
app.use('/ejemplos', ejemploRoutes); //eliminar api de las rutas.
app.use('/countries', countryRoutes); //eliminar api de las rutas.
app.use('/movies', movieRoutes); //eliminar api de las rutas.
app.use('/users', userRoutes); // <-- Usar userRoutes

// Sincronizar modelos con la base de datos (crea tablas si no existen)
// sequelize.sync({ force: true })
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
