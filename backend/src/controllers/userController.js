// src/controllers/userController.js
const { db } = require('../config/database'); // Importar db
const { UserMovie, Movie } = require('../models/associations'); // Importar los modelos UserMovie y Movie

// Actualizar los datos de UserMovie
const updateUserMovie = async (req, res) => {
    const { id } = req.params;
    const { watched, note, recommendationSource } = req.body; // Agregar los nuevos campos
    try {
        const userMovie = await UserMovie.findByPk(id);
        if (!userMovie) {
            return res.status(404).json({ message: 'Asociación no encontrada' });
        }
        // Actualizar los campos recibidos
        await userMovie.update({
            watched,
            note,
            recommendationSource
        });
        res.json({ message: 'Datos actualizados correctamente', userMovie });
    } catch (error) {
        console.error('Error al actualizar los datos de UserMovie:', error);
        res.status(500).json({ message: 'Error al actualizar los datos de UserMovie' });
    }
};

const createUserMovie = async (req, res) => {
    const { movieId } = req.params;
    const userId = req.user.userId; // Obtener el userId del token
    try {
        // Buscar si ya existe un registro con userId y movieId
        const existingUserMovie = await UserMovie.findOne({ where: { userId, movieId } });

        if (existingUserMovie) {
            if (existingUserMovie.currentActive) {
                return res.status(409).json({ message: 'El registro ya existe y está activo' }); // 409 Conflict
            } else {
                // Reactivar el registro existente
                await existingUserMovie.update({ currentActive: true });
                return res.status(200).json({ message: 'El registro ya existe y se ha reactivado', userMovie: existingUserMovie }); // 200 OK
            }
        }

        // Crear un nuevo registro si no existe
        const userMovie = await UserMovie.create({ userId, movieId, currentActive: true });
        res.status(201).json({ message: 'El registro ha sido creado', userMovie });
    } catch (error) {
        console.error('createUserMovie - Error al crear la asociación:', error);
        res.status(500).json({ message: 'Error al crear la asociación', error: error.message });
    }
};

const deleteUserMovie = async (req, res) => {
    const movieId = parseInt(req.params.movieId, 10);
    const userId = req.user.userId; // Obtener el userId del token
    try {
        const userMovie = await UserMovie.findOne({ where: { userId, movieId } });
        if (!userMovie) {
            return res.status(404).json({ message: 'Asociación no encontrada' });
        }
        // Actualizar currentActive a false
        await userMovie.update({ currentActive: false });
        res.json({ message: 'Asociación desactivada correctamente' });
    } catch (error) {
        console.error('Error al desactivar la asociación:', error);
        res.status(500).json({ message: 'Error al desactivar la asociación' });
    }
};

const getUserMovies = async (req, res) => {
    const userId = req.user.userId; // Obtener el userId del token

    try {
        const userMovies = await UserMovie.findAll({
            where: {
                userId,
                currentActive: true // Agregar filtro para currentActive
            },
            include: [{
                model: Movie,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        const combinedData = userMovies.map(userMovie => {
            const movieData = userMovie.Movie.get({ plain: true });
            const userMovieData = userMovie.get({ plain: true });
            delete userMovieData.Movie;

            return {
                ...movieData,
                ...userMovieData,
            };
        });

        res.json(combinedData);
    } catch (error) {
        console.error('Error al obtener las películas asociadas al usuario:', error);
        res.status(500).json({ message: 'Error al obtener las películas asociadas al usuario' });
    }
};

module.exports = {
    getUserMovies,
    updateUserMovie,
    createUserMovie,
    deleteUserMovie,
};
