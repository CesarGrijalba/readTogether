const url = "https://read-together-sand.vercel.app/libros";
const urlMisLibros = "https://read-together-sand.vercel.app/libros/misLibros";

const token = localStorage.getItem("token");

//Elementos del modal
const modal = document.getElementById("modal");
const tituloEditar = modal.querySelector("#titulo");
const autorEditar = modal.querySelector("#autor");
const fechaPublicacionEditar = modal.querySelector("#fechaPublicacion");
const generoEditar = modal.querySelector("#genero");
const botonEditar = modal.querySelector("button");

let libroEditadoId = null;

botonEditar.addEventListener("click", () => {
  const tituloNuevo = tituloEditar.value;
  const autorNuevo = autorEditar.value;
  const fechaPublicacionNuevo = fechaPublicacionEditar.value;
  const generoNuevo = generoEditar.value;

  if (libroEditadoId) {
    actualizarLibro(libroEditadoId, tituloNuevo, autorNuevo, fechaPublicacionNuevo, generoNuevo);
    modal.style.display = "none";
  }
});

// Función para abrir el modal de edición
function abrirModalEdicion(libro) {
  modal.style.display = "flex";
  tituloEditar.value = libro.titulo;
  autorEditar.value = libro.autor;
  fechaPublicacionEditar.value = libro.fechaPublicacion.split("T")[0];
  generoEditar.value = libro.genero;

  // Guardar el ID del libro que se está editando
  libroEditadoId = libro._id;
}

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
                <img src="../img/libro.png" alt="">
                <p><strong>Autor:</strong> ${libro.autor}</p>
                <p><strong>Genero:</strong> ${libro.genero}</p>
                <p><strong>Fecha de publicación:</strong> ${
                  libro.fechaPublicacion.split("T")[0]
                }</p>
                <div>
</div>
            `;
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", () => {
          eliminarLibro(libro._id);
        });

        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.addEventListener("click", () => abrirModalEdicion(libro));

        //Eviar datos nuevos para actualizar
        // botonEditar.addEventListener("click", () => {
        //   console.log("ENTRADA")
    
        //   const tituloNuevo = tituloEditar.value;
        //   const autorNuevo = autorEditar.value;
        //   const fechaPublicacionNuevo = fechaPublicacionEditar.value;
        //   const generoNuevo = generoEditar.value;

        //   actualizarLibro(
        //     libro._id,
        //     tituloNuevo,
        //     autorNuevo,
        //     fechaPublicacionNuevo,
        //     generoNuevo
        //   );
        //   modal.style.display = "none";
        // });

        const divBotones = libroCard.querySelector("div");
        divBotones.id = "botonesContainer";

        divBotones.appendChild(editarBtn);
        divBotones.appendChild(eliminarBtn);

        misLibrosContainer.appendChild(libroCard);
      });
    });
}

// Funcion para eliminar libro
async function eliminarLibro(id) {
  if (confirm("Estas seguro que deseas eliminar este libro?")) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      try {
        obtenerMisLibros();
        console.log("Libro eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar la tarea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

//Funcion para actualizar libro
async function actualizarLibro(id, titulo, autor, fechaPublicacion, genero) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, autor, fechaPublicacion, genero }),
    });
    try {
      obtenerMisLibros();
      alert("Libro modificado con exito");
    } catch (error) {
      console.error("Error al actualizar el libro");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Evento para cerrar el modal
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

obtenerMisLibros();
