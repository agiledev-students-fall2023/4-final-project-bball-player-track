const mongoose = require('mongoose');

const playerStatSchema = new mongoose.Schema({
  fullName: String,
  ppg: Number,
  apg: Number,
  rpg: Number,
  spg: Number,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlayerStat', playerStatSchema);