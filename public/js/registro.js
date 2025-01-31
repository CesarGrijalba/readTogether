const url = "/usuarios/registro";

document
  .getElementById("registroForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("contraseña").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          contraseña,
          direccion,
          telefono,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Registro exitoso");
        window.location.href = "../index.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrarse");
    }
  });
