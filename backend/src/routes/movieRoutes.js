// src/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const { getAllMoviesMiddleware, getMovieByIdMiddleware, createMovieMiddleware, updateMovieMiddleware, deleteMovieMiddleware, uploadMoviesToDatabaseMiddleware } = require('../middleware/movieMiddleware');
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, uploadMoviesToDatabase } = require('../controllers/movieController');

// Rutas para las películas
router.get('/', getAllMoviesMiddleware, getAllMovies); // Obtener todas las películas
router.get('/:movieId', getMovieByIdMiddleware, getMovieById); // Obtener una película por su ID
router.post('/', createMovieMiddleware, createMovie); // Crear una película
router.put('/:movieId', updateMovieMiddleware, updateMovie); // Actualizar una película
router.delete('/:movieId', deleteMovieMiddleware, deleteMovie); // Eliminar una película
router.post('/upload', uploadMoviesToDatabaseMiddleware, (req, res, next) => {
//   console.log('Datos recibidos en /upload:', req.body); // Agregamos el console.log aquí
  next(); // Llamamos a next() para que se ejecute el siguiente middleware o controlador
}, uploadMoviesToDatabase); // Subir películas a la base de datos

module.exports = router;
