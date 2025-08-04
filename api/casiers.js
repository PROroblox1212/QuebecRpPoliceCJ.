let casiers = [
  { id: 1, nom: "Alex B", crime: "Vol de voiture", date: "2025-08-04" },
  { id: 2, nom: "Marie C", crime: "Intrusion", date: "2025-08-01" }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(casiers);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const nouveauCasier = JSON.parse(body);
      nouveauCasier.id = casiers.length + 1;
      casiers.push(nouveauCasier);
      res.status(201).json({ success: true, casier: nouveauCasier });
    });
  } else {
    res.status(405).end();
  }
}
