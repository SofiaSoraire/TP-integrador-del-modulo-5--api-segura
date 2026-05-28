const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password -rateLimit');
    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo perfil' });
  }
};

const getLogs = async (req, res) => {
  try {
    const Log = require('../models/Log');
    const logs = await Log.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(50);
    
    res.json({
      success: true,
      logs
    });
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo logs' });
  }
};

module.exports = {
  getProfile,
  getLogs
};