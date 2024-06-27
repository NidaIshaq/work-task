const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const cron = require('node-cron');
const dotenv = require("dotenv");
const path = require("path");
const User = require('../models/userModels');
const JWT = require("jsonwebtoken");

dotenv.config({ path: path.resolve(__dirname, "../config/config.env") });

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

//oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


// Function to send email using Gmail API
async function sendMail(subject, text, recipient) {
  try {
    //const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_SENDER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: oAuth2Client.credentials.access_token,
      },
    });

    const mailOptions = {
      from: `Pet Care <${process.env.GMAIL_SENDER}>`,
      to: recipient,
      subject: subject,
      text: text
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

const scheduleMealReminders = async (req, res) => {
    try {
      const userId = req.body.userId;
  
      // Fetch user details from database using userId
      const user = await User.findById(userId); // Assuming you are using Mongoose
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
      }
  
      const userEmail = user.email;
  
      // Define meal times and their corresponding labels
      const mealTimes = [
        { time: '16:22', meal: 'Morning Meal' },
        { time: '13:00', meal: 'Afternoon Meal' },
        { time: '17:00', meal: 'Late Afternoon Meal' },
        { time: '21:00', meal: 'Evening Meal' },
      ];
  
      // Schedule reminders for each meal time
      mealTimes.forEach(({ time, meal }) => {
        cron.schedule(`0 ${time.split(':')[1]} ${time.split(':')[0]} * * *`, async () => {
          await sendMail(`Reminder: ${meal}`, `It's time for your ${meal}.`, userEmail);
        }, {
          scheduled: true,
          timezone: "Asia/Karachi" 
        });
      });
  
      res.status(200).json({ success: true, message: "Meal reminders scheduled." });
    } catch (error) {
      console.error("Error scheduling meal reminders:", error);
      res.status(500).json({ success: false, message: "Error scheduling meal reminders." });
    }
  };
  
  module.exports = {
    scheduleMealReminders
  };