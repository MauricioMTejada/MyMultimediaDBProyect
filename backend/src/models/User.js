// src/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    // ... (rest of your User model definition)
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // El nombre de usuario debe ser único
        validate: {
            len: [3, 50], // Longitud mínima de 3 y máxima de 50 caracteres
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // El correo electrónico debe ser único
        validate: {
            isEmail: true, // Validar que sea un formato de correo electrónico
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // No se define una longitud aquí, ya que se recomienda usar un hash
        // y la longitud dependerá del algoritmo de hash utilizado.
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50], // Longitud mínima de 2 y máxima de 50 caracteres
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50], // Longitud mínima de 2 y máxima de 50 caracteres
        }
    },
    profilePicture: {
        type: DataTypes.STRING, // Almacenar la URL de la imagen de perfil
        defaultValue: null, // Valor por defecto: null (sin imagen)
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Por defecto, el usuario no es administrador
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Por defecto, el usuario está activo
    },
    // Puedes agregar más campos según tus necesidades
}, {
    timestamps: true, // Activamos los timestamps (createdAt, updatedAt)
    // Puedes agregar más opciones según tus necesidades
});

// Método para comparar contraseñas
User.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Hash de la contraseña antes de guardar
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// Hash de la contraseña antes de actualizar
User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

module.exports = User;
