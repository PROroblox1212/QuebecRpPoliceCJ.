let casiers = [
  { id: 1, nom: "Alex B", crime: "Vol de voiture", date: "2025-08-04" }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(casiers);
  } else if (req.method === 'POST') {
    // traitement POST
  } else {
    res.status(405).end();
  }
}
