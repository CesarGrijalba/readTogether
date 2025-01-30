const urlPrestamos = "https://read-together-pi.vercel.app/prestamos";
const urlSolicitudes = "https://read-together-pi.vercel.app/prestamos/solicitudes";
const urlUsuarios = "https://read-together-pi.vercel.app/usuarios";
const urlLibros = "https://read-together-pi.vercel.app/libros";

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
          <div>
</div>
  
        `;
      

      const aceptarBtn = document.createElement("button");
        aceptarBtn.textContent = "Aceptar";
        aceptarBtn.addEventListener("click", () => {
            aprobarSolicitud(solicitud._id);
        //   eliminarLibro(libro._id);
        });

        const denegarBtn = document.createElement("button");
        denegarBtn.textContent = "Rechazar";
        denegarBtn.addEventListener("click", () => {
          rechazarSolicitud(solicitud._id)
            // abrirModalEdicion(libro)
        } );

        const divBotones = libroCard.querySelector("div");
        divBotones.id = "botonesContainer";


        divBotones.appendChild(aceptarBtn);
        divBotones.appendChild(denegarBtn);

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

function aprobarSolicitud(id){
    try {
        fetch(`${urlSolicitudes}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: "Aprobado" }),
        });
        alert("Solicitud aceptada correctamente");
        obtenerSolicitudes();
      } catch (error) {
        console.error("Error:", error);
      }
}

function rechazarSolicitud(id){
  try {
      fetch(`${urlSolicitudes}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: "Rechazado" }),
      });
      alert("Solicitud rechazada correctamente");
      obtenerSolicitudes();
    } catch (error) {
      console.error("Error:", error);
    }
}

obtenerSolicitudes();
