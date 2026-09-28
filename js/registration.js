// --------------------------------------
// FORMULARIO: Registrar nuevo cliente
// --------------------------------------

import { clientes } from "./db.js";

var clientesStorage = JSON.parse(localStorage.getItem("clientes")) || clientes;

const form = document.getElementById("formRegistroCliente");
const mensaje = document.getElementById("mensaje");

console.log("form:", form);

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const dni = document.getElementById("dni").value;
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // --------------------------------------
    // VALIDACIONES: DNI y EMAIL ÚNICOS
    // --------------------------------------

    // Validar DNI repetido
    const dniExiste = clientesStorage.some((c) => c.dni === dni);
    if (dniExiste) {
      mensaje.textContent =
        "DNI is already registered. Redirecting to login...";
      mensaje.style.color = "red";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);

      return;
    }

    // Validar email repetido
    const emailExiste = clientesStorage.some((c) => c.email === email);
    if (emailExiste) {
      mensaje.textContent =
        "Email is already registered. Redirecting to login...";
      mensaje.style.color = "red";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);

      return;
    }

    // --------------------------------------
    // CREAR NUEVO CLIENTE
    // --------------------------------------

    const nuevoCliente = {
      idCliente: clientesStorage.length + 1,
      dni,
      nombre,
      apellidos,
      email,
      password,
    };

    clientesStorage.push(nuevoCliente);

    // Guardar en localStorage
    localStorage.setItem("clientes", JSON.stringify(clientesStorage));

    mensaje.textContent =
      "Customer registered successfully. Redirecting to login...";
    mensaje.style.color = "green";

    console.log("Cliente añadido:", nuevoCliente);
    console.log("Lista actualizada de clientes:", clientesStorage);

    // Limpiar formulario
    form.reset();

    // Redirección al login
    setTimeout(() => {
      console.log("Redirecting now...");
      window.location.href = "index.html";
    }, 2000);
  });
}
