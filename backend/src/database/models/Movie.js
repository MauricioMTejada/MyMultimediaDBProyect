// src/models/Movie.js
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define(
    "Movie",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      originalTitle: { type: DataTypes.STRING },
      otherTitles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      year: { type: DataTypes.INTEGER },
      director: { type: DataTypes.TEXT },
      cast: { type: DataTypes.TEXT },
      companies: { type: DataTypes.TEXT },
      genres: { type: DataTypes.TEXT },
      synopsis: { type: DataTypes.TEXT },
      image: { type: DataTypes.STRING },
    },
    {
      timestamps: false, // Desactivar timestamps
    }
  );

  // Configurar las asociaciones
  Movie.associate = (models) => {
    Movie.belongsTo(models.Country, { foreignKey: "countryId" });
    models.Country.hasMany(Movie, { foreignKey: "countryId" });
  };

  return Movie;
};
