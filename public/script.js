function chargerCasiers() {
  fetch("/api/casiers")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("casier-list");
      container.innerHTML = "";
      data.forEach(entry => {
        const div = document.createElement("div");
        div.className = "entry";
        div.textContent = `${entry.nom} - ${entry.crime} (${entry.date})`;
        container.appendChild(div);
      });
    })
    .catch(err => console.error("Erreur de chargement:", err));
}

function ajouterCasier() {
  const nom = document.getElementById("nom").value;
  const crime = document.getElementById("crime").value;
  const date = document.getElementById("date").value;

  if (!nom || !crime || !date) return alert("Remplis tous les champs");

  fetch("/api/casiers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom, crime, date })
  })
    .then(res => res.json())
    .then(() => chargerCasiers())
    .catch(err => console.error("Erreur ajout:", err));
}

document.addEventListener("DOMContentLoaded", chargerCasiers);
