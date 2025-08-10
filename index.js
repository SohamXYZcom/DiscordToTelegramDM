require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const client = new Client({ checkUpdate: false });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    console.log('Bot is ready and listening for DMs...');
});

client.on('messageCreate', async (message) => {
    try {
        // Debug logging
        console.log(`Message received: Channel type: ${message.channel.type}, Author: ${message.author.tag}, Bot: ${message.author.bot}`);
        
        // Check for DMs - use 'DM' string or type 1
        if ((message.channel.type === 'DM' || message.channel.type === 1) && !message.author.bot && message.author.id !== client.user.id) {
            console.log('DM detected! Forwarding to Telegram...');
            
            // Handle text content
            let text = `DM from ${message.author.tag} (${message.author.id}):`;
            if (message.content) {
                text += `\n${message.content}`;
            }
            
            // Handle attachments (images, files, etc.)
            if (message.attachments.size > 0) {
                console.log(`Found ${message.attachments.size} attachment(s)`);
                
                for (const attachment of message.attachments.values()) {
                    console.log(`Processing attachment: ${attachment.name} (${attachment.contentType})`);
                    
                    // Check if it's an image
                    if (attachment.contentType && attachment.contentType.startsWith('image/')) {
                        await sendImageToTelegram(attachment.url, text);
                    } else {
                        // For non-images, send as document or just include the URL
                        text += `\n📎 Attachment: ${attachment.name}\n🔗 ${attachment.url}`;
                    }
                }
                
                // If there were non-image attachments, send the text
                if (message.attachments.some(att => !att.contentType?.startsWith('image/'))) {
                    await sendToTelegram(text);
                }
            } else {
                // No attachments, just send text
                await sendToTelegram(text);
            }
        }
    } catch (error) {
        console.error('Error processing message:', error);
    }
});

async function sendImageToTelegram(imageUrl, caption) {
    if (!TELEGRAM_CHAT_ID) {
        console.log('Would send image to Telegram:', imageUrl);
        return;
    }
    
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                photo: imageUrl,
                caption: caption
            })
        });
        
        const result = await response.json();
        if (result.ok) {
            console.log('Image sent to Telegram successfully');
        } else {
            console.error('Telegram API error (image):', result);
            // If image fails, fallback to text with URL
            await sendToTelegram(caption + `\n🖼️ Image: ${imageUrl}`);
        }
    } catch (error) {
        console.error('Error sending image to Telegram:', error);
        // Fallback to text
        await sendToTelegram(caption + `\n🖼️ Image: ${imageUrl}`);
    }
}

async function sendToTelegram(text) {
    if (!TELEGRAM_CHAT_ID) {
        console.log('Would send to Telegram:', text);
        console.log('But TELEGRAM_CHAT_ID is not set in .env');
        return;
    }
    
    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text
            })
        });
        
        const result = await response.json();
        if (result.ok) {
            console.log('Message sent to Telegram successfully');
        } else {
            console.error('Telegram API error:', result);
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
    }
}

client.login(DISCORD_TOKEN);
