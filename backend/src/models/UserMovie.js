// src/models/UserMovie.js
const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const Movie = require('./Movie');

const UserMovie = sequelize.define('UserMovie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    watched: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    watchedDate: {
        type: DataTypes.DATE,
    },
    rewatchedDate: {
        type: DataTypes.DATE,
    },
    type: { //tipo de visionado, puede ser cine, casa, o si es un documental o pelicula
        type: DataTypes.STRING,
    },
    note: {
        type: DataTypes.TEXT,
    },
    recommendationSource: {
        type: DataTypes.STRING,
    },
});

// Definir la relación: Una UserMovie pertenece a una Movie
UserMovie.belongsTo(Movie, { foreignKey: 'movieId' });
Movie.hasMany(UserMovie, { foreignKey: 'movieId' });

module.exports = UserMovie;
