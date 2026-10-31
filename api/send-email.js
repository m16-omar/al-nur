import tls from 'node:tls';

const GMAIL_USER = 'uabdullahi676@gmail.com';
const GMAIL_PASS = 'pqadrynmtgfenttd';
const RELAY_SECRET = 'alnur_luxury_vault_2026';

function sendViaGmailTls({ to, subject, html }) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(465, 'smtp.gmail.com');
    let buffer = '';
    let state = 'INIT';

    const userB64 = Buffer.from(GMAIL_USER).toString('base64');
    const passB64 = Buffer.from(GMAIL_PASS).toString('base64');

    socket.setEncoding('utf8');

    function sendCmd(cmd) {
      socket.write(cmd + '\r\n');
    }

    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\r\n');
      if (lines.length <= 1) return;

      const lastLine = lines[lines.length - 2];
      // Check if multiline response (4th character is '-')
      if (lastLine.length >= 4 && lastLine[3] === '-') {
        return; // wait for final line without hyphen
      }

      const code = parseInt(lastLine.substring(0, 3), 10);
      buffer = ''; // clear processed buffer

      if (state === 'INIT' && code === 220) {
        state = 'EHLO';
        sendCmd('EHLO alnur.store');
      } else if (state === 'EHLO' && code === 250) {
        state = 'AUTH';
        sendCmd('AUTH LOGIN');
      } else if (state === 'AUTH' && code === 334) {
        state = 'USER';
        sendCmd(userB64);
      } else if (state === 'USER' && code === 334) {
        state = 'PASS';
        sendCmd(passB64);
      } else if (state === 'PASS' && code === 235) {
        state = 'MAIL';
        sendCmd(`MAIL FROM:<${GMAIL_USER}>`);
      } else if (state === 'MAIL' && code === 250) {
        state = 'RCPT';
        sendCmd(`RCPT TO:<${to}>`);
      } else if (state === 'RCPT' && code === 250) {
        state = 'DATA';
        sendCmd('DATA');
      } else if (state === 'DATA' && code === 354) {
        state = 'SENT';
        const mime = [
          `From: Al-Nur Modest Haute Couture <${GMAIL_USER}>`,
          `To: ${to}`,
          `Subject: ${subject}`,
          'MIME-Version: 1.0',
          'Content-Type: text/html; charset=UTF-8',
          '',
          html,
          '.'
        ].join('\r\n') + '\r\n';
        socket.write(mime);
      } else if (state === 'SENT' && code === 250) {
        state = 'QUIT';
        sendCmd('QUIT');
        resolve(true);
      } else if (code >= 400) {
        socket.destroy();
        reject(new Error(`SMTP Error (${code}): ${lastLine}`));
      }
    });

    socket.on('error', (err) => reject(err));
    socket.setTimeout(12000, () => {
      socket.destroy();
      reject(new Error('SMTP connection timeout to smtp.gmail.com:465'));
    });
  });
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Parse body safely
  let payload = req.body;
  if (!payload || typeof payload === 'string') {
    try {
      if (typeof payload === 'string') {
        payload = JSON.parse(payload);
      } else {
        // Read stream if body is empty
        const buffers = [];
        for await (const chunk of req) {
          buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString();
        payload = JSON.parse(data);
      }
    } catch (_) {
      payload = payload || {};
    }
  }

  const { to, subject, html, key } = payload || {};

  if (!key || key !== RELAY_SECRET) {
    return res.status(401).json({ error: 'Unauthorized relay access' });
  }

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
  }

  try {
    await sendViaGmailTls({ to, subject, html });
    return res.status(200).json({ success: true, message: `Email delivered to ${to}` });
  } catch (error) {
    console.error('[send-email] Relay error:', error);
    return res.status(500).json({ success: false, error: error.message || 'SMTP delivery failure' });
  }
}
