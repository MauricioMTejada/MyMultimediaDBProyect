// src/models/MovieGenre.js
module.exports = (sequelize, DataTypes) => {
  const MovieGenre = sequelize.define(
    "MovieGenre",
    {},
    {
      timestamps: false, // Desactivar timestamps
    }
  );

  return MovieGenre;
};
