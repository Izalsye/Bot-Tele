const { sendTextWithButtons, sendMedia } = require('../helpers/telegram');

/**
 * Handler callback query (inline buttons)
 */
async function handleCallback(update) {
    if (!update.callback_query) return;
    const chatId = update.callback_query.message.chat.id;
    const data = update.callback_query.data;

    switch (data) {
        case 'menu_photo':
            await sendMedia('photo', chatId, 'https://placekitten.com/400/300', 'Ini foto lucu 🐱', [
                [{ text: '🔙 Kembali', callback_data: 'menu_main' }]
            ]);
            break;

        case 'menu_video':
            await sendMedia('video', chatId, 'https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4', 'Contoh video 🎬', [
                [{ text: '🔙 Kembali', callback_data: 'menu_main' }]
            ]);
            break;

        case 'menu_audio':
            await sendMedia('audio', chatId, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'Contoh audio 🎵', [
                [{ text: '🔙 Kembali', callback_data: 'menu_main' }]
            ]);
            break;

        case 'menu_main':
            await sendTextWithButtons(chatId, 'Menu Utama:', [
                [{ text: '📸 Foto', callback_data: 'menu_photo' }],
                [{ text: '🎬 Video', callback_data: 'menu_video' }],
                [{ text: '🎵 Audio', callback_data: 'menu_audio' }]
            ]);
            break;

        default:
            await sendTextWithButtons(chatId, 'Menu tidak tersedia. Kembali ke menu utama.', [
                [{ text: '🔙 Kembali', callback_data: 'menu_main' }]
            ]);
            break;
    }
}

module.exports = { handleCallback };
