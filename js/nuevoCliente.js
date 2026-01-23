// --------------------------------------
// FORMULARIO: Registrar nuevo cliente
// --------------------------------------

import { generarID } from "./idGenerator.js";
import { clientes } from "./db.js";

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
        const dniExiste = clientes.some(c => c.dni === dni);
        if (dniExiste) {
            mensaje.textContent = "El DNI ya está registrado. Redirigiendo al login...";
            mensaje.style.color = "red";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

            return;
        }

        // Validar email repetido
        const emailExiste = clientes.some(c => c.email === email);
        if (emailExiste) {
            mensaje.textContent = "El correo electrónico ya está registrado. Redirigiendo al login...";
            mensaje.style.color = "red";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

            return;
        }

        // --------------------------------------
        // CREAR NUEVO CLIENTE
        // --------------------------------------

        const nuevoCliente = {
            idCliente: clientes.length + 1,
            dni,
            nombre,
            apellidos,
            email,
            password
        };

        clientes.push(nuevoCliente);

        // Guardar en localStorage
        localStorage.setItem("clientes", JSON.stringify(clientes));

        mensaje.textContent = "Cliente registrado correctamente. Redirigiendo al login...";
        mensaje.style.color = "green";

        console.log("Cliente añadido:", nuevoCliente);
        console.log("Lista actualizada de clientes:", clientes);

        // Limpiar formulario
        form.reset();

        // Redirección al login
        setTimeout(() => {
            console.log("Redirigiendo ahora...");
            window.location.href = "login.html";
        }, 2000);
    });
}
