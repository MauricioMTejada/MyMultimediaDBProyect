// src/routes/ejemploRoutes.js
const express = require('express');
const router = express.Router();
const ejemploController = require('../controllers/ejemploController'); // Importar el controlador correctamente

// Ruta para obtener todos los ejemplos
router.get('/', ejemploController.getAllEjemplos); // Usa el controlador correcto

module.exports = router;
