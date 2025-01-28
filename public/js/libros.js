const url = "http://localhost:3000/libros";

function obtenerLibros() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const libros = data;
      const librosContainer = document.getElementById("librosContainer");
      librosContainer.innerHTML = "";
      libros.forEach((libro) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<h2>${libro.titulo}</h2>
            <p>${libro.autor}</p>
            <p>${libro.genero}</p>`;
        librosContainer.appendChild(card);
      });
    });
}

obtenerLibros();
