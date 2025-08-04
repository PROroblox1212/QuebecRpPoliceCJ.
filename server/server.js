const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_PATH = path.join(__dirname, 'casiers.json');

app.use(express.json());
app.use(express.static('public'));

// Charger les casiers
function readCasiers() {
  if (!fs.existsSync(DATA_PATH)) return [];
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}

// Sauver les casiers
function writeCasiers(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

app.get('/api/casiers', (req, res) => {
  res.json(readCasiers());
});

app.post('/api/casiers', (req, res) => {
  const casiers = readCasiers();
  casiers.push(req.body);
  writeCasiers(casiers);
  res.sendStatus(200);
});

app.delete('/api/casiers/:index', (req, res) => {
  const casiers = readCasiers();
  casiers.splice(req.params.index, 1);
  writeCasiers(casiers);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Serveur actif sur http://localhost:${PORT}`));
