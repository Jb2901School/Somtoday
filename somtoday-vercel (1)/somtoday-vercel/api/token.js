export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const resp = await fetch('https://production.somtoday.nl/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0',
      },
      body: new URLSearchParams(req.body).toString(),
    });
    const data = await resp.text();
    res.status(resp.status).setHeader('Content-Type', 'application/json').send(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
