fetch('../components/menu.html')
          .then(response => response.text())
          .then(data => {
              document.getElementById('menu-container').innerHTML = data;

              const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
    console.log("click cerrar sesi[on")
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
    window.location.href = '../index.html';
  });
              
              // Ejecutar script después de insertar el HTML
              const button = document.getElementById("menu-button");
              const menu = document.getElementById("menu-options");

              button.addEventListener("click", function(event) {
                  event.stopPropagation();
                  menu.classList.toggle("show");
              });

              document.addEventListener("click", function(event) {
                  if (!menu.contains(event.target) && !button.contains(event.target)) {
                      menu.classList.remove("show");
                  }
              });
          })
          .catch(error => console.error('Error al cargar el menú:', error));

// Lógica de cierre de sesión
