import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data', 'casiers.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    res.status(200).json(data.slice(-5).reverse());
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const nouveau = JSON.parse(body);
      const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
      nouveau.id = data.length + 1;
      data.push(nouveau);
      fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
      res.status(201).json({ success: true, casier: nouveau });
    });
  } else {
    res.status(405).end();
  }
}
