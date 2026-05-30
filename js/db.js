// db.js — Base de datos simulada del cine

//  Películas
export const peliculas = [
  {
    idPelicula: 1,
    titulo: "Interstellar",
    duracion: 169,
    genero: "Science Fiction",
    precio: 8.5,
    foto: "img/interestellar.avif",
    sinopsis:
      "A group of astronauts travels through a wormhole to save humanity.",
  },
  {
    idPelicula: 2,
    titulo: "La La Land",
    duracion: 128,
    genero: "Musical",
    precio: 7.5,
    foto: "img/lalaland.jpg",
    sinopsis:
      "An actress and a pianist chase their dreams in Los Angeles while living a love story.",
  },
  {
    idPelicula: 3,
    titulo: "El Señor de los Anillos: La Comunidad del Anillo",
    duracion: 178,
    genero: "Fantasy",
    precio: 9.0,
    foto: "img/elSeñorAnillos.jpg",
    sinopsis:
      "Frodo begins an epic journey to destroy a ring that could doom Middle-earth.",
  },
  {
    idPelicula: 4,
    titulo: "Avatar",
    duracion: 162,
    genero: "Science Fiction",
    precio: 8.0,
    foto: "img/avatar.jpg",
    sinopsis:
      "A former marine joins the Na'vi on Pandora while torn between two worlds.",
  },
  {
    idPelicula: 5,
    titulo: "Coco",
    duracion: 105,
    genero: "Animation",
    precio: 6.5,
    foto: "img/coco.webp",
    sinopsis:
      "Miguel travels to the Land of the Dead to discover the truth about his family and his passion for music.",
  },
  {
    idPelicula: 6,
    titulo: "Joker",
    duracion: 122,
    genero: "Drama",
    precio: 7.8,
    foto: "img/joker.jpg",
    sinopsis:
      "Arthur Fleck, a failed comedian, descends into madness and becomes the Joker.",
  },
];

// Salas
export const salas = [
  {
    idSala: 1,
    nombre: "Main Hall",
    numeroSillas: 150,
    sesiones: [10, 11, 12, 13, 14, 1, 2],
  },
  {
    idSala: 2,
    nombre: "Blue Hall",
    numeroSillas: 100,
    sesiones: [20, 21, 22, 3, 32, 42],
  },
  {
    idSala: 3,
    nombre: "Red Hall",
    numeroSillas: 80,
    sesiones: [23, 30, 4, 41, 5, 62],
  },
  {
    idSala: 4,
    nombre: "VIP Hall",
    numeroSillas: 40,
    sesiones: [6, 60, 61, 63],
  },
  {
    idSala: 5,
    nombre: "Junior Hall",
    numeroSillas: 60,
    sesiones: [50, 51, 52, 53, 54],
  },
  {
    idSala: 6,
    nombre: "3D Hall",
    numeroSillas: 120,
    sesiones: [31, 33, 40, 43],
  },
];

// -----------------------------
// SESIONES
// -----------------------------
var sesionesBase = [
  {
    idSesion: 10,
    fecha: "2025-03-15",
    horaInicio: "18:00",
    horaFin: "20:50",
    idSala: 1,
    idPelicula: 1,
    precio: 10.5,
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
    precio: 8.0,
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
    precio: 9.5,
    espectadores: 80,
  },
  {
    idSesion: 1,
    fecha: "2025-03-15",
    horaInicio: "13:00",
    horaFin: "15:10",
    idSala: 1,
    idPelicula: 2,
    precio: 8.5,
    espectadores: 30,
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
    idSesion: 20,
    fecha: "2025-03-16",
    horaInicio: "16:00",
    horaFin: "18:10",
    idSala: 2,
    idPelicula: 2,
    precio: 7.5,
    espectadores: 25,
  },
  {
    idSesion: 21,
    fecha: "2025-03-17",
    horaInicio: "19:30",
    horaFin: "21:40",
    idSala: 2,
    idPelicula: 2,
    precio: 8.0,
    espectadores: 40,
  },
  {
    idSesion: 22,
    fecha: "2025-03-15",
    horaInicio: "17:00",
    horaFin: "19:10",
    idSala: 2,
    idPelicula: 2,
    precio: 7.8,
    espectadores: 35,
  },
  {
    idSesion: 23,
    fecha: "2025-03-16",
    horaInicio: "12:30",
    horaFin: "14:40",
    idSala: 3,
    idPelicula: 2,
    precio: 7.0,
    espectadores: 28,
  },
  // Película 3: El Señor de los Anillos (178 min)
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
    idSesion: 30,
    fecha: "2025-03-15",
    horaInicio: "14:00",
    horaFin: "17:00",
    idSala: 3,
    idPelicula: 3,
    precio: 9.0,
    espectadores: 60,
  },
  {
    idSesion: 31,
    fecha: "2025-03-17",
    horaInicio: "20:00",
    horaFin: "23:00",
    idSala: 6,
    idPelicula: 3,
    precio: 10.0,
    espectadores: 80,
  },
  {
    idSesion: 32,
    fecha: "2025-03-15",
    horaInicio: "18:30",
    horaFin: "21:30",
    idSala: 2,
    idPelicula: 3,
    precio: 9.5,
    espectadores: 75,
  },
  {
    idSesion: 33,
    fecha: "2025-03-16",
    horaInicio: "13:00",
    horaFin: "16:00",
    idSala: 6,
    idPelicula: 3,
    precio: 9.0,
    espectadores: 68,
  },
  // Película 4: Avatar (162 min)
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
    idSesion: 40,
    fecha: "2025-03-15",
    horaInicio: "17:30",
    horaFin: "20:15",
    idSala: 6,
    idPelicula: 4,
    precio: 9.0,
    espectadores: 90,
  },
  {
    idSesion: 41,
    fecha: "2025-03-17",
    horaInicio: "15:00",
    horaFin: "17:45",
    idSala: 3,
    idPelicula: 4,
    precio: 8.5,
    espectadores: 65,
  },
  {
    idSesion: 42,
    fecha: "2025-03-15",
    horaInicio: "13:30",
    horaFin: "16:15",
    idSala: 2,
    idPelicula: 4,
    precio: 8.0,
    espectadores: 55,
  },
  {
    idSesion: 43,
    fecha: "2025-03-16",
    horaInicio: "22:00",
    horaFin: "00:45",
    idSala: 6,
    idPelicula: 4,
    precio: 9.5,
    espectadores: 95,
  },
  // Película 5: Coco (105 min)
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
    idSesion: 50,
    fecha: "2025-03-15",
    horaInicio: "12:00",
    horaFin: "13:50",
    idSala: 5,
    idPelicula: 5,
    precio: 6.0,
    espectadores: 45,
  },
  {
    idSesion: 51,
    fecha: "2025-03-16",
    horaInicio: "11:00",
    horaFin: "12:50",
    idSala: 5,
    idPelicula: 5,
    precio: 6.0,
    espectadores: 38,
  },
  {
    idSesion: 52,
    fecha: "2025-03-17",
    horaInicio: "13:30",
    horaFin: "15:20",
    idSala: 5,
    idPelicula: 5,
    precio: 6.5,
    espectadores: 50,
  },
  {
    idSesion: 53,
    fecha: "2025-03-15",
    horaInicio: "15:00",
    horaFin: "16:50",
    idSala: 5,
    idPelicula: 5,
    precio: 6.5,
    espectadores: 42,
  },
  {
    idSesion: 54,
    fecha: "2025-03-16",
    horaInicio: "14:30",
    horaFin: "16:20",
    idSala: 5,
    idPelicula: 5,
    precio: 6.5,
    espectadores: 48,
  },
  // Película 6: Joker (122 min)
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
  {
    idSesion: 60,
    fecha: "2025-03-15",
    horaInicio: "20:00",
    horaFin: "22:05",
    idSala: 4,
    idPelicula: 6,
    precio: 8.0,
    espectadores: 38,
  },
  {
    idSesion: 61,
    fecha: "2025-03-16",
    horaInicio: "21:30",
    horaFin: "23:35",
    idSala: 4,
    idPelicula: 6,
    precio: 7.8,
    espectadores: 40,
  },
  {
    idSesion: 62,
    fecha: "2025-03-15",
    horaInicio: "23:00",
    horaFin: "01:05",
    idSala: 3,
    idPelicula: 6,
    precio: 8.5,
    espectadores: 42,
  },
  {
    idSesion: 63,
    fecha: "2025-03-17",
    horaInicio: "18:30",
    horaFin: "20:35",
    idSala: 4,
    idPelicula: 6,
    precio: 7.8,
    espectadores: 36,
  },
];

export var sesiones = sesionesBase;

// -----------------------------
// ENTRADAS
// idEntrada, idSesion, precioEntrada (precioTotal / numEntradas)
//
// -----------------------------
var entradasBase = [
  {
    idEntrada: 1,
    idSesion: 1,
    idCliente: 1,
    precioEntrada: 17.0,
  },
  { idEntrada: 2, idSesion: 2, idCliente: 1, precioEntrada: 7.5 },
  {
    idEntrada: 3,
    idSesion: 3,
    idCliente: 1,
    precioEntrada: 27.0,
  },
  {
    idEntrada: 4,
    idSesion: 4,
    idCliente: 1,
    precioEntrada: 16.0,
  },
  {
    idEntrada: 5,
    idSesion: 5,
    idCliente: 1,
    precioEntrada: 26.0,
  },
  { idEntrada: 6, idSesion: 6, idCliente: 1, precioEntrada: 7.8 },
];

export var entradas = entradasBase;

// -----------------------------
// COMPRAS
// idCompra, entradas (array de idEntrada), idCliente, fecha, hora, precioTotal, descuentoAplicado
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
];

export const compras = comprasBase;

// -----------------------------
// CLIENTES
// -----------------------------
var clientesBase = [
  {
    idCliente: 1,
    dni: "12345678A",
    nombre: "Juan",
    apellidos: "Pérez Gómez",
    email: "juan@example.com",
    password: "1234",
  },
];

export var clientes = clientesBase;
