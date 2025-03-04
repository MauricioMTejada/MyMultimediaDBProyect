// src/routes/countryRoutes.js
const express = require('express');
const router = express.Router();
const { getRandomCountriesMiddleware, getAllCountriesMiddleware } = require('../middleware/countryMiddleware'); // Importar el middleware

// Ruta para obtener 10 países aleatorios
router.get('/random', getRandomCountriesMiddleware); // Usa el middleware
// Ruta para obtener todos los paises
router.get('/', getAllCountriesMiddleware); // Usa el middleware

module.exports = router;
