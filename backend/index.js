const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MarketPrice = require('./models/MarketPrice.js'); // Assuming models are in ../models directory
const Alert = require('./models/Alert.js'); // Assuming models are in ../models directory
const marketPriceRouter = require('./routes/MarketPrice'); // Import the routes for market prices
const alertRouter = require('./routes/AlertPrice'); // Import the routes for alerts
const sendEmail= require('./mailer.js')

const app = express();
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// MongoDB Connection
mongoose.connect('mongodb+srv://temp:hhKW1dRnMdekiwM5@cluster0.n545xqu.mongodb.net/cryptoAlertDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Function to check alerts every second
const checkAlerts = async () => {
  try {
    // Step 1: Fetch the latest market price for all cryptocurrencies
    const marketPrices = await MarketPrice.find();
    console.log(marketPrices.length)

    if (!marketPrices.length) {
      console.log('No market price data found.');
      return;
    }
    // console.log(marketPrices)

    // Step 2: Fetch all alerts
    const alerts = await Alert.find();


    if (!alerts.length) {
      console.log('No alerts found.');
      return;
    }

    // Step 3: Compare the current market prices with the alert target prices
    alerts.forEach(async alert => {
    
  
      const marketPrice = marketPrices.find(price => price.id === alert.cryptoId);

      if (marketPrice) {
        // Step 4: Check the alert condition (<= or >=)

        switch (alert.condition) {
          case '<=':
            if (marketPrice.current_price <= alert.targetPrice) {
              console.log(marketPrice.current_price, alert.targetPrice);
              
              sendEmail(alert.userEmail ,`Alert Triggered for ${alert.cryptoId} (Target Price: ₹${alert.targetPrice})` )

              await Alert.deleteOne({ _id: alert._id });
              console.log(`Alert for ${alert.cryptoId} deleted after triggering.`);

              // Here you can send an email or a notification instead of just logging
            }
            break;

          case '>=':
            if (marketPrice.current_price >= alert.targetPrice) {
              console.log(marketPrice.current_price, alert.targetPrice);

              sendEmail(alert.userEmail ,`Alert Triggered for ${alert.cryptoId} (Target Price: ₹${alert.targetPrice})` )
              await Alert.deleteOne({ _id: alert._id });
              console.log(`Alert for ${alert.cryptoId} deleted after triggering.`);

            }
            break;

          default:
            console.log(`Invalid condition for alert ${alert.cryptoId}`);
        }
      } else {
        console.log('Market price not found for', alert.cryptoId);
      }
    });
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
};


// Run the checkAlerts function every second
setInterval(checkAlerts, 3000);

// Register the routes for market price and alert functionality
app.use('/', marketPriceRouter);  // Routes for market price related API
app.use('/', alertRouter);  // Routes for alert related API

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
