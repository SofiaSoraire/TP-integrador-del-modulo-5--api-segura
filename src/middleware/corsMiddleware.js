const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://tu-dominio.com'
];

const blacklist = ['google.com', 'facebook.com'];

const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin && blacklist.some(blocked => origin.includes(blocked))) {
    return res.status(403).json({ 
      error: 'Acceso denegado',
      message: 'Este dominio está bloqueado'
    });
  }
  
  if (origin && whitelist.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
  } else if (origin && !whitelist.includes(origin)) {
    return res.status(403).json({ 
      error: 'Acceso denegado',
      message: 'Origen no autorizado'
    });
  }
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
};

module.exports = corsMiddleware;