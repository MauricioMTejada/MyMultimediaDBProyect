'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
require('dotenv').config(); // Cargar variables de entorno desde .env
const basename = path.basename(__filename);
const db = {};

// Configurar Sequelize usando variables de entorno
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false, // Desactiva el logging de Sequelize
});

// Leer todos los modelos en la carpeta actual (excepto index.js)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configurar asociaciones entre modelos si existen
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Definir las asociaciones directamente en index.js
db.User.belongsToMany(db.Movie, { through: db.UserMovie, foreignKey: 'userId' });
db.Movie.belongsToMany(db.User, { through: db.UserMovie, foreignKey: 'movieId' });

db.Movie.belongsToMany(db.Genre, { through: db.MovieGenre, foreignKey: 'movieId' });
db.Genre.belongsToMany(db.Movie, { through: db.MovieGenre, foreignKey: 'genreId' });

db.Movie.belongsTo(db.Country, { foreignKey: 'countryId' });
db.Country.hasMany(db.Movie, { foreignKey: 'countryId' });

db.UserMovie.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
db.UserMovie.belongsTo(db.Movie, { foreignKey: 'movieId', targetKey: 'id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
