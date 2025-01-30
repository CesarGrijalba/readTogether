const url = "https://read-together-pi.vercel.app/usuarios/login";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const contraseña = document.getElementById("contraseña").value;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contraseña }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem('user', JSON.stringify(data.nombre));
      
      const tokenPayload = JSON.parse(atob(data.token.split(".")[1])); // Decodificar token
      localStorage.setItem("usuarioEmail", tokenPayload.email);
      console.log("Respuesta correcta:", data);
      window.location.href = "./html/explorar.html";
      
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al iniciar sesión");
  }
});
