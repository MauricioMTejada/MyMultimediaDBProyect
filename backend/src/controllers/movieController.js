// src/controllers/movieController.js
const { db } = require('../config/database'); // Importar db

const getAllMovies = async (Movie, UserMovie) => { // Recibir Movie y UserMovie como parametro
    try {
        const movies = await Movie.findAll(); // Utilizar el modelo Movie recibido como parámetro
        // console.log("getAllMovies - las peliculas obtenidas son", movies); //agregar log
        return movies;
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        throw new Error('Error al obtener las películas');
    }
};

const uploadMoviesToDatabase = async (Movie, jsonData) => {
    try {
        // Insertar los datos en la base de datos
        const moviesCreated = await Movie.bulkCreate(jsonData); //utilizar db.Movie
        // console.log("pelicula agregada:", moviesCreated[0].title); // <-- Imprimir el titulo de la pelicula
        return moviesCreated;
    } catch (error) {
        console.error('Error al agregar las películas a la base de datos:', error);
        throw new Error('Error al agregar las películas a la base de datos');
    }
};

// Endpoint para crear la asociación
const createUserMovie = async (UserMovie, userId, movieId) => {
    try {
        await UserMovie.create({ userId, movieId });
        return { message: 'Asociación creada.' };
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear la asociación.');
    }
};

// Endpoint para eliminar la asociación
const deleteUserMovie = async (UserMovie, userId, movieId) => {
    try {
        await UserMovie.destroy({ where: { userId, movieId } });
        return { message: 'Asociación eliminada.' };
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar la asociación.');
    }
};

// Endpoint para saber si una pelicula está asociada al usuario
const getIsMovieAssociated = async (UserMovie, userId, movieId) => {
    try {
        const association = await UserMovie.findOne({ where: { userId, movieId } });
        return { isAssociated: !!association };
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las asociaciones.');
    }
};

module.exports = {
    getAllMovies,
    uploadMoviesToDatabase,
    createUserMovie,
    deleteUserMovie,
    getIsMovieAssociated
};
