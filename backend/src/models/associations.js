// backend/src/models/associations.js
const { sequelize, db } = require('../config/database');
const Movie = require('./Movie');
const Country = require('./Country');
const Genre = require('./Genre');
const MovieGenre = require('./MovieGenre');
const UserMovie = require('./UserMovie');
const Ejemplo = require('./ejemplo');
const User = require('./User');

// Agregar los modelos a db
db.Movie = Movie;
db.Country = Country;
db.Genre = Genre;
db.MovieGenre = MovieGenre;
db.UserMovie = UserMovie;
db.Ejemplo = Ejemplo;
db.User = User;

// Definir las asociaciones
User.belongsToMany(Movie, { through: UserMovie, foreignKey: 'userId' });
Movie.belongsToMany(User, { through: UserMovie, foreignKey: 'movieId' });

Movie.belongsToMany(Genre, { through: MovieGenre, foreignKey: 'movieId' });
Genre.belongsToMany(Movie, { through: MovieGenre, foreignKey: 'genreId' });

Movie.belongsTo(Country, { foreignKey: 'countryId' });
Country.hasMany(Movie, { foreignKey: 'countryId' });

// Nuevas relaciones
UserMovie.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
UserMovie.belongsTo(Movie, { foreignKey: 'movieId', targetKey: 'id' });

module.exports = {
    sequelize,
    db,
    Movie,
    Country,
    Genre,
    MovieGenre,
    UserMovie,
    Ejemplo,
    User,
};
