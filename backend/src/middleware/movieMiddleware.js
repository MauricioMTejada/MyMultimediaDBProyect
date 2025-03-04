// backend/src/middleware/movieMiddleware.js
const { db } = require('../config/database'); //importar db
const movieController = require('../controllers/movieController');

const getAllMoviesMiddleware = async (req, res) => {
    try {
        // Aquí podrías agregar validaciones o modificaciones antes de llamar al controlador
        // Por ejemplo, podrías paginar, filtrar, etc., y luego pasar esos datos al controlador.

        // Llama al controlador para obtener las películas y pasarle db.Movie
        movieController.getAllMovies(req, res, db.Movie); //Pasar el modelo directamente desde db

    } catch (error) {
        console.error('Error en getAllMoviesMiddleware:', error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

const uploadMoviesJsonMiddleware = (req, res) => {
    // Llama al controlador para subir las peliculas.
    movieController.uploadMoviesToDatabase(req, res);
}

module.exports = {
    getAllMoviesMiddleware,
    uploadMoviesJsonMiddleware
};
