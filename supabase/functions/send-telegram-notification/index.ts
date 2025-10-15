const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TelegramRequest {
  type: 'contact' | 'quote';
  data: {
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    message?: string;
    service?: string;
    budget?: string;
    timeline?: string;
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Telegram configuration missing');
    }

    const body: TelegramRequest = await req.json();
    const { type, data } = body;

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

    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      throw new Error('Failed to send Telegram notification');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notification sent successfully' }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
