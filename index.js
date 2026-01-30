const express = require('express');
const bodyParser = require('body-parser');
const { initBot } = require('./helpers/telegram');
const { handleMessage } = require('./handlers/messageHandler');
const { handleCallback } = require('./handlers/callbackHandler');
const { TELEGRAM_TOKEN, PORT, WEBHOOK_PATH, BASE_URL } = require('./config');

const app = express();
app.use(bodyParser.json());

const bot = initBot(TELEGRAM_TOKEN);
// set webhook pakai BASE_URL dari config
bot.setWebHook(`${BASE_URL}${WEBHOOK_PATH}`);

// Webhook Telegram
app.post(WEBHOOK_PATH, async (req, res) => {
    const update = req.body;

    try {
        if (update.message) await handleMessage(update);
        if (update.callback_query) await handleCallback(update);
    } catch (err) {
        console.error('Error handling update:', err);
    }

    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Webhook listening on port ${PORT}`));
