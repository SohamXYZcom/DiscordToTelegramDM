# Discord DM to Telegram Forwarder

This project is a Discord selfbot using `discord.js-selfbot-v13` that automatically forwards all private messages (DMs) you receive on Discord to a specified Telegram chat using a Telegram bot.

## ⚠️ IMPORTANT DISCLAIMER

**This project uses a Discord selfbot, which violates Discord's Terms of Service. Use at your own risk. Your account may be banned if detected by Discord.**

**This code is provided "as-is" for educational and experimentation purposes only.**

## Features

- ✅ Forwards all Discord DMs to Telegram instantly
- 🖼️ **Supports images** - Images are sent directly to Telegram as photos
- 📎 **Supports file attachments** - Non-image files are sent as download links
- 🔒 Uses environment variables for sensitive data
- 📝 Includes sender information (username and Discord ID)
- 🛡️ Error handling and fallback mechanisms
- 📊 Debug logging for troubleshooting

## Setup

### 1. Clone or Download

Clone this repository or download the files to your local machine.

### 2. Install Dependencies

Run the following command in the project directory:

```bash
npm install
```

### 3. Configure Environment Variables

Edit the `.env` file and fill in your credentials:

```env
DISCORD_TOKEN=your_discord_token
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

**How to get each value:**

#### DISCORD_TOKEN

- Your Discord account token (selfbot, use at your own risk)
- **Warning**: This is your personal Discord token - never share it!

#### TELEGRAM_BOT_TOKEN

1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the instructions
3. Copy the token provided

#### TELEGRAM_CHAT_ID

1. Send a message to your bot in Telegram
2. Visit: `https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates`
3. Find your chat ID in the JSON response (it's a positive number like `123456789`)
4. Alternatively, run: `npm run getChatId` (after step 4)

### 4. Run the Bot

```bash
npm start
```

Or for getting your Telegram chat ID:

```bash
npm run getChatId
```

## Usage

1. Start the bot with `npm start`
2. The bot will log in and show "Bot is ready and listening for DMs..."
3. When someone sends you a DM on Discord, it will appear in your Telegram chat
4. Images are forwarded as photos with captions
5. Files are forwarded as download links

## Message Types Supported

- **Text messages**: Forwarded with sender info
- **Images** (PNG, JPG, GIF, etc.): Sent as Telegram photos
- **Files/Documents**: Sent as download links
- **Mixed messages**: Text + attachments handled appropriately

## Troubleshooting

- If you see "No DMs detected", the bot is working but hasn't received any DMs yet
- Check that `TELEGRAM_CHAT_ID` is your personal chat ID (positive number), not a bot ID
- Make sure all three environment variables are filled in `.env`
- For image sending issues, check the console logs - images may fallback to URLs

## Dependencies

- `discord.js-selfbot-v13`: Discord selfbot library
- `node-fetch`: HTTP requests to Telegram API
- `dotenv`: Environment variable management

## Socials

Created & maintained by Soham Mitra (SohamXYZ)

- 🌐 Website: [https://sohamxyz.com](https://sohamxyz.com)
- 📧 Email: soham@sohamxyz.com
- 💬 Discord: sohamxyz
- 🧠 discord bot/automation inquiries welcome!

## License

MIT