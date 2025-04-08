const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('./config/env');

const countryRoutes = require('./routes/countryRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Rutas base
app.use('/auth', authRoutes);
app.use('/countries', countryRoutes);
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

// Middleware global de errores (debe ir al final)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocurrió un error en el servidor.' });
});

module.exports = app;