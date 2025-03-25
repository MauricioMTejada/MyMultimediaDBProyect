// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUserMoviesMiddleware } = require('../middleware/userMiddleware');
const { createUserMovieMiddleware, deleteUserMovieMiddleware, getIsMovieAssociatedMiddleware } = require('../middleware/movieMiddleware'); // Importar los middleware de movieMiddleware
const UserMovie = require('../models/UserMovie'); // Importar el modelo UserMovie directamente

// Ruta para obtener las películas asociadas a un usuario
router.get('/:userId/movies', getUserMoviesMiddleware);

// Nueva ruta para obtener los datos de UserMovie de un usuario
router.get('/:userId/user-movies', async (req, res) => {
  const userId = req.params.userId;

  try {
    const userMovies = await UserMovie.findAll({
      where: { userId: userId },
    });

    res.json(userMovies);
  } catch (error) {
    console.error("Error fetching user movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Rutas para las asociaciones UserMovie (MOVER DESDE movieRoutes.js)
router.post('/:userId/movies/:movieId', createUserMovieMiddleware); // Crear asociación
router.delete('/:userId/movies/:movieId', deleteUserMovieMiddleware); // Eliminar asociación
router.get('/:userId/movies/:movieId', getIsMovieAssociatedMiddleware); // Saber si está asociada

module.exports = router;
