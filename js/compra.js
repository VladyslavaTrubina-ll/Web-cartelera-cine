import { peliculas, sesiones, salas, entradas, compras } from "./db.js";

const infoPelicula = document.getElementById("infoPelicula");
const selectFecha = document.getElementById("selectFecha");
const selectHora = document.getElementById("selectHora");
const mensajeCompra = document.getElementById("mensajeCompra");
const inputCantidad = document.getElementById("cantidad");
const precioTotalTexto = document.getElementById("precioTotal");

// Recuperar película seleccionada
const idPelicula = localStorage.getItem("peliculaSeleccionada");
const pelicula = peliculas.find(p => p.idPelicula == idPelicula);

infoPelicula.innerHTML = `
    <h3>${pelicula.titulo}</h3>
    
`;

// Filtrar sesiones de esa película
const sesionesPelicula = sesiones.filter(s => s.idPelicula == idPelicula);

// Rellenar fechas
const fechasUnicas = [...new Set(sesionesPelicula.map(s => s.fecha))];

fechasUnicas.forEach(fecha => {
    const option = document.createElement("option");
    option.value = fecha;
    option.textContent = fecha;
    selectFecha.appendChild(option);
});

// Cuando cambia la fecha → rellenar horas
selectFecha.addEventListener("change", () => {
    const fechaSeleccionada = selectFecha.value;
    selectHora.innerHTML = "";

    const horas = sesionesPelicula.filter(s => s.fecha === fechaSeleccionada);

    horas.forEach(s => {
        const option = document.createElement("option");
        option.value = s.idSesion;
        option.textContent = s.horaInicio;
        selectHora.appendChild(option);
    });

    actualizarPrecio();
});

// Disparar una vez para cargar horas iniciales
selectFecha.value = fechasUnicas[0];
selectFecha.dispatchEvent(new Event("change"));

// Actualizar precio cuando cambia hora o cantidad
selectHora.addEventListener("change", actualizarPrecio);
inputCantidad.addEventListener("input", actualizarPrecio);

// Función para calcular el total
function actualizarPrecio() {
    const idSesion = selectHora.value;
    const cantidad = parseInt(inputCantidad.value);

    if (!idSesion || cantidad <= 0) {
        precioTotalTexto.textContent = "";
        return;
    }

    const sesion = sesiones.find(s => s.idSesion == idSesion);
    const total = cantidad * sesion.precio;

    precioTotalTexto.textContent = `Total a pagar: ${total.toFixed(2)} €`;
}

// Evento de compra
document.getElementById("btnComprar").addEventListener("click", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuario) {
        alert("Debes iniciar sesión para comprar entradas");
        window.location.href = "login.html";
        return;
    }

    const idSesion = selectHora.value;
    const cantidad = parseInt(inputCantidad.value);
    const pago = parseFloat(document.getElementById("pago").value);

    const sesion = sesiones.find(s => s.idSesion == idSesion);
    const sala = salas.find(sa => sa.idSala == sesion.idSala);

    const aforoDisponible = sala.numeroSillas - sesion.espectadores;

    if (cantidad > aforoDisponible) {
        mensajeCompra.textContent = "No hay suficientes asientos disponibles";
        mensajeCompra.style.color = "red";
        return;
    }

    const precioTotal = cantidad * sesion.precio;

    if (isNaN(pago) || pago < precioTotal) {
        mensajeCompra.textContent = "El pago es insuficiente";
        mensajeCompra.style.color = "red";
        return;
    }

    const cambio = pago - precioTotal;

    // Crear entrada
    const nuevaEntrada = {
        idEntrada: entradas.length + 1,
        idSesion: sesion.idSesion,
        idCliente: usuario.idCliente,
        cantidadPersonas: cantidad,
        precio: precioTotal,
        descuento: 0
    };

    entradas.push(nuevaEntrada);
    localStorage.setItem("entradas", JSON.stringify(entradas));

    // Crear compra
    const nuevaCompra = {
        idCompra: compras.length + 1,
        entradas: [nuevaEntrada.idEntrada],
        idCliente: usuario.idCliente,
        fecha: new Date().toISOString().split("T")[0],
        hora: new Date().toLocaleTimeString(),
        precioTotal: precioTotal,
        descuentoAplicado: 0
    };

    compras.push(nuevaCompra);
    localStorage.setItem("compras", JSON.stringify(compras));

    // Actualizar aforo
    sesion.espectadores += cantidad;
    localStorage.setItem("sesiones", JSON.stringify(sesiones));

    // Mostrar ticket completo
    mensajeCompra.innerHTML = `
        <strong>Compra realizada con éxito</strong><br><br>
        Película: ${pelicula.titulo}<br>
        Sala: ${sala.nombre}<br>
        Fecha: ${sesion.fecha}<br>
        Hora: ${sesion.horaInicio}<br>
        Entradas: ${cantidad}<br>
        Total: ${precioTotal.toFixed(2)} €<br>
        Pago: ${pago.toFixed(2)} €<br>
        Cambio: ${cambio.toFixed(2)} €<br>
    `;
    mensajeCompra.style.color = "green";
});
// Esperar 5 segundos y cerrar sesión + redirigir
setTimeout(() => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
}, 10000);
