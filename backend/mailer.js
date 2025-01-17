const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port:465,
    auth: {
      user: 'youremail',
      pass: 'yourpassowrd',
    },
  });
// Function to send an email
const sendEmail = async (recipient, text) => {
  try {
    const mailOptions = {
      from: 'youremail', // Sender email
      to: recipient, // Recipient email
      subject: "Alert Triggered", // Email subject
      text: text, // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
