const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  name: String,
  tip: { type: String, required: true },
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Tip', tipSchema);
