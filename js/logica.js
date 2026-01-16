// 1. SELECCIÓN DE ELEMENTOS DEL DOM (U3.11 - Intro)
const formulario = document.querySelector('#formularioAcceso');
const inputNombre = document.querySelector('#nombreUsuario');
const inputContraseña = document.querySelector('#contraseña');
const divMensaje = document.querySelector('#mensajeResultado');

// 2. GESTIÓN DE EVENTOS (U3.12 - Eventos)
// Usamos 'addEventListener' que es la forma recomendada en los apuntes
formulario.addEventListener('submit', function (evento) {

    // 3. PREVENIR EL ENVÍO DEL FORMULARIO (U3.13 - Formularios)
    // Esto evita que la página se recargue al pulsar el botón
    evento.preventDefault();

    // Reiniciamos estilos del mensaje
    divMensaje.style.display = 'block';
    divMensaje.className = ''; // Limpiamos clases anteriores (error/success)

    // Obtenemos los valores
    // .trim() elimina espacios en blanco al inicio y final
    const nombre = inputNombre.value.trim();
    const contraseña = inputContraseña.value.trim();

    // 4. LÓGICA DE VALIDACIÓN (U3.02 )

    // Validación 1: El nombre no puede estar vacío
    if (nombre === "") {
        mostrarMensaje("Por favor, introduce tu nombre.", "error");
        return; // Detenemos la función aquí
    }

    // Validación 2: la contraseña no puede estar vacío
    if (contraseña === "") {
        mostrarMensaje("Por favor, introduce tu contraseña.", "error");
        return; // Detenemos la función aquí
    }
    //Validación 3: Ejemplo de restricción en contraseña

    if (contraseña.length < 4) {
        mostrarMensaje("la contraseña debe tener al menos 4 caracteres!", "error")
        return;
    }
    //Si todo está correcto:


    mostrarMensaje(`¡Hola , ${nombre}! ... Cines Elorrieta te da la bienvenida.`, "success");

    //Espera 1 segundo y te lleva a la pagina de seleccion
    setTimeout(() => { window.location.href = "seleccion.html"; }, 1000);
    // Opcional: Limpiar el formulario si todo salió bien
    formulario.reset();
});

// FUNCIÓN AUXILIAR (U3.03 - Funciones)
// Creamos una función para no repetir código al mostrar mensajes
function mostrarMensaje(texto, tipo) {
    // Modificamos el contenido HTML (U3.11)
    divMensaje.textContent = texto;

    // Añadimos la clase CSS correspondiente
    divMensaje.classList.add(tipo);
}