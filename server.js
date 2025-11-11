import express from 'express';
import twilio from 'twilio';

const app = express();
app.use(express.json());

// Missing .env loading
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

// Wrong Twilio client initialization
const client = twilio(accountSid, apiKey);

app.post('/voice', (req, res) => {
  // Missing TwiML response
  res.send('OK');
});

app.post('/token', (req, res) => {
  // Incomplete token generation
  const token = 'incomplete';
  res.json({ token });
});

// Missing port configuration
app.listen();
