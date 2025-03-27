// backend/src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/associations'); // Importar User desde associations

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

        res.json({ token, userId: user.id });
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

        res.status(201).json({ message: 'Usuario registrado correctamente', userId: newUser.id });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { login, register };
