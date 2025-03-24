// backend/scripts/checkConnection.js

// Importar Sequelize y las variables de entorno
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la base de datos
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
});

// Función para verificar la conexión
async function checkConnection() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    } finally {
        await sequelize.close(); // Cerrar la conexión
    }
}

// Ejecutar la función
checkConnection();
