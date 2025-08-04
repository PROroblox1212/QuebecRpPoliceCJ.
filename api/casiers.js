let casiers = [
  {
    id: 1,
    nom: "Alex B",
    infraction: "Excès de vitesse",
    sanction: "Amende",
    montant: 250,
    date: "2025-08-04"
  },
  {
    id: 2,
    nom: "Marie C",
    infraction: "Intrusion",
    sanction: "Arrestation",
    montant: null,
    date: "2025-08-01"
  }
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
