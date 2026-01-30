const TelegramBot = require('node-telegram-bot-api');

/**
 * Singleton bot
 */
let botInstance = null;

function initBot(token) {
    if (!botInstance) {
        botInstance = new TelegramBot(token, { polling: false });
    }
    return botInstance;
}

function getBot() {
    if (!botInstance) throw new Error('Bot belum diinisialisasi. Panggil initBot(token) dulu.');
    return botInstance;
}

/**
 * =====================
 * MarkdownV2 escape helper
 * =====================
 */
function escapeMarkdown(text = '') {
    const escapeChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
    let escaped = text;
    escapeChars.forEach(char => {
        escaped = escaped.split(char).join(`\\${char}`);
    });
    return escaped;
}

/**
 * =====================
 * Keyboard helpers
 * =====================
 */

// Inline keyboard multi-level (nested array)
function createInlineKeyboard(buttons = []) {
    return buttons.length ? { inline_keyboard: buttons } : undefined;
}

/**
 * =====================
 * Send text message
 * =====================
 */
async function sendText(chatId, text, options = {}) {
    return getBot().sendMessage(chatId, escapeMarkdown(text), { parse_mode: 'MarkdownV2', ...options });
}

async function sendTextWithButtons(chatId, text, buttons = [], options = {}) {
    const reply_markup = createInlineKeyboard(buttons);
    return sendText(chatId, text, { reply_markup, ...options });
}

async function sendButtonsOnly(chatId, buttons = [], options = {}) {
    const reply_markup = createInlineKeyboard(buttons);
    return sendText(chatId, '\u200B', { reply_markup, ...options });
}

/**
 * =====================
 * Media + optional text + buttons
 * type = 'photo' | 'video' | 'audio'
 * =====================
 */
async function sendMedia(type, chatId, media, caption = '', buttons = [], options = {}) {
    const bot = getBot();
    const baseOptions = {
        caption: escapeMarkdown(caption),
        parse_mode: 'MarkdownV2',
        reply_markup: createInlineKeyboard(buttons),
        ...options
    };

    switch (type) {
        case 'photo':
            return bot.sendPhoto(chatId, media, baseOptions);
        case 'video':
            return bot.sendVideo(chatId, media, baseOptions);
        case 'audio':
            return bot.sendAudio(chatId, media, baseOptions);
        default:
            throw new Error(`Media type "${type}" tidak didukung`);
    }
}

module.exports = {
    initBot,
    getBot,
    escapeMarkdown,
    createInlineKeyboard,
    sendText,
    sendTextWithButtons,
    sendButtonsOnly,
    sendMedia
};
