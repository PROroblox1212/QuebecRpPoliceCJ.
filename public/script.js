function chargerCasiers() {
  fetch("/api/casiers")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("casier-list");
      container.innerHTML = "";
      data.forEach(entry => {
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
    })
    .catch(err => {
      console.error("Erreur de chargement:", err);
    });
}

function ajouterCasier() {
  const nom = document.getElementById("nom").value;
  const infraction = document.getElementById("infraction").value;
  const sanction = document.getElementById("sanction").value;
  const montant = document.getElementById("montant").value;
  const date = document.getElementById("date").value;

  if (!nom || !infraction || !sanction || !date) return alert("Remplis tous les champs obligatoires");

  fetch("/api/casiers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, infraction, sanction, montant: montant ? Number(montant) : null, date })
  })
    .then(res => res.json())
    .then(() => {
      chargerCasiers();
    })
    .catch(err => console.error("Erreur ajout:", err));
}

document.addEventListener("DOMContentLoaded", chargerCasiers);
