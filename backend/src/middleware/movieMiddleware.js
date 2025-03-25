// src/middleware/movieMiddleware.js
const { db } = require('../config/database'); //importar db
const movieController = require('../controllers/movieController');

const getAllMoviesMiddleware = async (req, res) => {
    try {
        // Llama al controlador para obtener las películas y pasarle db.Movie
        const movies = await movieController.getAllMovies(db.Movie); //Pasar el modelo directamente desde db
        const associatedMovieIds = await movieController.getUserMovies(db.UserMovie, 1); // Reemplaza 1 por el userId

        const moviesWithAssociation = movies.map(movie => ({
            ...movie.dataValues,
            isAssociated: associatedMovieIds.includes(movie.id),
        }));
        res.json(moviesWithAssociation);
    } catch (error) {
        console.error('Error en getAllMoviesMiddleware:', error);
        res.status(500).json({ error: error.message });
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
        // Llama al controlador para subir las peliculas.
        const moviesCreated = await movieController.uploadMoviesToDatabase(db.Movie, moviesData); // <-- Llamada al controlador
        res.status(201).json({ message: 'Películas agregadas a la base de datos correctamente' });
    } catch (error) {
        console.error('Error en uploadMoviesJsonMiddleware:', error);
        res.status(500).json({ error: error.message });
    }
};

const createUserMovieMiddleware = async (req, res) => {
    console.log('createUserMovieMiddleware - req.body:', req.body); // Agregar console.log
    console.log('createUserMovieMiddleware - req.params:', req.params); // Agregar console.log
    const { userId, movieId } = req.body; // Ahora se extrae de req.body
    try {
        const result = await movieController.createUserMovie(db.UserMovie, userId, movieId);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error en createUserMovieMiddleware:', error);
        res.status(500).json({ error: error.message });
    }
};

const deleteUserMovieMiddleware = async (req, res) => {
    console.log('deleteUserMovieMiddleware - req.body:', req.body); // Agregar console.log
    console.log('deleteUserMovieMiddleware - req.params:', req.params); // Agregar console.log
    const { userId, movieId } = req.params; // Se mantiene en req.params para DELETE
    try {
        const result = await movieController.deleteUserMovie(db.UserMovie, userId, movieId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error en deleteUserMovieMiddleware:', error);
        res.status(500).json({ error: error.message });
    }
};

const getIsMovieAssociatedMiddleware = async (req, res) => {
    const { userId, movieId } = req.params;
    try {
        const result = await movieController.getIsMovieAssociated(db.UserMovie, userId, movieId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error en getIsMovieAssociatedMiddleware:', error);
        res.status(500).json({ error: error.message });
    }
};

const getMovieByIdMiddleware = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await db.Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        res.json(movie);
    } catch (error) {
        console.error('Error al obtener la película:', error);
        res.status(500).json({ error: 'Error al obtener la película' });
    }
};

const createMovieMiddleware = async (req, res) => {
    try {
        const newMovie = await db.Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error al crear la película:', error);
        res.status(500).json({ error: 'Error al crear la película' });
    }
};

const deleteMovieMiddleware = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await db.Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        await movie.destroy();
        res.json({ message: 'Película eliminada' });
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).json({ error: 'Error al eliminar la película' });
    }
};

const updateMovieMiddleware = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await db.Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        await movie.update(req.body);
        res.json(movie);
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        res.status(500).json({ error: 'Error al actualizar la película' });
    }
};

module.exports = {
    getAllMoviesMiddleware,
    uploadMoviesJsonMiddleware,
    createUserMovieMiddleware,
    deleteUserMovieMiddleware,
    getIsMovieAssociatedMiddleware,
    getMovieByIdMiddleware,
    createMovieMiddleware,
    deleteMovieMiddleware,
    updateMovieMiddleware
};
