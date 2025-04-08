// src/controllers/countryController.js

const getRandomCountries = (req, res, Country) => { //Recibir Country como parametro
    try {
        // Acceder a los paises que envió el middleware
        const randomCountries = req.randomCountries;

        res.json(randomCountries); // Devolver los países aleatorios como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los paises aleatorios' });
    }
};

const getAllCountries = (req, res, Country) => { // Recibir Country como parametro
    try {
        // Acceder a todos los paises que envio el middleware.
        const allCountries = req.allCountries;
        res.json(allCountries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los países' });
    }
};

module.exports = {
    getRandomCountries,
    getAllCountries
};
