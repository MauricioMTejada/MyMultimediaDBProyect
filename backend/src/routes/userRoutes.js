const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const {
    createUserMovie,
    deleteUserMovie,
    getUserMovies,
    updateUserMovie
} = require('../controllers/userController'); // Importar desde userController

// Rutas para crear las asociaciones UserMovie
router.post('/movies/:movieId', authenticateToken, createUserMovie); // Crear asociación
router.put('/movies/:movieId', authenticateToken, deleteUserMovie); // Eliminar asociación
router.get('/usermovies', authenticateToken, getUserMovies); // Obtener todas las películas asociadas al usuario

// Rutas para actualizar los datos de UserMovie
router.put('/usermovies/:id', authenticateToken, updateUserMovie); // Actualizar los datos de UserMovie

module.exports = router;
