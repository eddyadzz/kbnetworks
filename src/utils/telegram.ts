interface TelegramMessageData {
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  service?: string;
  budget?: string;
  timeline?: string;
}

export async function sendTelegramNotification(
  type: 'contact' | 'quote',
  data: TelegramMessageData
): Promise<boolean> {
  try {
    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return false;
    }

    let message = '';

    if (type === 'contact') {
      message = `
🔔 *New Contact Form Submission*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email || 'N/A'}
📱 *Phone:* ${data.phone || 'N/A'}
🏢 *Company:* ${data.company || 'N/A'}

💬 *Message:*
${data.message || 'No message provided'}

---
📅 ${new Date().toLocaleString('en-US', { timeZone: 'Indian/Maldives' })}
      `.trim();
    } else if (type === 'quote') {
      message = `
💼 *New Quote Request*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email || 'N/A'}
📱 *Phone:* ${data.phone || 'N/A'}
🏢 *Company:* ${data.company || 'N/A'}
🛠️ *Service:* ${data.service || 'N/A'}
💰 *Budget:* ${data.budget || 'N/A'}
⏱️ *Timeline:* ${data.timeline || 'N/A'}

💬 *Message:*
${data.message || 'No message provided'}

---
📅 ${new Date().toLocaleString('en-US', { timeZone: 'Indian/Maldives' })}
      `.trim();
    }

    const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}
