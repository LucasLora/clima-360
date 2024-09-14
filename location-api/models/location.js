const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  temperature: Number,
  description: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', locationSchema);
