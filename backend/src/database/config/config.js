// src/database/config/config.js
require('../../config/env'); // Asegura que las variables de entorno estén cargadas

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    migrationStorage: 'json',
    migrationStoragePath: 'src/database/migrations-meta.json',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    migrationStorage: 'json',
    migrationStoragePath: 'src/database/migrations-meta.json',
  },
};

module.exports = config;
