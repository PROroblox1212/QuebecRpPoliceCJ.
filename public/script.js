function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
  showSection('home');
  chargerCasiers();
});

function chargerCasiers() {
  fetch("/api/casiers")
    .then(res => res.json())
    .then(data => afficherCasiers(data))
    .catch(err => console.error("Erreur de chargement:", err));
}

function afficherCasiers(casiers) {
  const container = document.getElementById("casier-list");
  container.innerHTML = "";

  // Affiche max 5 casiers, les plus récents en haut
  const premiersCasiers = casiers.slice(0, 5);

  premiersCasiers.forEach(entry => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `
      <strong>${entry.nom}</strong><br>
      Infraction: ${entry.infraction}<br>
      Sanction: ${entry.sanction}<br>
      ${entry.montant ? `Montant: $${entry.montant}<br>` : ""}
      Date: ${entry.date}
    `;
    container.appendChild(div);
  });
}

function ajouterCasier() {
  const nom = document.getElementById("nom").value.trim();
  const infraction = document.getElementById("infraction").value.trim();
  const sanction = document.getElementById("sanction").value;
  const montant = document.getElementById("montant").value;
  const date = document.getElementById("date").value;

  if (!nom || !infraction || !sanction || !date) {
    return alert("Remplis tous les champs obligatoires !");
  }

  fetch("/api/casiers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nom,
      infraction,
      sanction,
      montant: montant ? Number(montant) : null,
      date,
    }),
  })
    .then(res => res.json())
    .then(() => {
      // Réinitialiser le formulaire
      document.getElementById("nom").value = "";
      document.getElementById("infraction").value = "";
      document.getElementById("montant").value = "";
      document.getElementById("date").value = "";
      chargerCasiers();
      showSection("casiers");
    })
    .catch(err => console.error("Erreur ajout:", err));
}

function filtrerCasiers() {
  const recherche = document.getElementById("recherche").value.toLowerCase();
  fetch("/api/casiers")
    .then(res => res.json())
    .then(data => {
      const filtres = data.filter(c => c.nom.toLowerCase().includes(recherche));
      afficherCasiers(filtres);
    })
    .catch(err => console.error("Erreur de recherche:", err));
}
