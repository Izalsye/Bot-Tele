require('dotenv').config(); // kalau pakai .env

module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || 'YOUR_BOT_TOKEN',
  PORT: process.env.PORT || 3000,
  WEBHOOK_PATH: process.env.WEBHOOK_PATH || '/telegram-webhook',
  BASE_URL: process.env.BASE_URL || 'https://abcd1234.ngrok.io', // bisa ngrok / domain
};
