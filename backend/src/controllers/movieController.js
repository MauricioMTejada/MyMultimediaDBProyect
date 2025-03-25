// src/controllers/movieController.js
const getAllMovies = async (Movie) => {
    try {
        const movies = await Movie.findAll();
        return movies;
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        throw new Error('Error al obtener las películas');
    }
};

const uploadMoviesToDatabase = async (Movie, moviesData) => {
    try {
        const moviesCreated = await Movie.bulkCreate(moviesData);
        return moviesCreated;
    } catch (error) {
        console.error('Error al subir las películas a la base de datos:', error);
        throw new Error('Error al subir las películas a la base de datos');
    }
};

const createUserMovie = async (UserMovie, userId, movieId) => {
    try {
        const userMovie = await UserMovie.create({ userId, movieId });
        return { message: 'Asociación creada correctamente', userMovie };
    } catch (error) {
        console.error('Error al crear la asociación:', error);
        throw new Error('Error al crear la asociación');
    }
};

const deleteUserMovie = async (UserMovie, userId, movieId) => {
    try {
        const userMovie = await UserMovie.findOne({ where: { userId, movieId } });
        if (!userMovie) {
            throw new Error('Asociación no encontrada');
        }
        await userMovie.destroy();
        return { message: 'Asociación eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la asociación:', error);
        throw new Error('Error al eliminar la asociación');
    }
};

const getIsMovieAssociated = async (UserMovie, userId, movieId) => {
    try {
        const userMovie = await UserMovie.findOne({ where: { userId, movieId } });
        return { isAssociated: !!userMovie };
    } catch (error) {
        console.error('Error al comprobar la asociación:', error);
        throw new Error('Error al comprobar la asociación');
    }
};

const getUserMovies = async (UserMovie, userId) => {
    try {
        const userMovies = await UserMovie.findAll({
            where: { userId },
            attributes: ['movieId'],
        });
        return userMovies.map(userMovie => userMovie.movieId);
    } catch (error) {
        console.error('Error al obtener las películas del usuario:', error);
        throw new Error('Error al obtener las películas del usuario');
    }
};

module.exports = {
    getAllMovies,
    uploadMoviesToDatabase,
    createUserMovie,
    deleteUserMovie,
    getIsMovieAssociated,
    getUserMovies
};
