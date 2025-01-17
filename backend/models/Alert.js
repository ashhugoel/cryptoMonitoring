const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // User's Gmail address
  cryptoId: { type: String, required: true }, // e.g., 'bitcoin'
  targetPrice: { type: Number, required: true }, // Alert price
  condition: { 
    type: String, 
    required: true, 
    enum: ['<=', '>='], // Allowed conditions (less than or equal, greater than or equal)
  }, 
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Alert', alertSchema);
