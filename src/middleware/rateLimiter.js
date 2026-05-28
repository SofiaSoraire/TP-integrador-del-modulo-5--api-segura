const User = require('../models/User');

const userRateLimiter = async (req, res, next) => {
  try {
    const userId = req.userId;
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.rateLimit.resetTime < oneHourAgo) {
      user.rateLimit.count = 0;
      user.rateLimit.resetTime = now;
    }

    if (user.rateLimit.count >= 100) {
      return res.status(429).json({ 
        error: 'Demasiadas solicitudes',
        message: 'Has excedido el límite de 100 solicitudes por hora'
      });
    }

    user.rateLimit.count += 1;
    await user.save();

    next();
  } catch (error) {
    console.error('Error en rate limiter:', error);
    next();
  }
};

module.exports = userRateLimiter; 