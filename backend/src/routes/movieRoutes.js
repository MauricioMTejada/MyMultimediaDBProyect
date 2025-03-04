// src/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Ruta para obtener todas las películas
router.get('/', async (req, res) => {
    try {
        const movies = await movieController.getAllMovies(); // Llama al método del controlador
        res.json(movies); // Envía las películas como respuesta en formato JSON
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
});

// Ruta para cargar los datos del CSV en formato json
router.post('/upload-json', movieController.uploadMoviesJson); // Nueva ruta

//router.post('/upload', upload.single('csvFile'), movieController.uploadMovies); // <-- Comenta o elimina la ruta anterior

module.exports = router;
