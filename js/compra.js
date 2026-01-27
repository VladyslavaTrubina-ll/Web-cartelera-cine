import { peliculas, sesiones, salas, entradas, compras } from "./db.js";
import { calcularPrecioYDescuento } from "./main.js";

const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
if (!usuario) {
  window.location.href = "index.html";
}

// Load sesiones, entradas y compras from localStorage if available
// if not, use the ones from db.js
var sesionesStorage = JSON.parse(localStorage.getItem("sesiones")) || sesiones;
var entradasStorage = JSON.parse(localStorage.getItem("entradas")) || entradas;
var comprasStorage = JSON.parse(localStorage.getItem("compras")) || compras;

const peliculaNombre = document.getElementById("pelicula-nombre");
const sesionFecha = document.getElementById("sesion-fecha");
const sesionHoraInicio = document.getElementById("sesion-horaInicio");
const sesionHoraFinal = document.getElementById("sesion-horaFinal");
const sesionSala = document.getElementById("sesion-sala");
const precioUnitario = document.getElementById("precioUnitario");
const cantidadEntradas = document.getElementById("cantidadEntradas");
const descuentoAplicado = document.getElementById("descuentoAplicado");
const precioTotal = document.getElementById("precioTotal");

const inputPago = document.getElementById("importe");
const btnPagar = document.getElementById("btnPagar");
const mensajeCompra = document.getElementById("mensajeCompra");

let params = new URLSearchParams(document.location.search);
let sesionSeleccionadaId = params.get("sesion");
let cantidad = parseInt(params.get("cantidad"));

// Validar que los parámetros existan
if (!sesionSeleccionadaId || !cantidad) {
  // alert("Error: Parámetros faltantes en la URL");
  window.location.href = "cartelera.html";
}

// Evento para manejar "Enter" en inputPago
// preventir form submit y unfocus al hacer Enter
inputPago.addEventListener("keydown", logKey);
function logKey(e) {
  if (e.code === "Enter") {
    e.preventDefault();
    if (inputPago.value >= 0 || !isNaN(inputPago.value)) {
      inputPago.blur();
    }
  }
}

/*Mostrar información sobre la compra */

var sesion = sesionesStorage.find((s) => s.idSesion == sesionSeleccionadaId);

// Si no se encuentra la sesión, puede ser que el localStorage esté desactualizado.
if (!sesion) {
  // Re-sincronizar con la base de datos en memoria (db.js)
  sesionesStorage = sesiones;
  localStorage.setItem("sesiones", JSON.stringify(sesionesStorage));
  sesion = sesionesStorage.find((s) => s.idSesion == sesionSeleccionadaId);
}

// Validar que la sesión exista
if (!sesion) {
  // alert("Error: Sesión no encontrada");
  window.location.href = "cartelera.html";
}

const peliculaSeleccionada = peliculas.find(
  (p) => p.idPelicula == sesion.idPelicula,
);
peliculaNombre.textContent = peliculaSeleccionada.titulo;

sesionFecha.textContent = sesion.fecha;
sesionHoraInicio.textContent = sesion.horaInicio;
sesionHoraFinal.textContent = sesion.horaFin;

const salaNombre = salas.find((s) => s.idSala == sesion.idSala).nombre;
sesionSala.textContent = salaNombre;

// Info entrada

precioUnitario.textContent = sesion.precio.toFixed(2);

cantidadEntradas.textContent = cantidad;

const { precio: precioTotalValue, descuentoCalculado: descuento } =
  calcularPrecioYDescuento(cantidad, sesion.precio);
descuentoAplicado.textContent = (descuento * 100).toFixed(0);

precioTotal.textContent = precioTotalValue.toFixed(2);

// Pago
let cambio = 0.0;

inputPago.addEventListener("change", verificarDinero);
inputPago.addEventListener("input", verificarDinero);

function verificarDinero() {
  const dinero = parseFloat(inputPago.value);
  cambio = dinero - precioTotalValue;
  if (dinero <= 0 || isNaN(dinero)) {
    mensajeCompra.textContent = "La cantidad debe ser mayor que 0";
    mensajeCompra.style.color = "red";
    btnPagar.disabled = true;
  } else if (dinero < precioTotalValue) {
    mensajeCompra.textContent = "Se faltan " + (-cambio).toFixed(2) + " euros";
    mensajeCompra.style.color = "red";
    btnPagar.disabled = true;
  } else {
    mensajeCompra.textContent = "Su cambio es " + cambio.toFixed(2) + " euros";
    mensajeCompra.style.color = "green";
    btnPagar.disabled = false;
  }

  inputCambio.setAttribute("value", cambio.toFixed(2));
}

const formPago = document.getElementById("form-pago");

const inputCambio = document.createElement("input");
inputCambio.setAttribute("name", "cambio");
inputCambio.setAttribute("type", "hidden");
formPago.appendChild(inputCambio);

const inputCompraId = document.createElement("input");
inputCompraId.setAttribute("name", "idCompra");
inputCompraId.setAttribute("type", "hidden");
formPago.appendChild(inputCompraId);

// Evento de compra
document.getElementById("btnPagar").addEventListener("click", () => {
  // actualizar espectadores en DB
  sesion.espectadores += cantidad;
  localStorage.setItem("sesiones", JSON.stringify(sesionesStorage));
  //guardar entradas en db
  const entradasIds = guardarEntradas();

  //guardar factura (compra)
  const compraId = guardarCompra(entradasIds);

  // guardar idCompra -> anadir a payload de POST
  inputCompraId.setAttribute("value", compraId);
  console.log("Compra realizada:", compraId);

  formPago.submit();
});

function guardarEntradas() {
  // Crear entrada
  const precioEntrada = (precioTotalValue / cantidad).toFixed(2);

  let entradasIds = [];

  for (let i = 0; i < cantidad; i++) {
    const idEntrada = entradasStorage.length + 1;

    const nuevaEntrada = {
      idEntrada: idEntrada,
      idSesion: sesion.idSesion,
      idCliente: usuario.idCliente,
      precioEntrada: parseFloat(precioEntrada),
    };

    entradasStorage.push(nuevaEntrada);
    entradasIds.push(idEntrada);

    localStorage.setItem("entradas", JSON.stringify(entradasStorage));
  }

  console.log(entradasStorage);
  return entradasIds;
}

function guardarCompra(entradasIds) {
  // Crear compra
  const idCompra = comprasStorage.length + 1;

  // Crear compra
  const nuevaCompra = {
    idCompra: idCompra,
    entradas: entradasIds,
    idCliente: usuario.idCliente,
    fecha: new Date().toISOString().split("T")[0],
    hora: new Date().toLocaleTimeString(),
    precioTotal: precioTotalValue,
    descuentoAplicado: descuento,
  };

  comprasStorage.push(nuevaCompra);
  localStorage.setItem("compras", JSON.stringify(comprasStorage));

  return idCompra;
}
