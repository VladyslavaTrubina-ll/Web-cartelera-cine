const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

let header = document.getElementById("header");

let userInfo = ``;

if (usuario) {
  userInfo = `
    <p>Hola, <span id="username">${usuario.nombre} ${usuario.apellidos}</span>!</p>
    <button id="logout-button">Cerrar sesión</button>
    `;
}

header.innerHTML = `
    <div class="logo"><a href="index.html">Cine Elorrieta</a></div>
    <div class="page-link"><a href="cartelera.html">Películas</a></div>
    <div class="user-info">
        ${userInfo}
    </div>
    `;

/* Logout*/
if (usuario) {
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogueado");
    sessionStorage.removeItem("peliculaSeleccionada");
    window.location.href = "index.html";
  });
}
