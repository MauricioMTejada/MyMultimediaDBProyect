// src/controllers/ejemploController.js
const { db } = require('../config/database');
const { Ejemplo } = db; //importar el modelo desde db

const getAllEjemplos = async (req, res) => {
    try {
        const ejemplos = await Ejemplo.findAll();
        res.json(ejemplos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los ejemplos' });
    }
};

module.exports = {
    getAllEjemplos
};
