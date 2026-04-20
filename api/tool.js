import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { name } = req.query;

  if (!name || !name.endsWith('.html')) {
    return res.status(400).json({ error: 'Invalid file name' });
  }

  // Prevent path traversal attacks
  const safeName = path.basename(name);
  const filePath = path.join(process.cwd(), 'public', 'tools', safeName);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Tool not found' });
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read tool file' });
  }
}
