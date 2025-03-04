// src/routes/ejemploRoutes.js
const express = require('express');
const router = express.Router();
const ejemploController = require('../controllers/ejemploController');

router.get('/', ejemploController.getEjemplos);
router.post('/', ejemploController.createEjemplo);

module.exports = router;
