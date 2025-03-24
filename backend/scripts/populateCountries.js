// populateCountries.js

//------------------------------------------------------------------------------------------------//
// éste script se encarga de poblar la tabla Country con los datos de los paísesses de la API     //
//------------------------------------------------------------------------------------------------//

const axios = require('axios');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const Country = require('../src/models/Country'); // Importar el modelo Country
const { sequelize } = require('../src/config/database'); // Importar la instancia de sequelize


async function populateCountries() {
    try {
        // 1. Conectarse a la base de datos
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        // 2. Obtener todos los países de la API
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;

        // 3. Mapear y formatear los datos
        const countriesData = countries.map(country => ({
            name: country.translations.spa?.official || country.name.official, // Nombre oficial en español o Ingles
            flag: country.flags.png, // URL de la bandera
        }));

        // 4. Insertar los datos en la tabla Country
        await Country.bulkCreate(countriesData); //bulkCreate sirve para hacer un insert masivo.

        console.log('Tabla Country poblada con éxito.');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // 5. Cerrar la conexión
        await sequelize.close();
        console.log('Conexión a la base de datos cerrada.');
    }
}

populateCountries();
