// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUserMovie, deleteUserMovie, getIsMovieAssociated, getUserMovies, updateUserMovie } = require('../controllers/movieController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Importamos el middleware

// Rutas para las asociaciones UserMovie
router.post('/movies/:movieId', authenticateToken, createUserMovie); // Crear asociación
router.delete('/movies/:movieId', authenticateToken, deleteUserMovie); // Eliminar asociación
router.get('/movies/:movieId', authenticateToken, getIsMovieAssociated); // Saber si está asociada
router.get('/usermovies', authenticateToken, getUserMovies); // Obtener las películas asociadas a un usuario
router.put('/usermovies/:userMovieId', authenticateToken, updateUserMovie); // Actualizar el estado de visto de una película

module.exports = router;
