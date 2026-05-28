const express = require('express');
const authMiddleware = require('../middleware/auth');
const userRateLimiter = require('../middleware/rateLimiter');
const { getProfile, getLogs } = require('../controllers/protectedController');

const router = express.Router();

router.use(authMiddleware);
router.use(userRateLimiter);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 */
router.get('/profile', getProfile);

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Obtener logs del usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de logs
 */
router.get('/logs', getLogs);

module.exports = router;