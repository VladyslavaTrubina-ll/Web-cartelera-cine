// login.js
import { clientes } from "./db.js";

var clientesStorage = JSON.parse(localStorage.getItem("clientes")) || clientes;

const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  // Buscar cliente por email
  const clienteEncontrado = clientesStorage.find((c) => c.email === email);

  if (!clienteEncontrado) {
    mensajeLogin.textContent = "Email is not registered";
    mensajeLogin.style.color = "red";
    return;
  }

  // Validar contraseña
  if (clienteEncontrado.password !== password) {
    mensajeLogin.textContent = "Incorrect password";
    mensajeLogin.style.color = "red";
    return;
  }

  // Guardar sesión del usuario
  sessionStorage.setItem("usuarioLogueado", JSON.stringify(clienteEncontrado));

  mensajeLogin.textContent = "Login successful";
  mensajeLogin.style.color = "green";

  // Redirigir después de 1 segundo
  setTimeout(() => {
    window.location.href = "cartelera.html";
  }, 1000);
});
