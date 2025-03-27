// backend/src/middleware/movieMiddleware.js
const { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, uploadMoviesToDatabase } = require('../controllers/movieController');

const getAllMoviesMiddleware = (req, res, next) => {
    console.log('getAllMoviesMiddleware - Petición GET a /movies recibida:', req.headers, req.query); // Loguear headers y query params
    next(); // Pasar al controlador
};

const getMovieByIdMiddleware = (req, res, next) => {
    console.log('getMovieByIdMiddleware - Petición GET a /movies/:movieId recibida:', req.headers, req.query, req.params);
    next();
};

const createMovieMiddleware = (req, res, next) => {
    console.log('createMovieMiddleware - Petición POST a /movies recibida:', req.headers, req.query, req.body);
    next();
};

const updateMovieMiddleware = (req, res, next) => {
    console.log('updateMovieMiddleware - Petición PUT a /movies/:movieId recibida:', req.headers, req.query, req.body, req.params);
    next();
};

const deleteMovieMiddleware = (req, res, next) => {
    console.log('deleteMovieMiddleware - Petición DELETE a /movies/:movieId recibida:', req.headers, req.query, req.params);
    next();
};

const uploadMoviesToDatabaseMiddleware = (req, res, next) => {
    console.log('uploadMoviesToDatabaseMiddleware - Petición POST a /movies/upload recibida:', req.headers, req.query, req.body);
    next();
};

module.exports = {
    getAllMoviesMiddleware,
    getMovieByIdMiddleware,
    createMovieMiddleware,
    updateMovieMiddleware,
    deleteMovieMiddleware,
    uploadMoviesToDatabaseMiddleware
};
