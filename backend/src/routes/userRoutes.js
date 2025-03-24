// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserMoviesMiddleware } = require('../middleware/userMiddleware');
const { createUserMovieMiddleware, deleteUserMovieMiddleware, getIsMovieAssociatedMiddleware } = require('../middleware/movieMiddleware'); // Importar los middleware de movieMiddleware

// Ruta para obtener las películas asociadas a un usuario
router.get('/:userId/movies', getUserMoviesMiddleware);

// Rutas para las asociaciones UserMovie (MOVER DESDE movieRoutes.js)
router.post('/:userId/movies/:movieId', createUserMovieMiddleware); // Crear asociación
router.delete('/:userId/movies/:movieId', deleteUserMovieMiddleware); // Eliminar asociación
router.get('/:userId/movies/:movieId', getIsMovieAssociatedMiddleware); // Saber si está asociada

module.exports = router;
