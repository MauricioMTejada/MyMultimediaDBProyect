// backend/src/middleware/countryMiddleware.js
const { Country } = require('../database/models'); //importar db
const countryController = require('../controllers/countryController');

const getRandomCountriesMiddleware = async (req, res) => {
    try {
        // Obtener todos los paises
        const allCountries = await Country.findAll(); //Utilizar el modelo desde db

        // Si no hay paises, retornar error
        if (allCountries.length === 0) {
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

        // Agregar los paises seleccionados a la req. para usar en el controller.
        req.randomCountries = randomCountries;

        // Llamar al controlador y pasarle req,res y el modelo
        countryController.getRandomCountries(req, res, Country); //pasar db.Country
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los paises aleatorios' });
    }
};

const getAllCountriesMiddleware = async (req, res) => {
    try {
        // Obtener todos los paises
        const allCountries = await Country.findAll({ //utilizar el modelo desde db
            attributes: ['id', 'name'], // Solo necesitamos el ID y el nombre
            order: [['name', 'ASC']] //Orden ascendente por nombre.
        });
        // Si no hay paises, retornar error
        if (allCountries.length === 0) {
            return res.status(404).json({ message: 'No hay paises en la base de datos.' });
        }
        // Agregar los paises seleccionados a la req. para usar en el controller.
        req.allCountries = allCountries;
        // Llamar al controlador y pasarle req,res y el modelo.
        countryController.getAllCountries(req, res, Country); //pasar db.Country
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener todos los paises.' });
    }
}

module.exports = {
    getRandomCountriesMiddleware,
    getAllCountriesMiddleware,
};
