 // 1. SELECCIÓN DE ELEMENTOS DEL DOM (U3.11 - Intro)
        const formulario = document.querySelector('#formularioAcceso');
        const inputNombre = document.querySelector('#nombreUsuario');
        const inputContraseña = document.querySelector('#contraseña');
        const divMensaje = document.querySelector('#mensajeResultado');

        // 2. GESTIÓN DE EVENTOS (U3.12 - Eventos)
        // Usamos 'addEventListener' que es la forma recomendada en los apuntes
        formulario.addEventListener('submit', function(evento) {
            
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

            if(contraseña.length < 4){
                mostrarMensaje("la contraseña debe tener al menos 4 caracteres!", "error")
                return;
            }
//----------------------------------------------------------
 // --- NUEVA LÓGICA: COMPROBAR BD ---
            
            // Buscamos si el nombre existe (ignorando mayúsculas/minúsculas)
            const usuarioEncontrado = baseDeDatos.find(u => u.nombre.toLowerCase() === nombre.toLowerCase());

            if (usuarioEncontrado) {
                // CASO 1: El usuario EXISTE, comprobamos la contraseña
                if (usuarioEncontrado.pass === contraseña) {
                    // Contraseña correcta
                    mostrarMensaje(`¡Hola, ${usuarioEncontrado.nombre}! Cines Elorrieta te da la bienvenida.`, "success");
                    
                    // Tu redirección original
                    setTimeout(() => { 
                        // Nota: Asegúrate de que Peliculas.html existe en la misma carpeta
                        console.log("Redirigiendo a Peliculas.html...");
                        // window.location.href = "Peliculas.html"; 
                    }, 2000);

                    // Ocultamos el botón de registrar por si estaba visible
                    btnRegistrar.style.display = 'none';

                } else {
                    // Contraseña incorrecta
                    mostrarMensaje("Contraseña incorrecta. Inténtalo de nuevo.", "error");
                }

            } else {
                // CASO 2: El usuario NO EXISTE
                mostrarMensaje(`No encontramos a "${nombre}". ¿Quieres registrarte?`, "warning");
                
                // Mostramos el botón para registrarse
                btnRegistrar.style.display = 'block';
            }
        });


        // --- 4. NUEVO EVENTO: CLIC EN REGISTRAR ---
        btnRegistrar.addEventListener('click', function() {
            const nombre = inputNombre.value.trim();
            const contraseña = inputContraseña.value.trim();

            // Como ya validamos los campos antes de mostrar este botón, 
            // podemos registrar directamente.
            
            // Crear nuevo objeto
            const nuevoUsuario = {
                nombre: nombre,
                pass: contraseña
            };

            // Guardar en el array
            baseDeDatos.push(nuevoUsuario);

            // Feedback
            mostrarMensaje(`¡Cuenta creada! Bienvenido a Cines Elorrieta, ${nombre}.`, "success");
            
            // Ocultar botón de registro
            btnRegistrar.style.display = 'none';

            // Redirección automática tras registro (opcional)
            setTimeout(() => { 
               console.log("Redirigiendo tras registro...");
               // window.location.href = "Peliculas.html"; 
            }, 2000);
            
            console.log("BD Actualizada:", baseDeDatos);
        });


        // --- FUNCIÓN AUXILIAR ---
        function mostrarMensaje(texto, tipo) {
            divMensaje.textContent = texto;
            divMensaje.className = ''; // Limpiar clases previas
            divMensaje.classList.add(tipo);
            divMensaje.style.display = 'block';
        }










//-----------------------------------------------------------



            //Si todo está correcto:
           
           
            mostrarMensaje(`¡Hola , ${nombre}! ... Cines Elorrieta te da la bienvenida.`, "success");

            //Espera 1 segundo y te lleva a la pagina de Peliculas
                setTimeout(() => { window.location.href = "Peliculas.html"; }, 1000);
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