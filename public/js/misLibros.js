const url = "http://localhost:3000/libros";
const urlMisLibros = "http://localhost:3000/libros/misLibros";

const token = localStorage.getItem("token");

document.getElementById("agregarForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const genero = document.getElementById("genero").value;
  const fechaPublicacion = document.getElementById("fechaPublicacion").value;

  if (!token) {
    alert("Debes iniciar sesión para crear un item.");
    window.location.href = "../index.html"; // Redirigir al login si no hay token
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
    },
    body: JSON.stringify({ titulo, autor, genero, fechaPublicacion }),
  })
    .then((response) => response.json())
    .then(() => {
      alert("Libro agregado exitosamente");
      obtenerMisLibros();
      document.getElementById("agregarForm").reset(); // Limpiar el formulario
    })
    .catch((error) => console.error("Error al crear el libro:", error));

  // try {
  //     const response = await fetch(url, {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //             "Authorization": `Bearer ${token}`
  //         },
  //         body: JSON.stringify({ titulo, autor, genero, fechaPublicacion }),
  //     });
  // const data = await response.json();
  // if (response.ok) {
  //     alert("Libro agregado");
  //   }}

  //   catch (error) {
  //     console.error("Error:", error);
  //     alert("Error al agregar libro");
  // }
});

function obtenerMisLibros() {
  const misLibrosContainer = document.getElementById("misLibrosContainer");
  fetch(urlMisLibros, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((libros) => {
      const misLibrosContainer = document.getElementById("misLibrosContainer");
      misLibrosContainer.innerHTML = "";
      libros.forEach((libro) => {
        const libroCard = document.createElement("div");
        libroCard.innerHTML = `
                <h3>${libro.titulo}</h3>
                <p>Autor: ${libro.autor}</p>
                <p>Genero: ${libro.genero}</p>
                <p>Fecha de publicación: ${libro.fechaPublicacion.split("T")[0]}</p>
            `;
        misLibrosContainer.appendChild(libroCard);
      });
    });
}

obtenerMisLibros();
