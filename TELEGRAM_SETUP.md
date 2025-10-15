# Telegram Bot Setup Instructions

This guide will help you set up Telegram notifications for form submissions.

## Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a chat and send `/newbot`
3. Follow the prompts to create your bot:
   - Choose a name for your bot (e.g., "KB Networks Notifications")
   - Choose a username (e.g., "kb_networks_bot")
4. BotFather will give you an API token like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
5. Save this token - you'll need it later

## Step 2: Create a Telegram Group

1. Create a new Telegram group
2. Add your bot to the group:
   - Go to group settings
   - Click "Add Members"
   - Search for your bot username
   - Add it to the group
3. Make your bot an admin (optional but recommended):
   - Group settings > Administrators
   - Add your bot as admin

## Step 3: Get Your Chat ID

1. Send a message in your group (like "test")
2. Open this URL in your browser (replace YOUR_BOT_TOKEN with your actual token):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. Look for `"chat":{"id":` in the response
4. The number after it is your Chat ID (e.g., `-1001234567890`)
5. Save this Chat ID

## Step 4: Configure Environment Variables

1. Open the `.env` file in your project
2. Replace the placeholders with your actual values:
   ```
   TELEGRAM_BOT_TOKEN=your_actual_bot_token_here
   TELEGRAM_CHAT_ID=your_actual_chat_id_here
   ```

Example:
```
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=-1001234567890
```

**IMPORTANT**: The app now sends Telegram notifications directly from the browser using the Telegram Bot API, so you only need to set these in your `.env` file. No edge function deployment or Supabase configuration is required!

## Step 5: Test the Integration

1. Fill out the contact form on your website
2. Check your Telegram group - you should receive a notification
3. Try the quote modal as well

## Troubleshooting

### Not receiving messages?

1. **Check bot token**: Make sure it's correct and active in your `.env` file
2. **Verify chat ID**: Ensure the chat ID is correct (include the minus sign if present)
3. **Bot permissions**: Make sure bot is admin of the group or can send messages
4. **Environment variables**: Verify they're set correctly in your `.env` file
5. **Restart dev server**: After changing `.env`, restart your development server

### Common Issues:

- **"Chat not found"**: Wrong chat ID or bot not added to group
- **"Forbidden"**: Bot doesn't have permission to send messages
- **"Unauthorized"**: Wrong bot token

## Message Format

The bot sends formatted messages with:
- Contact form submissions with all details
- Quote requests with full project information
- Timestamp in Maldives time zone

Example message:
```
🔔 New Contact Form Submission

👤 Name: John Doe
📧 Email: john@example.com
📱 Phone: +960 123-4567
🏢 Company: Example Corp

💬 Message:
Looking for CCTV installation...

---
📅 10/15/2025, 7:30:00 PM
```

## Security Notes

- Never commit your `.env` file with real credentials
- Keep your bot token secure
- Only authorized users should have access to the Telegram group
- Regularly rotate your bot token if needed
