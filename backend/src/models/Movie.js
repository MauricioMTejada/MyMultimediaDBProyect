// src/models/Movie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Country = require('./Country');
const Genre = require('./Genre');

const Movie = sequelize.define('Movie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    originalTitle: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    director: { type: DataTypes.STRING },
    cast: { type: DataTypes.TEXT },
    companies: { type: DataTypes.TEXT },
    genres: { type: DataTypes.TEXT },
    synopsis: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING },
}, {
    timestamps: false, //desactivar timestamps
});
 Movie.belongsTo(Country, { foreignKey: 'countryId' });
 Country.hasMany(Movie, { foreignKey: 'countryId' });



module.exports = Movie;
