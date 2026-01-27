import { sesiones, entradas, compras, clientes } from "./db.js";

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
    <div class="logo"><a href="index.html">Cine Elorrieta</a> <button id="reset-button">Reset</button></div>
    <div class="page-link"><a href="cartelera.html">Películas</a></div>
    <div class="user-info">
        ${userInfo}
    </div>
    `;

/* Logout*/
if (usuario) {
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", () => {
    limpiarSesionStorage();
    window.location.href = "index.html";
  });
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  resetStorage();
  console.log("LocalStorage reseteado a valores desde db.js.");
});

function limpiarSesionStorage() {
  sessionStorage.removeItem("usuarioLogueado");
  sessionStorage.removeItem("peliculaSeleccionada");
}

function limpiarLocalStorage() {
  localStorage.removeItem("clientes");
  localStorage.removeItem("sesiones");
  localStorage.removeItem("entradas");
  localStorage.removeItem("compras");
}

function resetStorage() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
  localStorage.setItem("sesiones", JSON.stringify(sesiones));
  localStorage.setItem("entradas", JSON.stringify(entradas));
  localStorage.setItem("compras", JSON.stringify(compras));
}
