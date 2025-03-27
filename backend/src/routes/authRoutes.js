// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// Ruta para el login
router.post('/login', login);

// Ruta para el registro
router.post('/register', register);

module.exports = router;
