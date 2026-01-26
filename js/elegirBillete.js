import { peliculas, sesiones, salas } from "./db.js";
import { calcularPrecioYDescuento } from "./main.js";

// Prefer localStorage sessions if they exist so spectators stay in sync after compras
const sesionesStorage = JSON.parse(localStorage.getItem("sesiones")) || sesiones;

const contenedor = document.getElementById("info-pelicula");
const selectFecha = document.getElementById("selectFecha");
const selectSesion = document.getElementById("selectSesion");
const inputCantidad = document.getElementById("cantidad");
const mensajeError = document.getElementById("mensaje-error");
const precioTotal = document.getElementById("precioTotal");
const btnPagar = document.getElementById("btnPagar");

// Evento para manejar "Enter" en inputCantidad
// preventir form submit y unfocus al hacer Enter
inputCantidad.addEventListener("keydown", logKey);
function logKey(e) {
  if (e.code === "Enter") {
    e.preventDefault();
    if (inputCantidad.value >= 0 || !isNaN(inputCantidad.value)) {
      inputCantidad.blur();
    }
  }
}

// limpiar sessionStorage

function limpiar() {
  selectSesion.innerHTML = "<p>Seleccione una fecha primero</p>";

  inputCantidad.value = 0;
  inputCantidad.disabled = true;
  mensajeError.textContent = "";
  precioTotal.innerHTML = "";
  btnPagar.disabled = true;
}

limpiar();

// Recuperar la película seleccionada
const id = sessionStorage.getItem("peliculaSeleccionada");
const pelicula = peliculas.find((p) => p.idPelicula == id);

if (!pelicula) {
  contenedor.innerHTML = "<p>Error: película no encontrada</p>";
} else {
  contenedor.innerHTML = `
        <h2>${pelicula.titulo}</h2>
        <img src="${pelicula.foto}" alt="${pelicula.titulo}" 
        style="width:250px; border-radius:10px; margin-bottom:15px;">
 
        <p><strong>Género:</strong> ${pelicula.genero}</p>
        <p><strong>Duración:</strong> ${pelicula.duracion} min</p>
        <p><strong>Precio:</strong> ${pelicula.precio}</p>
        <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
        
    `;
}
// Filtrar sesiones de esa película
const sesionesPelicula = sesionesStorage.filter(
  (x) => x.idPelicula == pelicula.idPelicula,
);

// Rellenar fechas
const fechasUnicas = [...new Set(sesionesPelicula.map((s) => s.fecha))];

const numSesionesPorFecha = {};

fechasUnicas.forEach((fecha) => {
  numSesionesPorFecha[fecha] = sesionesPelicula.filter(
    (s) => s.fecha === fecha,
  ).length;
});

// FECHAS

fechasUnicas.forEach((fecha) => {
  var newFecha = document.createElement("label");
  newFecha.setAttribute("for", `${fecha}`);
  newFecha.innerHTML = `
            <div class="inputAndLeftText">
              <input
                id="${fecha}"
                type="radio"
                name="fecha"
                value="${fecha}"
              />
              <div>
                <span class="fecha-sesion">${fecha}</span>
                <span class="num-sesion">${numSesionesPorFecha[fecha]} sesiones</span>
              </div>
            </div>
  `;
  selectFecha.appendChild(newFecha);
});

let fechaSeleccionada = "";

function setFecha(event) {
  fechaSeleccionada = event.target.value;
  console.log("Fecha seleccionada:", fechaSeleccionada);
  limpiar();
  actualizarSesiones(fechaSeleccionada);
}

document.querySelectorAll("input[name='fecha']").forEach((input) => {
  input.addEventListener("change", setFecha); // event desde aqui
});

// SESIONES

function sillasDisponibles(sesion) {
  const sala = salas.find((sa) => sa.idSala == sesion.idSala);
  return sala.numeroSillas - sesion.espectadores;
}

function actualizarSesiones(fechaSeleccionada) {
  selectSesion.innerHTML = ""; // Limpiar sesiones anteriores

  const sesionesDeFecha = sesionesPelicula.filter(
    (s) => s.fecha === fechaSeleccionada,
  );

  // sort by horaInicio
  sesionesDeFecha.sort((a, b) => {
    const horaA = a.horaInicio.split(":").map(Number);
    const horaB = b.horaInicio.split(":").map(Number);
    return horaA[0] * 60 + horaA[1] - (horaB[0] * 60 + horaB[1]);
  });

  sesionesDeFecha.forEach((sesion) => {
    const aforoDisponible = sillasDisponibles(sesion);

    var newSesion = document.createElement("label");
    newSesion.setAttribute("for", `sesion-${sesion.idSesion}`);
    newSesion.innerHTML = `
            <div class="inputAndLeftText">
              <input
                id="sesion-${sesion.idSesion}"
                type="radio"
                name="sesion"
                value="${sesion.idSesion}"
              />
              <div>
                <span class="hora-sesion">${sesion.horaInicio}, sala ${sesion.idSala}</span>
                <span class="num-sillas">${aforoDisponible} sillas disponibles</span>
              </div>
            </div>
            <span class="precio">${sesion.precio.toFixed(2)} €</span>
  `;
    selectSesion.appendChild(newSesion);
  });

  addListenersSesiones();
}

let sesionSeleccionadaId = 0;
let sesionSeleccionada = null;

function setSesion(event) {
  sesionSeleccionadaId = event.target.value;
  console.log("Sesion seleccionada:", sesionSeleccionadaId);

  sesionSeleccionada = sesionesStorage.find((s) => s.idSesion == sesionSeleccionadaId);

  actualizarEntradas(sesionSeleccionada);

  inputCantidad.disabled = false;
}

function addListenersSesiones() {
  document.querySelectorAll("input[name='sesion']").forEach((input) => {
    input.addEventListener("change", setSesion); // event desde aqui
    input.addEventListener("change", actualizarPrecio); // event desde aqui
  });
}

function actualizarEntradas(sesionSeleccionada) {
  inputCantidad.max = sillasDisponibles(sesionSeleccionada);
}

inputCantidad.addEventListener("input", actualizarPrecio);

function verificarCantidad(cantidad, maximo) {
  if (cantidad <= 0 || isNaN(cantidad)) {
    mensajeError.textContent = "La cantidad debe ser mayor que 0";
    return false;
  } else if (cantidad > maximo) {
    mensajeError.textContent = "Solo " + maximo + " asientos disponibles";
    return false;
  } else {
    mensajeError.textContent = "";
    return true;
  }
}

function actualizarPrecio() {
  const cantidad = parseInt(inputCantidad.value);
  const maximo = parseInt(inputCantidad.max);

  console.log("Cantidad entrada:", cantidad);

  const cantidadValida = verificarCantidad(cantidad, maximo);

  const { precio, descuentoCalculado } = calcularPrecioYDescuento(
    cantidad,
    sesionSeleccionada.precio,
  );
  console.log("Precio calculado:", precio);

  if (cantidadValida) {
    precioTotal.innerHTML = `Total a pagar: ${precio.toFixed(2)}€ <span id="descuento"></span>`;

    // Mostrar descuento aplicado
    const descuento = document.getElementById("descuento");

    if (descuentoCalculado > 0) {
      descuento.textContent = `(${(descuentoCalculado * 100).toFixed(0)}% de descuento aplicado)`;
    } else {
      descuento.textContent = "";
    }
    btnPagar.disabled = false;
  } else {
    precioTotal.innerHTML = `Total a pagar: 0.00€ <span id="descuento"></span>`;

    btnPagar.disabled = true;
  }
}
