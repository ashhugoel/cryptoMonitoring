const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  symbol: String,
  image: String,
  current_price: Number,
  market_cap: Number,
  market_cap_rank: Number,
  total_volume: Number,
  high_24h: Number,
  low_24h: Number,
  price_change_percentage_24h: Number,
  last_updated: Date,
}, { timestamps: true });

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
