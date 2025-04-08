// src/models/Country.js
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    "Country",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      flag: { type: DataTypes.STRING },
    },
    {
      timestamps: false, // Desactivar timestamps
    }
  );

  // Configurar las asociaciones
  Country.associate = (models) => {
    Country.hasMany(models.Movie, { foreignKey: "countryId" });
  };

  return Country;
};
