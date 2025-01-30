const url = "http://localhost:3000/libros/explorar";
const urlUsuarios = "http://localhost:3000/usuarios";
const urlPrestamos = "http://localhost:3000/prestamos";

const token = localStorage.getItem("token");

// async function obtenerLibros() {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const libros = data;
//       const librosContainer = document.getElementById("librosContainer");
//       librosContainer.innerHTML = "";
//       libros.forEach((libro) => {
//         const card = document.createElement("div");
//         card.classList.add("card");
//         card.innerHTML = `
//                 <h3>${libro.titulo}</h3>
//                 <img src="../img/libro.png" alt="">
//                 <p>Autor: ${libro.autor}</p>
//                 <p>Genero: ${libro.genero}</p>
//                 <p>Fecha de publicación: ${
//                   libro.fechaPublicacion.split("T")[0]
//                 }</p>
//                 <p>Propietario: ${propietarioData.nombre}</p>
//                 <button>Solicitar</button>`;
//         librosContainer.appendChild(card);
//       });
//     });
// }

async function obtenerLibros() {
  if (!token) {
    alert("Debes iniciar sesión para visualizar.");
    window.location.href = "../index.html"; // Redirigir al login si no hay token
    return;
  }

  try {
    // Realiza la solicitud fetch y espera la respuesta
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Convierte la respuesta a JSON
    const libros = await response.json();

    const decodedToken = JSON.parse(atob(token.split('.')[1]));// Decodificamos el token para obtener los datos
    console.log(decodedToken)
    const usuario = decodedToken.nombre || decodedToken.name || "Usuario"; // Aseguramos que existe un nombre
    const saludo = document.getElementById("saludo");
    
    // Capitalizar la primera letra del nombre
    const nombreCapitalizado = usuario.split(" ")[0];
    
    saludo.textContent = `Hola, ${nombreCapitalizado}`;

    // Obtén el contenedor de libros y limpia su contenido
    const librosContainer = document.getElementById("librosContainer");
    librosContainer.innerHTML = "";

    // Itera sobre cada libro y obtén los datos del propietario
    for (const libro of libros) {
      try {
        // Obtiene los datos del propietario
        const propietarioData = await obtenerPropietario(libro.propietario);

        // Crea la tarjeta del libro
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h3>${libro.titulo}</h3>
          <img src="../img/libro.png" alt="">
          <p>Autor: ${libro.autor}</p>
          <p>Género: ${libro.genero}</p>
          <p>Fecha de publicación: ${libro.fechaPublicacion.split("T")[0]}</p>
          <p>Propietario: ${propietarioData.nombre}</p>
        `;
        const solicitarBtn = document.createElement("button");
        solicitarBtn.textContent = "Solicitar";
        card.appendChild(solicitarBtn);

        //Funcion
        solicitarBtn.addEventListener("click", async () => {
          const libroPrestamo = libro._id;
          const propietarioPrestamo = libro.propietario;

          crearPrestamo(libroPrestamo, propietarioPrestamo);
        });

        // Añade la tarjeta al contenedor de libro
        librosContainer.appendChild(card);
      } catch (error) {
        console.error(
          `Error al obtener el propietario del libro ${libro.titulo}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error("Error al obtener los libros:", error);
  }
}

//Funcion crear prestamo

function crearPrestamo(libro, propietario) {
  fetch(urlPrestamos, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
    },
    body: JSON.stringify({ libro, propietario }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Prestamo agregado exitosamente");
      console.log(data);
      obtenerLibros();
    })
    .catch((error) => console.error("Error al crear el prestamo:", error));
}

function obtenerPropietario(id) {
  return fetch(`${urlUsuarios}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data; // Devuelve los datos para que puedan ser usados fuera de la función
    })
    .catch((error) => {
      console.error("Error al obtener el propietario:", error);
      throw error; // Relanza el error para que pueda ser manejado por quien llame a la función
    });
}

obtenerLibros();
