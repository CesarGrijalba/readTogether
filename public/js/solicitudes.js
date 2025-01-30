const urlPrestamos = "http://localhost:3000/prestamos";
const urlSolicitudes = "http://localhost:3000/prestamos/solicitudes";
const urlUsuarios = "http://localhost:3000/usuarios";
const urlLibros = "http://localhost:3000/libros";

const token = localStorage.getItem("token");

async function obtenerSolicitudes() {
  try {
    const response = await fetch(urlSolicitudes, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const solicitudes = await response.json();
    console.log(solicitudes);

    const solicitudesContainer = document.getElementById(
      "solicitudesContainer"
    );
    solicitudesContainer.innerHTML = "";

    if (solicitudes.length === 0) {
      solicitudesContainer.innerHTML = `<h3>No tienes solicitudes en el momento</h3>`;
      return;
    }

    for (const solicitud of solicitudes) {
      const solicitanteData = await obtenerUser(solicitud.solicitante);
      const libroData = await obtenerLibro(solicitud.libro);

      const libroCard = document.createElement("div");
      libroCard.innerHTML = `
          <h3>${libroData.titulo}</h3>
          <img src="../img/libro.png" alt="">
        <p><strong>Solicitante</strong>: ${solicitanteData.nombre}</p>

          <p><strong>Fecha de solicitud:</strong> ${
            solicitud.fechaSolicitud.split("T")[0]
          }</p>
          <p><strong>Estado</strong>: ${solicitud.estado}</p>
  
        `;
      solicitudesContainer.appendChild(libroCard);
    }
  } catch (error) {
    console.error("Error al obtener los préstamos:", error);
  }
}

function obtenerUser(id) {
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
      console.error("Error al obtener el usuario:", error);
      throw error; // Relanza el error para que pueda ser manejado por quien llame a la función
    });
}

function obtenerLibro(id) {
  return fetch(`${urlLibros}/${id}`)
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
      console.error("Error al obtener el libro:", error);
      throw error; // Relanza el error para que pueda ser manejado por quien llame a la función
    });
}

obtenerSolicitudes();
