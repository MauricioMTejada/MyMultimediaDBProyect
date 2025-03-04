// src/routes/countryRoutes.js
const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

// Ruta para obtener 10 países aleatorios
router.get('/random', countryController.getRandomCountries);
// Ruta para obtener todos los paises
router.get('/', countryController.getAllCountries);

module.exports = router;
