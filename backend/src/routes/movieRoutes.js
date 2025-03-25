// src/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const { getAllMoviesMiddleware, createMovieMiddleware, deleteMovieMiddleware, updateMovieMiddleware, getMovieByIdMiddleware } = require('../middleware/movieMiddleware');

// Rutas para las películas
router.get('/', getAllMoviesMiddleware); // Obtener todas las películas
router.post('/', createMovieMiddleware); // Crear una película
router.delete('/:movieId', deleteMovieMiddleware); // Eliminar una película
router.put('/:movieId', updateMovieMiddleware); // Actualizar una película

// Nueva ruta para obtener una película por su ID
router.get('/:movieId', getMovieByIdMiddleware); // Obtener una película por su ID

module.exports = router;
