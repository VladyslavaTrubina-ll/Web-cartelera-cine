// db.js — Base de datos simulada del cine

//  Películas (no necesitan sessionStorage)
export const peliculas = [
  {
    idPelicula: 1,
    titulo: "Interstellar",
    duracion: 169,
    genero: "Ciencia ficción",
    precio: 8.5,
    foto: "img/interestellar.avif",
    sinopsis:
      "Un grupo de astronautas viaja a través de un agujero de gusano para salvar a la humanidad.",
  },
  {
    idPelicula: 2,
    titulo: "La La Land",
    duracion: 128,
    genero: "Musical",
    precio: 7.5,
    foto: "img/lalaland.jpg",
    sinopsis:
      "Una actriz y un pianista luchan por cumplir sus sueños en Los Ángeles mientras viven una historia de amor.",
  },
  {
    idPelicula: 3,
    titulo: "El Señor de los Anillos: La Comunidad del Anillo",
    duracion: 178,
    genero: "Fantasía",
    precio: 9.0,
    foto: "img/elSeñorAnillos.jpg",
    sinopsis:
      "Frodo inicia un viaje épico para destruir un anillo que podría condenar a la Tierra Media.",
  },
  {
    idPelicula: 4,
    titulo: "Avatar",
    duracion: 162,
    genero: "Ciencia ficción",
    precio: 8.0,
    foto: "img/avatar.jpg",
    sinopsis:
      "Un exmarine se une a los Na'vi en el planeta Pandora mientras se debate entre dos mundos.",
  },
  {
    idPelicula: 5,
    titulo: "Coco",
    duracion: 105,
    genero: "Animación",
    precio: 6.5,
    foto: "img/coco.webp",
    sinopsis:
      "Miguel viaja al Mundo de los Muertos para descubrir la verdad sobre su familia y su pasión por la música.",
  },
  {
    idPelicula: 6,
    titulo: "Joker",
    duracion: 122,
    genero: "Drama",
    precio: 7.8,
    foto: "img/joker.jpg",
    sinopsis:
      "Arthur Fleck, un comediante fallido, desciende a la locura y se convierte en el Joker.",
  },
];

// 🏛️ Salas (no necesitan sessionStorage)
export const salas = [
  { idSala: 1, nombre: "Sala Principal", numeroSillas: 150, sesiones: [1, 2] },
  { idSala: 2, nombre: "Sala Azul", numeroSillas: 100, sesiones: [3] },
  { idSala: 3, nombre: "Sala Roja", numeroSillas: 80, sesiones: [4, 5] },
  { idSala: 4, nombre: "Sala VIP", numeroSillas: 40, sesiones: [6] },
  { idSala: 5, nombre: "Sala Junior", numeroSillas: 60, sesiones: [] },
  { idSala: 6, nombre: "Sala 3D", numeroSillas: 120, sesiones: [] },
];

// -----------------------------
// SESIONES
// -----------------------------
const sesionesBase = [
  {
    idSesion: 10,
    fecha: "2025-03-15",
    horaInicio: "18:00",
    horaFin: "20:50",
    idSala: 1,
    idPelicula: 1,
    precio: 8.5,
    espectadores: 45,
  },
  {
    idSesion: 11,
    fecha: "2025-03-15",
    horaInicio: "21:00",
    horaFin: "23:50",
    idSala: 1,
    idPelicula: 1,
    precio: 8.5,
    espectadores: 45,
  },
  {
    idSesion: 12,
    fecha: "2025-03-16",
    horaInicio: "18:00",
    horaFin: "20:50",
    idSala: 1,
    idPelicula: 1,
    precio: 8.5,
    espectadores: 45,
  },
  {
    idSesion: 13,
    fecha: "2025-03-16",
    horaInicio: "13:00",
    horaFin: "15:50",
    idSala: 1,
    idPelicula: 1,
    precio: 8.5,
    espectadores: 45,
  },
  {
    idSesion: 14,
    fecha: "2025-03-16",
    horaInicio: "22:00",
    horaFin: "00:50",
    idSala: 1,
    idPelicula: 1,
    precio: 8.5,
    espectadores: 80,
  },
  {
    idSesion: 2,
    fecha: "2025-03-15",
    horaInicio: "21:00",
    horaFin: "23:10",
    idSala: 1,
    idPelicula: 2,
    precio: 7.5,
    espectadores: 30,
  },
  {
    idSesion: 3,
    fecha: "2025-03-16",
    horaInicio: "17:00",
    horaFin: "20:00",
    idSala: 2,
    idPelicula: 3,
    precio: 9.0,
    espectadores: 70,
  },
  {
    idSesion: 4,
    fecha: "2025-03-16",
    horaInicio: "19:00",
    horaFin: "21:40",
    idSala: 3,
    idPelicula: 4,
    precio: 8.0,
    espectadores: 50,
  },
  {
    idSesion: 5,
    fecha: "2025-03-17",
    horaInicio: "16:00",
    horaFin: "17:50",
    idSala: 3,
    idPelicula: 5,
    precio: 6.5,
    espectadores: 20,
  },
  {
    idSesion: 6,
    fecha: "2025-03-17",
    horaInicio: "22:00",
    horaFin: "00:05",
    idSala: 4,
    idPelicula: 6,
    precio: 7.8,
    espectadores: 35,
  },
];

export const sesiones = sesionesBase;

// -----------------------------
// ENTRADAS
// -----------------------------
const entradasBase = [
  {
    idEntrada: 1,
    idSesion: 1,
    cantidadPersonas: 2,
    precio: 17.0,
    descuento: 0.1,
  },
  { idEntrada: 2, idSesion: 2, cantidadPersonas: 1, precio: 7.5, descuento: 0 },
  {
    idEntrada: 3,
    idSesion: 3,
    cantidadPersonas: 3,
    precio: 27.0,
    descuento: 0.05,
  },
  {
    idEntrada: 4,
    idSesion: 4,
    cantidadPersonas: 2,
    precio: 16.0,
    descuento: 0,
  },
  {
    idEntrada: 5,
    idSesion: 5,
    cantidadPersonas: 4,
    precio: 26.0,
    descuento: 0.1,
  },
  { idEntrada: 6, idSesion: 6, cantidadPersonas: 1, precio: 7.8, descuento: 0 },
];

export const entradas =
  JSON.parse(sessionStorage.getItem("entradas")) || entradasBase;

// -----------------------------
// COMPRAS
// -----------------------------
const comprasBase = [
  {
    idCompra: 1,
    entradas: [1],
    idCliente: 1,
    fecha: "2025-03-10",
    hora: "19:45",
    precioTotal: 17.0,
    descuentoAplicado: 0.1,
  },
  {
    idCompra: 2,
    entradas: [2, 3],
    idCliente: 2,
    fecha: "2025-03-11",
    hora: "20:10",
    precioTotal: 34.5,
    descuentoAplicado: 0.05,
  },
  {
    idCompra: 3,
    entradas: [4],
    idCliente: 3,
    fecha: "2025-03-12",
    hora: "18:30",
    precioTotal: 16.0,
    descuentoAplicado: 0,
  },
  {
    idCompra: 4,
    entradas: [5],
    idCliente: 4,
    fecha: "2025-03-13",
    hora: "17:00",
    precioTotal: 26.0,
    descuentoAplicado: 0.1,
  },
  {
    idCompra: 5,
    entradas: [6],
    idCliente: 5,
    fecha: "2025-03-14",
    hora: "22:30",
    precioTotal: 7.8,
    descuentoAplicado: 0,
  },
  {
    idCompra: 6,
    entradas: [1, 2],
    idCliente: 6,
    fecha: "2025-03-15",
    hora: "15:20",
    precioTotal: 24.5,
    descuentoAplicado: 0.05,
  },
];

export const compras =
  JSON.parse(sessionStorage.getItem("compras")) || comprasBase;

// -----------------------------
// CLIENTES
// -----------------------------
const clientesBase = [
  {
    idCliente: 1,
    dni: "12345678A",
    nombre: "Juan",
    apellidos: "Pérez Gómez",
    email: "juan@example.com",
    password: "1234",
  },
];

export const clientes =
  JSON.parse(sessionStorage.getItem("clientes")) || clientesBase;
