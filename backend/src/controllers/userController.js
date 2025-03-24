// src/controllers/userController.js
const { db } = require('../config/database'); // Importar db

// Endpoint para obtener las películas asociadas a un usuario
const getUserMovies = async (UserMovie, userId) => {
    try {
        const userMovies = await UserMovie.findAll({
            where: { userId },
            attributes: ['movieId'], // Solo necesitamos los movieIds
        });
        const movieIds = userMovies.map(userMovie => userMovie.movieId);
        return movieIds;
    } catch (error) {
        console.error(error);
        throw new Error('Error al obtener las películas asociadas al usuario.');
    }
};

module.exports = {
    getUserMovies
};
