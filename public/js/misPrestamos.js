const urlPrestamos = "http://localhost:3000/prestamos";
const urlUsuarios = "http://localhost:3000/usuarios";


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
      return; // Salir de la función si no hay préstamos
    }

    // Usar un bucle for...of para poder usar await
    for (const prestamo of prestamos) {
      const solicitanteData = await obtenerUser(prestamo.solicitante);

      const libroCard = document.createElement("div");
      libroCard.innerHTML = `
        <h3>${prestamo.libro}</h3>
        <img src="../img/libro.png" alt="">
        <p>Solicitante: ${solicitanteData.nombre}</p> <!-- Usar datos del solicitante -->
        <p>Propietario: ${prestamo.propietario}</p>
        <p>Fecha de publicación:</p>
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
obtenerMisPrestamos();
