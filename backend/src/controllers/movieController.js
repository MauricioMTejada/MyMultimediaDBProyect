// backend/src/controllers/movieController.js
const { Movie } = require('../database/models'); // Importar los modelos

const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll(); // Buscar todas las películas

        const moviesWithAssociation = await Promise.all(movies.map(async movie => {
            return {
                ...movie.get({ plain: true }),
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

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    uploadMoviesToDatabase,
};
