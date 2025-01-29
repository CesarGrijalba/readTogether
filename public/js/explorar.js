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
        card.innerHTML = `
                <h3>${libro.titulo}</h3>
                <p>Autor: ${libro.autor}</p>
                <p>Genero: ${libro.genero}</p>
                <p>Fecha de publicación: ${libro.fechaPublicacion.split("T")[0]}</p>`;
        librosContainer.appendChild(card);
      });
    });
}

obtenerLibros();
