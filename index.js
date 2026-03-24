const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log('QR RECEIVED');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// 👇 AQUÍ ESCUCHAMOS MENSAJES
client.on('message', async message => {
    const chat = await message.getChat();

    // ⚠️ FILTRO: solo grupos
    if (chat.isGroup) {
        console.log(`Mensaje en grupo: ${chat.name} - ${message.body}`);

        // 👇 AQUÍ DESPUÉS VA n8n (por ahora solo log)
    }
});

client.initialize();
