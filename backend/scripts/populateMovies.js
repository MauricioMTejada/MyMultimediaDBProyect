// populateMovies.js
const csv = require('csv-parser');
const fs = require('fs');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const Country = require('./src/models/Country'); // Importa el modelo Country
const Movie = require('./src/models/Movie'); // Importa el modelo Movie
const Genre = require('./src/models/Genre'); // Importa el modelo Genre
const MovieGenre = require('./src/models/MovieGenre');
const sequelize = require('./src/config/database');

async function populateMovies() {
    try {
        // 1. Conectarse a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        //2. Leer el archivo csv
        const results = [];
        fs.createReadStream('movies.csv') // Nombre del archivo csv
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                console.log('CSV file successfully processed');
                //3. procesar los datos del csv
                for (const row of results) {
                  //4. buscar pais
                    const country = await Country.findOne({ where: { name: row.País } });
                    if (country) {
                      //5. crear pelicula
                        const movie = await Movie.create({
                            title: row.Título,
                            originalTitle: row['Título original'],
                            year: parseInt(row.Año),
                            countryId: country.id,
                            director: row.Dirección,
                            cast: row.Reparto,
                            companies: row.Compañías,
                            genres: row.Género,
                            synopsis: row.Sinopsis,
                            image: row.Imagen,
                        });
                        //imprimir pk de la pelicula creada
                        console.log(`Película creada con ID: ${movie.id}`); // <-- Imprimir el ID

                        //6. agregar generos
                        const genres = row.Género.split(',').map(genre => genre.trim());
                            for (const genreName of genres) {
                                let genre = await Genre.findOne({ where: { name: genreName } });
                                if (!genre) {
                                    genre = await Genre.create({ name: genreName });
                                    console.log(`Genero creado con id: ${genre.id}`);
                                }
                                await MovieGenre.create({ MovieId: movie.id, GenreId: genre.id });
                            }
                    } else {
                        console.error(`País no encontrado: ${row.País}`);
                    }
                }
                console.log('Tabla Movies poblada con éxito.');
                await sequelize.close();
                console.log('Conexión a la base de datos cerrada.');
            });
    } catch (error) {
        console.error('Error:', error);
    }
}

populateMovies();
