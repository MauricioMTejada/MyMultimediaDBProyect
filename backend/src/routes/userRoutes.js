// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUserMovie, deleteUserMovie, getIsMovieAssociated, getUserMovies, updateUserMovie } = require('../controllers/movieController');
const { authenticateToken } = require('../middleware/authMiddleware'); // Importamos el middleware

// Rutas para las asociaciones UserMovie
router.post('/movies/:movieId', (req, res, next) => {
    // console.log('Solicitud POST recibida en /movies/:movieId:', req.body);
    next(); // Pasar al siguiente middleware (authenticateToken)
}, authenticateToken, createUserMovie); // Crear asociación

router.delete('/movies/:movieId', authenticateToken, deleteUserMovie); // Eliminar asociación
router.get('/movies/:movieId', authenticateToken, getIsMovieAssociated); // Saber si está asociada
router.put('/usermovies/:userMovieId', authenticateToken, updateUserMovie); // Actualizar el estado de visto de una película

// Datos de películas con las opciones del usuario
router.get('/usermovies', authenticateToken, getUserMovies);

module.exports = router;
