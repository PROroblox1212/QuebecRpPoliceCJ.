async function loadCasiers() {
  const res = await fetch('/api/casiers');
  const casiers = await res.json();
  const tbody = document.querySelector('#casiersTable tbody');
  tbody.innerHTML = '';
  casiers.forEach((casier, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${casier.nom}</td>
      <td>${casier.infraction}</td>
      <td><button onclick="deleteCasier(${index})">Supprimer</button></td>
    `;
    tbody.appendChild(row);
  });
}

async function deleteCasier(index) {
  await fetch(`/api/casiers/${index}`, { method: 'DELETE' });
  loadCasiers();
}

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nom = document.getElementById('nom').value;
  const infraction = document.getElementById('infraction').value;

  await fetch('/api/casiers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom, infraction }),
  });

  document.getElementById('nom').value = '';
  document.getElementById('infraction').value = '';
  loadCasiers();
});

loadCasiers();
