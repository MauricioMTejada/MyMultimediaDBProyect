// backend/src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log('Middleware - Authorization Header:', authHeader); // Verificar el encabezado
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (token == null) {
        // console.log("No hay token");
        return res.status(401).json({ message: 'No autorizado' }); // Si no hay token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Error al verificar el token:", err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Token expirado' });
            } else {
                return res.status(403).json({ message: 'Token inválido' });
            }
        }
        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };
