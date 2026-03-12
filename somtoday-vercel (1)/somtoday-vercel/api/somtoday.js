export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(204).end();

  const targetUrl = req.query.url;
  if (!targetUrl || !targetUrl.startsWith('https://')) {
    return res.status(400).json({ error: 'Missing or invalid url param' });
  }

  const auth = req.headers.authorization || '';

  try {
    const resp = await fetch(targetUrl, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Mozilla/5.0',
        ...(auth ? { Authorization: auth } : {}),
      },
    });
    const data = await resp.text();
    res.status(resp.status).setHeader('Content-Type', 'application/json').send(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
