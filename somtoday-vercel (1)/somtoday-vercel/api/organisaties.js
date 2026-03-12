export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const resp = await fetch('https://servers.somtoday.nl/organisaties.json', {
      headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
    });
    const data = await resp.text();
    res.status(resp.status).setHeader('Content-Type', 'application/json').send(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
