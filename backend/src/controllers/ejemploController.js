// src/controllers/ejemploController.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Ejemplo = sequelize.define('Ejemplo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

const getEjemplos = async (req, res) => {
    try {
        const ejemplos = await Ejemplo.findAll();
        res.json(ejemplos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener ejemplos' });
    }
};

const createEjemplo = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevoEjemplo = await Ejemplo.create({ nombre, descripcion });
        res.status(201).json(nuevoEjemplo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear un ejemplo' });
    }
}

module.exports = {
  getEjemplos,
  createEjemplo
};
