// src/index.js
require('./config/env'); // Carga dinámica de variables de entorno
const app = require('./app');
const { sequelize } = require('./database/models'); // Importa la instancia de Sequelize

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // 1. Conexión a la base de datos
    await sequelize.authenticate();
    console.log('🔗 Conexión a la base de datos establecida con éxito.');

    // 2. Sincronización de modelos solo en entorno de desarrollo
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true }); // Crea o actualiza tablas sin perder datos
      console.log('📦 Base de datos sincronizada (modo desarrollo).');
    }

    // 3. Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1); // Termina el proceso si hay error
  }
}

startServer();
