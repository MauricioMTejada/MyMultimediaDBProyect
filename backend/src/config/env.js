const path = require('path');
const dotenv = require('dotenv');

// Detectar el entorno: development (por defecto) o production
const env = process.env.NODE_ENV || 'development';

// Determinar el nombre del archivo .env
const envPath = path.resolve(__dirname, `../../.env.${env}`);

// Cargar el archivo correspondiente
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(`❌ No se pudo cargar el archivo ${envPath}`);
} else {
  console.log(`✅ Variables de entorno cargadas desde ${envPath}`);
}