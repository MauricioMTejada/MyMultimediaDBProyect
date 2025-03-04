// src/models/MovieGenre.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Genre = require('./Genre');
const Movie = require('./Movie');

const MovieGenre = sequelize.define('MovieGenre', {}, { timestamps: false });

Movie.belongsToMany(Genre, { through: MovieGenre });
Genre.belongsToMany(Movie, { through: MovieGenre });

module.exports = MovieGenre;
