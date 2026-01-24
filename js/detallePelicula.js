import { peliculas } from "./db.js";

const contenedor = document.getElementById("detallePelicula");

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
        
        <button id="comprar">Comprar entradas</button>
    `;
}

// Evento para comprar
document.addEventListener("click", (e) => {
  if (e.target.id === "comprar") {
    window.location.href = "compra.html";
  }
});
