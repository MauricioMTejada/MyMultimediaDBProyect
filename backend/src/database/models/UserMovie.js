// src/models/UserMovie.js
module.exports = (sequelize, DataTypes) => {
  const UserMovie = sequelize.define(
    "UserMovie",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User", // Nombre del modelo
          key: "id",
        },
      },
      movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Movie", // Nombre del modelo
          key: "id",
        },
      },
      watched: {
        type: DataTypes.ENUM("Si", "No", "Viendo"),
        defaultValue: "No",
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
        type: DataTypes.ENUM("Película", "Serie", "Documental"),
        defaultValue: "Película",
        allowNull: false,
      },
      note: {
        type: DataTypes.TEXT,
      },
      recommendationSource: {
        type: DataTypes.STRING,
      },
      selectOriginalTitle: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      currentActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return UserMovie;
};
