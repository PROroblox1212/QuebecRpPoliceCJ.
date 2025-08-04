fetch("/api/casiers")
  .then(r => r.json())
  .then(data => console.log(data));
