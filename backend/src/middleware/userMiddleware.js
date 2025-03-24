// src/middleware/userMiddleware.js
const { db } = require('../config/database'); // Importar db
const userController = require('../controllers/userController');

const getUserMoviesMiddleware = async (req, res) => {
    const { userId } = req.params;
    try {
        const movieIds = await userController.getUserMovies(db.UserMovie, userId);
        res.status(200).json(movieIds);
    } catch (error) {
        console.error('Error en getUserMoviesMiddleware:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUserMoviesMiddleware
};
