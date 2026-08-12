const http = require('http');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');

const port = process.env.PORT || 4000;

function sendJSON(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/inquiry') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      (async () => {
        try {
          const payload = JSON.parse(body || '{}');

          // Optional Turnstile verification if secret provided
          const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET || '';
          if (TURNSTILE_SECRET) {
            const token = payload.captchaToken;
            if (!token) {
              sendJSON(res, 400, { error: 'Captcha token missing' });
              return;
            }
            // verify token with Cloudflare
            const https = require('https');
            const postData = `secret=${encodeURIComponent(TURNSTILE_SECRET)}&response=${encodeURIComponent(token)}`;
            const options = {
              hostname: 'challenges.cloudflare.com',
              path: '/turnstile/v0/siteverify',
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData),
              },
            };

            const ok = await new Promise((resolve) => {
              const req2 = https.request(options, (r) => {
                let data = '';
                r.on('data', (c) => (data += c));
                r.on('end', () => {
                  try {
                    const json = JSON.parse(data || '{}');
                    resolve(!!json.success);
                  } catch (e) {
                    resolve(false);
                  }
                });
              });
              req2.on('error', () => resolve(false));
              req2.write(postData);
              req2.end();
            });

            if (!ok) {
              sendJSON(res, 400, { error: 'Captcha verification failed' });
              return;
            }
          }

          const date = new Date();
          const ymd = date.toISOString().slice(0, 10).replace(/-/g, '');
          const rnd = Math.floor(Math.random() * 9000 + 1000);
          const inquiryId = `INQ-${ymd}-${rnd}`;
          const entry = { inquiryId, createdAt: new Date().toISOString(), payload };

          const raw = fs.readFileSync(DATA_FILE, 'utf8');
          const arr = JSON.parse(raw || '[]');
          arr.push(entry);
          fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');

          console.log('Saved inquiry', inquiryId);
          sendJSON(res, 200, { inquiryId });
        } catch (err) {
          console.error('Failed to save inquiry', err);
          sendJSON(res, 500, { error: 'Failed to save inquiry' });
        }
      })();
    });
    return;
  }

  // simple health route
  if (req.method === 'GET' && req.url === '/api/health') {
    sendJSON(res, 200, { status: 'ok' });
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
