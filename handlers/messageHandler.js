const { sendText, sendTextWithButtons, sendMedia } = require('../helpers/telegram');

/**
 * Handler untuk message biasa
 */
async function handleMessage(update) {
    if (!update.message || !update.message.text) return;
    const chatId = update.message.chat.id;
    const text = update.message.text.trim();

    switch (text) {
        case '/start':
            await sendText(chatId, 'Selamat datang! Pilih menu di bawah:');
            await sendTextWithButtons(chatId, 'Menu Utama:', [
                [{ text: '📸 Foto', callback_data: 'menu_photo' }],
                [{ text: '🎬 Video', callback_data: 'menu_video' }],
                [{ text: '🎵 Audio', callback_data: 'menu_audio' }]
            ]);
            break;

        case '/photo':
            await sendMedia('photo', chatId, 'https://placekitten.com/400/300', 'Ini foto lucu 🐱');
            break;

        case '/video':
            await sendMedia('video', chatId, 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4', 'Contoh video 🎬');
            break;

        case '/audio':
            await sendMedia('audio', chatId, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'Contoh audio 🎵');
            break;

        default:
            await sendText(chatId, 'Gunakan perintah: /start, /photo, /video, /audio');
            break;
    }
}

module.exports = { handleMessage };
