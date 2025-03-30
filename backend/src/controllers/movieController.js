// backend/src/controllers/movieController.js
const { Movie, UserMovie } = require('../models/associations'); // Importar los modelos

const getAllMovies = async (req, res) => {
    const userId = req.query.userId; // Obtener el userId de la query
    try {
        const movies = await Movie.findAll(); // Buscar todas las películas

        const moviesWithAssociation = await Promise.all(movies.map(async movie => {
            const isAssociated = userId ? await UserMovie.findOne({ where: { userId, movieId: movie.id } }) : false;
            return {
                ...movie.get({ plain: true }),
                isAssociated: !!isAssociated
            };
        }));

        res.json(moviesWithAssociation); // Enviar las películas con la información de asociación
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).json({ message: 'Error al obtener las películas' });
    }
};

const getMovieById = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }
        res.json(movie);
    } catch (error) {
        console.error('Error al obtener la película por ID:', error);
        res.status(500).json({ message: 'Error al obtener la película por ID' });
    }
};

const createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        console.error('Error al crear la película:', error);
        res.status(500).json({ message: 'Error al crear la película' });
    }
};

const updateMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }
        await movie.update(req.body);
        res.json(movie);
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        res.status(500).json({ message: 'Error al actualizar la película' });
    }
};

const deleteMovie = async (req, res) => {
    const { movieId } = req.params;
    try {
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }
        await movie.destroy();
        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).json({ message: 'Error al eliminar la película' });
    }
};

const uploadMoviesToDatabase = async (req, res) => {
    try {
        const moviesToCreate = req.body; // Los datos ya están mapeados por el middleware
        // console.log("Datos recibidos en uploadMoviesToDatabase antes de bulkCreate:", moviesToCreate); // Agregamos el console.log aquí
        const moviesCreated = await Movie.bulkCreate(moviesToCreate);
        res.status(201).json(moviesCreated);
    } catch (error) {
        console.error('Error al subir las películas a la base de datos:', error);
        res.status(500).json({ message: 'Error al subir las películas a la base de datos' });
    }
};

const createUserMovie = async (req, res) => {
    const { userId, movieId } = req.params;
    // console.log('createUserMovie - userId:', userId, 'movieId:', movieId); // Loguear userId y movieId
    try {
        const userMovie = await UserMovie.create({ userId, movieId });
        // console.log('createUserMovie - Asociación creada:', userMovie); // Loguear la asociación creada
        res.status(201).json({ message: 'Asociación creada correctamente', userMovie });
    } catch (error) {
        console.error('createUserMovie - Error al crear la asociación:', error); // Loguear el error
        res.status(500).json({ message: 'Error al crear la asociación', error: error.message }); // Enviar el mensaje de error
    }
};

const deleteUserMovie = async (req, res) => {
    const { userId, movieId } = req.params;
    try {
        const userMovie = await UserMovie.findOne({ where: { userId, movieId } });
        if (!userMovie) {
            return res.status(404).json({ message: 'Asociación no encontrada' });
        }
        await userMovie.destroy();
        res.json({ message: 'Asociación eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la asociación:', error);
        res.status(500).json({ message: 'Error al eliminar la asociación' });
    }
};

const getIsMovieAssociated = async (req, res) => {
    const { userId, movieId } = req.params;
    try {
        const userMovie = await UserMovie.findOne({ where: { userId, movieId } });
        res.json({ isAssociated: !!userMovie });
    } catch (error) {
        console.error('Error al comprobar la asociación:', error);
        res.status(500).json({ message: 'Error al comprobar la asociación' });
    }
};

const getUserMovies = async (req, res) => {
    const { userId } = req.params;
    try {
        const userMovies = await UserMovie.findAll({
            where: { userId },
            include: [{
                model: Movie,
                attributes: { exclude: ['createdAt', 'updatedAt'] } // Excluir atributos innecesarios
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] } // Excluir atributos innecesarios
        });

        const combinedData = userMovies.map(userMovie => {
            const movieData = userMovie.Movie.get({ plain: true }); // Obtener los datos de la película como un objeto plano
            const userMovieData = userMovie.get({ plain: true }); // Obtener los datos de UserMovie como un objeto plano
            return {
                ...movieData, // Usar los datos planos de la película
                ...userMovieData, // Usar los datos planos de UserMovie
            };
        });

        res.json(combinedData);
    } catch (error) {
        console.error('Error al obtener las películas asociadas al usuario:', error);
        res.status(500).json({ message: 'Error al obtener las películas asociadas al usuario' });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    uploadMoviesToDatabase,
    createUserMovie,
    deleteUserMovie,
    getIsMovieAssociated,
    getUserMovies
};
