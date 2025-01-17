const express = require('express');
const MarketPrice = require('../models/MarketPrice'); // Assuming models are in ../models directory
const router = express.Router();

// Endpoint to save crypto data
router.post('/save-crypto', async (req, res) => {
  try {
    const cryptoData = req.body; // Assuming crypto data is sent in the request body
    await MarketPrice.deleteMany(); // Clear existing data
    await MarketPrice.insertMany(cryptoData);
    res.status(201).json({ message: 'Crypto data saved successfully.' });
  } catch (error) {
    console.error('Error saving crypto data:', error);
    res.status(500).json({ error: 'Failed to save crypto data.' });
  }
});

// Endpoint to get crypto data
router.get('/get-crypto', async (req, res) => {
  try {
    // Fetch all crypto data from the MarketPrice collection
    const data = await MarketPrice.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({ error: 'Error fetching crypto data' });
  }
});

module.exports = router;
