import { peliculas, sesiones, salas } from "./db.js";
import { calcularPrecio } from "./main.js";

const contenedor = document.getElementById("detallePelicula");
const selectFecha = document.getElementById("selectFecha");
const selectSesion = document.getElementById("selectSesion");
const inputCantidad = document.getElementById("cantidad");
const mensajeError = document.getElementById("mensaje-error");
const precioTotal = document.getElementById("precioTotal");
const btnPagar = document.getElementById("btnPagar");

// limpiar sessionStorage

function limpiarSessionStorage() {
  sessionStorage.removeItem("sesionSeleccionada");
  sessionStorage.removeItem("cantidadEntradas");
  sessionStorage.removeItem("precioTotal");

  selectSesion.innerHTML = "<p>Seleccione una fecha primero</p>";

  inputCantidad.value = 0;
  inputCantidad.disabled = true;
  mensajeError.textContent = "";
  precioTotal.innerHTML = "";
  btnPagar.disabled = true;
}

limpiarSessionStorage();

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
const sesionesPelicula = sesiones.filter(
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
  limpiarSessionStorage();
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

function setSesion(event) {
  sesionSeleccionadaId = event.target.value;
  console.log("Sesion seleccionada:", sesionSeleccionadaId);

  var sesionSeleccionada = sesiones.find(
    (s) => s.idSesion == sesionSeleccionadaId,
  );

  actualizarEntradas(sesionSeleccionada);

  sessionStorage.setItem(
    "sesionSeleccionada",
    JSON.stringify(sesionSeleccionada),
  );

  inputCantidad.disabled = false;
}

function addListenersSesiones() {
  document.querySelectorAll("input[name='sesion']").forEach((input) => {
    input.addEventListener("change", setSesion); // event desde aqui
  });
}

function actualizarEntradas(sesionSeleccionada) {
  inputCantidad.max = sillasDisponibles(sesionSeleccionada);
}

inputCantidad.addEventListener("change", verificarCantidad);
inputCantidad.addEventListener("input", actualizarPrecio);

function verificarCantidad() {
  const cantidad = parseInt(inputCantidad.value);
  const maximo = parseInt(inputCantidad.max);
  if (cantidad <= 0) {
    mensajeError.textContent = "La cantidad debe ser mayor que 0";
    sessionStorage.removeItem("cantidadEntradas");
    btnPagar.disabled = true;
    return;
  }
  if (cantidad > maximo) {
    mensajeError.textContent = "Solo " + maximo + " asientos disponibles";
    sessionStorage.removeItem("cantidadEntradas");
    btnPagar.disabled = true;
  } else {
    mensajeError.textContent = "";
    sessionStorage.setItem("cantidadEntradas", cantidad);
    btnPagar.disabled = false;
  }
}

function actualizarPrecio() {
  const sesion = JSON.parse(sessionStorage.getItem("sesionSeleccionada"));
  const cantidad = parseInt(inputCantidad.value);
  const total = calcularPrecio(cantidad, sesion.precio);

  if (cantidad > 0) {
    precioTotal.innerHTML = `Total a pagar: ${total.toFixed(2)}€ <span id="descuento"></span>`;

    sessionStorage.setItem("precioTotal", total.toFixed(2));

    // Mostrar descuento aplicado
    const descuento = document.getElementById("descuento");

    if (cantidad >= 3) {
      descuento.textContent = "(30% de descuento aplicado)";
    } else if (cantidad == 2) {
      descuento.textContent = "(20% de descuento aplicado)";
    } else {
      descuento.textContent = "";
    }
  } else {
    precioTotal.innerHTML = `Total a pagar: 0.00€ <span id="descuento"></span>`;
    sessionStorage.removeItem("precioTotal");
  }
}

// Evento para comprar
document.addEventListener("click", (e) => {
  if (e.target.id === "btnPagar") {
    window.location.href = "compra.html";
  }
});
