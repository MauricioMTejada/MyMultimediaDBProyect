// backend/src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models'); // Importar User desde index.js en database/models

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar al usuario por nombre de usuario
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Comparar la contraseña hasheada
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Crear el token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userId: user.id }); // Devolvemos el token y el userId
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

const register = async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        // Verificar si el email ya existe
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: 'El email ya está en uso' });
        }

        // Crear el nuevo usuario
        const newUser = await User.create({
            username,
            email,
            password,
            firstName,
            lastName,
        });

        // Crear el token JWT
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Usuario registrado correctamente', token, userId: newUser.id }); // Devolvemos el token y el userId
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Función para verificar el estado del login
const check = (req, res) => {
    // Si llegamos aquí, el token es válido
    res.json({ userId: req.user.userId, token: req.headers['authorization'].split(' ')[1] }); // Devolvemos el userId del usuario y el token
};

module.exports = { login, register, check };
