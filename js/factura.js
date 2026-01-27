import { peliculas, sesiones, salas, entradas, compras } from "./db.js";

const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
if (!usuario) {
  window.location.href = "index.html";
}

// Load compras, sesiones y entradas from localStorage if available
// if not, use the ones from db.js
var comprasStorage = JSON.parse(localStorage.getItem("compras")) || compras;
var sesionesStorage = JSON.parse(localStorage.getItem("sesiones")) || sesiones;
var entradasStorage = JSON.parse(localStorage.getItem("entradas")) || entradas;

let params = new URLSearchParams(document.location.search);
let idCompra = params.get("idCompra");

// Validar que el parámetro exista
if (!idCompra) {
  window.location.href = "cartelera.html";
}

var compra = comprasStorage.find((c) => c.idCompra == idCompra);
const primeraEntrada = entradasStorage.find((e) =>
  compra.entradas.includes(e.idEntrada),
);
const sesion = sesionesStorage.find(
  (s) => s.idSesion == primeraEntrada.idSesion,
);
const pelicula = peliculas.find((p) => p.idPelicula == sesion?.idPelicula);
const sala = salas.find((s) => s.idSala == sesion?.idSala);

const peliculaNombre = document.getElementById("factura-pelicula-nombre");
const sesionFecha = document.getElementById("factura-fecha");
const sesionHoraInicio = document.getElementById("factura-horaInicio");
const sesionHoraFinal = document.getElementById("factura-horaFinal");
const sesionSala = document.getElementById("factura-sala");
const precioUnitario = document.getElementById("factura-precioUnitario");
const cantidadEntradas = document.getElementById("factura-cantidadEntradas");
const descuentoAplicado = document.getElementById("factura-descuentoAplicado");
const precioTotal = document.getElementById("factura-precioTotal");
const nomApellidosCliente = document.getElementById("user-nomAp");

nomApellidosCliente.textContent = `${usuario.nombre} ${usuario.apellidos}`;

console.log(compra);

const cantidadEntradasCompra = compra.entradas.length;
const precioUnitarioCompra = (
  compra.precioTotal / cantidadEntradasCompra
).toFixed(2);

nomApellidosCliente.textContent = `${usuario.nombre} ${usuario.apellidos}`;
peliculaNombre.textContent = pelicula?.titulo;
sesionFecha.textContent = sesion?.fecha;
sesionHoraInicio.textContent = sesion?.horaInicio;
sesionHoraFinal.textContent = sesion?.horaFin;
sesionSala.textContent = sala?.nombre;
precioUnitario.textContent = precioUnitarioCompra;
cantidadEntradas.textContent = cantidadEntradasCompra;
descuentoAplicado.textContent = (compra.descuentoAplicado * 100).toFixed(0);
precioTotal.textContent = compra.precioTotal.toFixed(2);

//gvargar cillas compradas
const entradasLista = document.getElementById("factura-entradas-lista");

if (entradasLista && compra?.entradas?.length) {
  entradasLista.innerHTML = "";
  compra.entradas.forEach((idEntrada) => {
    const entrada = entradasStorage.find((e) => e.idEntrada == idEntrada);
    if (!entrada) return;
    const li = document.createElement("li");
    const precio = entrada.precioEntrada ?? precioUnitarioCompra;
    li.textContent = `Entrada #${entrada.idEntrada} — Asiento: ${entrada.numSilla ?? "-"} — Precio: ${Number(precio).toFixed(2)}€`;
    entradasLista.appendChild(li);
  });
}
// ...existing code...

// Botón volver a películas
const btnVolver = document.getElementById("btnVolver");
btnVolver.addEventListener("click", () => {
  window.location.href = "cartelera.html";
});

setTimeout(() => {
  sessionStorage.removeItem("usuarioLogueado");
  window.location.href = "index.html";
}, 1000000);
