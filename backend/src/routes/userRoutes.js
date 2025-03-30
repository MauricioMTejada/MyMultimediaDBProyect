// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUserMovie, deleteUserMovie, getIsMovieAssociated, getUserMovies } = require('../controllers/movieController');

// Rutas para las asociaciones UserMovie
router.post('/:userId/movies/:movieId', (req, res, next) => {
    // console.log('Petición POST a /users/:userId/movies/:movieId recibida:', req.params);
    next();
}, createUserMovie); // Crear asociación
router.delete('/:userId/movies/:movieId', deleteUserMovie); // Eliminar asociación
router.get('/:userId/movies/:movieId', getIsMovieAssociated); // Saber si está asociada
router.get('/:userId/movies', getUserMovies); // Obtener las películas asociadas a un usuario

module.exports = router;
