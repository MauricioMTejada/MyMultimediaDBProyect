// src/controllers/movieController.js
const { Sequelize } = require('sequelize');
const Country = require('../models/Country');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const MovieGenre = require('../models/MovieGenre');

// Función para obtener todas las películas
const getAllMovies = async () => {
    try {
        const movies = await Movie.findAll({
            include: [{
                model: Country,
                attributes: ['name']
            }] // Incluye el modelo Country con el nombre del pais
        }); // Busca todas las películas en la base de datos
        return movies;
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        throw error; // Relanza el error para que se maneje en la ruta
    }
};

const uploadMoviesJson = async (req, res) => {
    const data = req.body; //recibimos un array de objetos

    try {
        if (!data || data.length === 0) {
            return res.status(400).send('No hay datos para cargar.');
        }

        for (const row of data) {
            const countryId = row.countryId;

            if (!countryId) {
              console.error(`No se ha especificado un pais en la pelicula: ${row.Título}`);
              continue; // si no tiene el id de un pais, seguir a la proxima pelicula.
            }

            const movie = await Movie.create({
                title: row.Título.replace(/"/g, '').trim(),
                originalTitle: row['Título original'].replace(/"/g, '').trim(),
                year: parseInt(row.Año),
                countryId: countryId, // Usar el countryId
                director: row.Dirección.replace(/"/g, '').trim(),
                cast: row.Reparto.replace(/"/g, '').trim(),
                companies: row.Compañías.replace(/"/g, '').trim(),
                genres: row.Género.trim(),
                synopsis: row.Sinopsis.replace(/"/g, '').trim(),
                image: row.Imagen.trim(),
            });

            const genreNames = row.Género.split(',').map(genre => genre.trim());
            for (const genreName of genreNames) {
                let genre = await Genre.findOne({ where: { name: genreName } });
                if (!genre) {
                    genre = await Genre.create({ name: genreName });
                    console.log(`Genero creado con id: ${genre.id}`);
                }
                await MovieGenre.create({ MovieId: movie.id, GenreId: genre.id });
            }
            console.log(`Película creada con ID: ${movie.id}`);
        }
        res.status(200).send('Datos cargados correctamente.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`Error al cargar los datos: ${error.message}`);
    }
};

module.exports = {
    uploadMoviesJson,
    getAllMovies // Agrega la exportación de la función
};
