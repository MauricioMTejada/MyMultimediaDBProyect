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
  console.log('userRoutes.js - GET /:userId/user-movies - req.params:', req.params); // Agregar console.log
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
router.post('/:userId/movies/:movieId', (req, res, next) => { // Agregar console.log
  console.log('userRoutes.js - POST /:userId/movies/:movieId - req.body:', req.body);
  console.log('userRoutes.js - POST /:userId/movies/:movieId - req.params:', req.params);
  next();
}, createUserMovieMiddleware); // Crear asociación
router.delete('/:userId/movies/:movieId', (req, res, next) => { // Agregar console.log
  console.log('userRoutes.js - DELETE /:userId/movies/:movieId - req.body:', req.body);
  console.log('userRoutes.js - DELETE /:userId/movies/:movieId - req.params:', req.params);
  next();
}, deleteUserMovieMiddleware); // Eliminar asociación
router.get('/:userId/movies/:movieId', (req, res, next) => { // Agregar console.log
  console.log('userRoutes.js - GET /:userId/movies/:movieId - req.body:', req.body);
  console.log('userRoutes.js - GET /:userId/movies/:movieId - req.params:', req.params);
  next();
}, getIsMovieAssociatedMiddleware); // Saber si está asociada

module.exports = router;
