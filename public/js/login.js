const url = "http://localhost:3000/usuarios/login";

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

    if (response.ok) {
      localStorage.setItem("usuario", JSON.stringify(data));
      window.location.href = "./html/libros.html";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al iniciar sesión");
  }
});
