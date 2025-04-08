'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cambiar el tipo de dato de 'director' a TEXT
    await queryInterface.changeColumn('Movies', 'director', {
      type: Sequelize.TEXT,
      allowNull: true, // Ajusta esto según tus necesidades
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir el cambio de tipo de dato a STRING
    await queryInterface.changeColumn('Movies', 'director', {
      type: Sequelize.STRING,
      allowNull: true, // Ajusta esto según tus necesidades
    });
  }
};
