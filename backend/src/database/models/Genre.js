// src/models/Genre.js
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "Genre",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false, // Desactivar timestamps
    }
  );

  // Configurar las asociaciones
  Genre.associate = (models) => {
    Genre.belongsToMany(models.Movie, { through: models.MovieGenre, foreignKey: "genreId" });
  };

  return Genre;
};
