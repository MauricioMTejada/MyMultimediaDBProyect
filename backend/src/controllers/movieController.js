// src/controllers/movieController.js
const { db } = require('../config/database'); // Importar db

const fs = require('fs');
const path = require('path');

const getAllMovies = async (req, res, Movie) => { // Recibir Movie como parametro
    try {
        const movies = await Movie.findAll(); // Utilizar el modelo Movie recibido como parámetro
        // console.log("getAllMovies - las peliculas obtenidas son", movies); //agregar log
        res.json(movies);
    } catch (error) {
        console.error('Error al obtener las películas:', error);
        res.status(500).json({ error: 'Error al obtener las películas' });
    }
};

const uploadMoviesToDatabase = async (req, res) => {
    try {
        const jsonData = req.jsonData;
        // Insertar los datos en la base de datos
        await db.Movie.bulkCreate(jsonData); //utilizar db.Movie

        res.status(201).json({ message: 'Películas agregadas a la base de datos correctamente' });
    } catch (error) {
        console.error('Error al agregar las películas a la base de datos:', error);
        res.status(500).json({ error: 'Error al agregar las películas a la base de datos' });
    }
};

module.exports = {
    getAllMovies,
    uploadMoviesToDatabase
};
