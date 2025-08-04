document.addEventListener("DOMContentLoaded", () => {
  afficherSection('home');
  chargerCasiers();
});

function afficherSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function chargerCasiers() {
  fetch("/api/casiers")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("casier-list");
      container.innerHTML = "";
      const limit = 5;
      data.slice(-limit).reverse().forEach(entry => {
        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = \`
          <strong>\${entry.nom}</strong><br>
          Infraction: \${entry.infraction}<br>
          Sanction: \${entry.sanction}<br>
          \${entry.montant ? "Montant: $" + entry.montant + "<br>" : ""}
          Date: \${entry.date}
        \`;
        container.appendChild(div);
      });
    })
    .catch(err => console.error("Erreur de chargement:", err));
}

function filtrerCasiers() {
  const filtre = document.getElementById("search").value.toLowerCase();
  fetch("/api/casiers")
    .then(res => res.json())
    .then(data => {
      const filtres = data.filter(entry => entry.nom.toLowerCase().includes(filtre));
      const container = document.getElementById("casier-list");
      container.innerHTML = "";
      filtres.slice(0, 5).forEach(entry => {
        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = \`
          <strong>\${entry.nom}</strong><br>
          Infraction: \${entry.infraction}<br>
          Sanction: \${entry.sanction}<br>
          \${entry.montant ? "Montant: $" + entry.montant + "<br>" : ""}
          Date: \${entry.date}
        \`;
        container.appendChild(div);
      });
    });
}
