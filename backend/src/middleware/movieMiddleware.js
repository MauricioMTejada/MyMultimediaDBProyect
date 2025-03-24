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

const uploadMoviesJsonMiddleware = async (req, res, next) => { //se mantiene `next` por buenas practicas
    try {
        // Eliminar csvCountry antes de enviar los datos
        const moviesData = req.body.map(({ csvCountry, ...movie }) => ({
          title: movie['Título'],
          originalTitle: movie['Título original'],
          year: parseInt(movie['Año']), //convertir a numero
          countryId: movie.countryId, //agregar countryId
          director: movie['Dirección'],
          cast: movie.Reparto,
          companies: movie['Compañías'],
          genres: movie['Género'], //modificado a genres
          synopsis: movie.Sinopsis,
          image: movie.Imagen,
          otherTitles: movie.otherTitles || [],
        })); // <-- Modificación aquí
        // Agregar los datos ya modificados a req.body para que se pueda utilizar en el controlador
        req.body = moviesData;
        // console.log("Datos a enviar desde movieMiddleware.js:", req.body);
        // Llama al controlador para subir las peliculas.
        movieController.uploadMoviesToDatabase(req, res); // <-- Llamada al controlador
    } catch (error) {
        console.error('Error en uploadMoviesJsonMiddleware:', error);
        res.status(500).json({ error: 'Error al subir las películas' });
    }
};

module.exports = {
    getAllMoviesMiddleware,
    uploadMoviesJsonMiddleware
};
