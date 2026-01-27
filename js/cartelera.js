import { peliculas } from "./db.js";

sessionStorage.removeItem("peliculaSeleccionada");
//Esto evita que alguien entra a cartelera sin login
const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

if (!usuario) {
  window.location.href = "index.html";
}

// Contenedor donde se mostrarán las películas
const listaPeliculas = document.getElementById("listaPeliculas");

// Mostrar todas las películas
peliculas.forEach((pelicula) => {
  const card = document.createElement("div");
  card.classList.add("pelicula-card");

  card.innerHTML = `
    <img src="${pelicula.foto}" alt="${pelicula.titulo}" class="poster">
     <h3>${pelicula.titulo}</h3>
      <p>${pelicula.genero}</p> 
      <button data-id="${pelicula.idPelicula}">Ver detalles</button> `;

  listaPeliculas.appendChild(card);
});

// Detectar clic en "Ver detalles"
listaPeliculas.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-id");

    // Guardar la película seleccionada
    sessionStorage.setItem("peliculaSeleccionada", id);

    // Ir a la página de detalles
    window.location.href = "pelicula.html";
  }
});
