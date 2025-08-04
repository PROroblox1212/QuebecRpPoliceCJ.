let casiers = [
  { id: 1, nom: "Alex B", infraction: "Excès de vitesse", sanction: "Amende", montant: 150, date: "2025-08-01" },
  { id: 2, nom: "Marie C", infraction: "Vol", sanction: "Arrestation", montant: null, date: "2025-08-02" },
  { id: 3, nom: "Tom D", infraction: "Trouble à l'ordre", sanction: "Ticket", montant: 75, date: "2025-08-03" },
  { id: 4, nom: "Léo M", infraction: "Intrusion", sanction: "Avertissement", montant: null, date: "2025-08-03" },
  { id: 5, nom: "Clara V", infraction: "Conduite dangereuse", sanction: "Amende", montant: 300, date: "2025-08-04" }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(casiers);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      const nouveau = JSON.parse(body);
      nouveau.id = casiers.length + 1;
      casiers.push(nouveau);
      res.status(201).json({ success: true, casier: nouveau });
    });
  } else {
    res.status(405).end();
  }
}
