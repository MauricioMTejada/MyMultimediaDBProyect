// src/models/associations.js
const User = require('./User');
const UserMovie = require('./UserMovie');
const Movie = require('./Movie');

// User - UserMovie associations
User.hasMany(UserMovie, { foreignKey: 'userId' });
UserMovie.belongsTo(User, { foreignKey: 'userId' });

// Movie - UserMovie associations
UserMovie.belongsTo(Movie, { foreignKey: 'movieId' });
Movie.hasMany(UserMovie, { foreignKey: 'movieId' });
