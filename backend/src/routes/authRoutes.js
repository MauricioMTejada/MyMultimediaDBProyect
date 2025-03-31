// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, register, check } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Importamos el middleware

// Ruta para el login
router.post('/login', login);

// Ruta para el registro
router.post('/register', register);

// Ruta para verificar el estado del login (protegida por el middleware)
router.get('/check', authenticateToken, check); // Agregamos el middleware a la ruta

module.exports = router;
