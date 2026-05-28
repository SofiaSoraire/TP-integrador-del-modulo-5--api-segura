const Log = require('../models/Log');

const loggerMiddleware = async (req, res, next) => {
  const excludedPaths = ['/api/auth/login', '/api/auth/register'];
  
  if (excludedPaths.includes(req.path)) {
    return next();
  }

  const start = Date.now();

  const originalSend = res.send;
  res.send = function(data) {
    const responseTime = Date.now() - start;
    
    const logData = {
      userId: req.userId,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      statusCode: res.statusCode,
      responseTime: responseTime,
      timestamp: new Date()
    };
    
    Log.create(logData).catch(err => console.error('Error guardando log:', err));
    
    originalSend.call(this, data);
  };

  next();
};

module.exports = loggerMiddleware;