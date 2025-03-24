// src/models/UserMovie.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
// const Movie = require('./Movie'); // Remove this line
// const User = require('./User'); // Remove this line

const UserMovie = sequelize.define('UserMovie', {
    // ... (rest of your UserMovie model definition)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    watched: {
        type: DataTypes.ENUM('Si', 'No', 'Viendo'),
        defaultValue: 'No',
        allowNull: false,
    },
    watchedDate: {
        type: DataTypes.DATE,
    },
    rewatchedDate: {
        type: DataTypes.ARRAY(DataTypes.DATE),
        defaultValue: [],
    },
    type: {
        type: DataTypes.ENUM('Película', 'Serie', 'Documental'), //valores permitidos
        defaultValue: 'Película', //valor por defecto
        allowNull: false, // no puede ser nulo
    },
    note: {
        type: DataTypes.TEXT,
    },
    recommendationSource: {
        type: DataTypes.STRING,
    },
    selectOriginalTitle: { //nuevo campo
        type: DataTypes.BOOLEAN,
        defaultValue: true, //valor por defecto
        allowNull: false //no puede ser nulo
    },
}, {
    timestamps: false,
});

// Remove the association definitions from here
// UserMovie.belongsTo(Movie, { foreignKey: 'movieId' });
// Movie.hasMany(UserMovie, { foreignKey: 'movieId' });
// UserMovie.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(UserMovie, { foreignKey: 'userId' });

module.exports = UserMovie;
