// src/controllers/countryController.js
const Country = require('../models/Country');
const { Sequelize } = require('sequelize');

const getRandomCountries = async (req, res) => {
    try {
        // Obtener todos los paises
        const allCountries = await Country.findAll();

        // Si no hay paises, retornar error
        if(allCountries.length == 0){
            return res.status(404).json({ message: 'No hay paises en la base de datos.' });
        }

        // Determinar cuantos paises seleccionar (maximo 10)
        const numberOfCountriesToSelect = Math.min(10, allCountries.length);

        // Array para guardar los paises seleccionados
        const randomCountries = [];

        // Obtener indices aleatorios de los paises a seleccionar
        const randomIndexes = new Set();
        while (randomIndexes.size < numberOfCountriesToSelect) {
            randomIndexes.add(Math.floor(Math.random() * allCountries.length));
        }

        // Agregar a randomCountries los paises de los indices seleccionados
        randomIndexes.forEach(index => {
            randomCountries.push(allCountries[index]);
        });

        res.json(randomCountries); // Devolver los países aleatorios como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los paises aleatorios' });
    }
};

const getAllCountries = async (req, res) => { // Nuevo controlador
    try {
        const countries = await Country.findAll({
            attributes: ['id', 'name'], // Solo necesitamos el ID y el nombre
            order: [['name', 'ASC']] //Orden ascendente por nombre.
        });
        res.json(countries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los países' });
    }
};

module.exports = {
    getRandomCountries,
    getAllCountries // Agregar el nuevo controlador a la exportación
};
