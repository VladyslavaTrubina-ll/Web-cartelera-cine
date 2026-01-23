// login.js

// Cargar clientes desde localStorage
const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

const formLogin = document.getElementById("formLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    // Buscar cliente por email
    const clienteEncontrado = clientes.find(c => c.email === email);

    if (!clienteEncontrado) {
        mensajeLogin.textContent = "El email no está registrado";
        mensajeLogin.style.color = "red";
        return;
    }

    // Validar contraseña
    if (clienteEncontrado.password !== password) {
        mensajeLogin.textContent = "Contraseña incorrecta";
        mensajeLogin.style.color = "red";
        return;
    }

    // Guardar sesión del usuario
    localStorage.setItem("usuarioLogueado", JSON.stringify(clienteEncontrado));

    mensajeLogin.textContent = "Login exitoso";
    mensajeLogin.style.color = "green";

    // Redirigir después de 1 segundo
    setTimeout(() => {
        window.location.href = "cartelera.html";
    }, 1000);
});
