// src/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const { getAllMoviesMiddleware, uploadMoviesJsonMiddleware } = require('../middleware/movieMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Ruta para obtener todas las películas
router.get('/', getAllMoviesMiddleware);

// Ruta para cargar los datos del CSV en formato json y agregarlos a la BD
router.post('/upload-json', uploadMoviesJsonMiddleware); // Nueva ruta

//router.post('/upload', upload.single('csvFile'), movieController.uploadMovies); // <-- Comenta o elimina la ruta anterior

module.exports = router;
