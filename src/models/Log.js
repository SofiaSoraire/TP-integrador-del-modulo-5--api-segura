const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  method: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  ip: String,
  userAgent: String,
  statusCode: Number,
  responseTime: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

logSchema.index({ timestamp: -1 });
logSchema.index({ userId: 1 });

module.exports = mongoose.model('Log', logSchema);