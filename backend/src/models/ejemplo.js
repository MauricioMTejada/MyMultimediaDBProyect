// src/models/ejemplo.js
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
        type: DataTypes.TEXT,
    },
    // Añade más campos según tus necesidades
}, {
    tableName: 'ejemplos', // Puedes especificar el nombre de la tabla
    timestamps: true, // Añade campos createdAt y updatedAt
});

module.exports = Ejemplo;
