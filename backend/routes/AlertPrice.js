const express = require('express');
const Alert = require('../models/Alert'); // Assuming models are in ../models directory
const router = express.Router();

// Endpoint to create an alert
router.post('/create-alert', async (req, res) => {
  try {
    const { userEmail, cryptoId, targetPrice, condition } = req.body;

    if (!userEmail || !cryptoId || !targetPrice || !condition) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate condition
    if (!['<=', '>='].includes(condition)) {
      return res.status(400).json({ error: 'Condition must be either <= or >=' });
    }

    const alert = new Alert({ userEmail, cryptoId, targetPrice, condition });
    await alert.save();

    res.status(201).json({ message: 'Alert created successfully.' });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ error: 'Failed to create alert.' });
  }
});

// Endpoint to fetch alerts for a specific user
router.get('/alerts/:userEmail', async (req, res) => {
  try {
    const { userEmail } = req.params;
    const alerts = await Alert.find({ userEmail });

    if (!alerts.length) {
      return res.status(404).json({ message: 'No alerts found for this user.' });
    }

    res.status(200).json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: 'Failed to fetch alerts.' });
  }
});

module.exports = router;
