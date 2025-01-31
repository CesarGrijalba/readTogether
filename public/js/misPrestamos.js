const urlPrestamos = "https://read-together-pi.vercel.app/prestamos";
const urlUsuarios = "https://read-together-pi.vercel.app/usuarios";
const urlLibros = "https://read-together-pi.vercel.app/libros";


const token = localStorage.getItem("token");


async function obtenerMisPrestamos() {
  try {
    const response = await fetch(urlPrestamos, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const prestamos = await response.json();
    console.log(prestamos);

    const misPrestamosContainer = document.getElementById("misPrestamosContainer");
    misPrestamosContainer.innerHTML = "";

    if (prestamos.length === 0) {
      misPrestamosContainer.innerHTML = `<h3>No tienes préstamos en el momento</h3>`;
      return; 
    }

    for (const prestamo of prestamos) {
      const propietarioData = await obtenerUser(prestamo.propietario);
      const libroData = await obtenerLibro(prestamo.libro);

      const libroCard = document.createElement("div");
      libroCard.innerHTML = `
        <h3>${libroData.titulo}</h3>
        <img src="../img/libro.png" alt="">
        <p><strong>Propietario</strong>: ${propietarioData.nombre}</p>
        <p><strong>Fecha de solicitud:</strong> ${prestamo.fechaSolicitud.split("T")[0]}</p>
        <p><strong>Estado</strong>: ${prestamo.estado}</p>

      `;
      misPrestamosContainer.appendChild(libroCard);
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

function obtenerLibro(id){
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

obtenerMisPrestamos();
