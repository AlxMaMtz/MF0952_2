// Arreglo para almacenar temporalmente los números generados
const numerosGenerados = [];

// Función para generar un número aleatorio compuesto por cinco cifras y una letra
function generarNumero(premio) {
    let numero = '';
    // Generar cinco cifras aleatorias
    for (let i = 0; i < 5; i++) {
        numero += Math.floor(Math.random() * 10);
    }
    // Generar una letra aleatoria (de la A a la Z)
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    numero += letras.charAt(Math.floor(Math.random() * letras.length));

    // Mostrar el número generado en el output correspondiente al premio
    const output = document.querySelector(`.${premio} .outputStyle`);
    output.textContent = numero;

    // Copiar el número generado al portapapeles
    copiarAlPortapapeles(numero);

    // Almacenar el número generado temporalmente
    numerosGenerados.push(numero);

    // Mostrar el mensaje de éxito
    mostrarMensajeExito();
}

// Función para asignar la función generarNumero a los botones correspondientes
function asignarEventos() {
    document.querySelectorAll('.divPremios button').forEach(button => {
        const premio = button.parentNode.classList[0];
        button.addEventListener('click', () => generarNumero(premio));
    });

    // Asignar evento al botón de comprobación
    const botonComprobar = document.querySelector('.divComprobar button');
    botonComprobar.addEventListener('click', comprobarNumero);

    // Asignar evento a la tecla Enter en el input
    const inputNumero = document.getElementById('numero');
    inputNumero.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            comprobarNumero();
        }
    });
}

// Función para copiar el número al portapapeles
function copiarAlPortapapeles(texto) {
    // Crear un elemento de texto temporal fuera del área visible
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.setAttribute('readonly', ''); // Asegurar que el texto no se pueda editar
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px'; // Mover el elemento fuera de la pantalla
    document.body.appendChild(textarea);
    
    // Seleccionar el contenido del textarea
    textarea.select();
    
    // Copiar el texto al portapapeles
    document.execCommand('copy');
    
    // Eliminar el textarea temporal
    document.body.removeChild(textarea);
}

// Función para comprobar el número introducido
function comprobarNumero() {
    const inputNumero = document.getElementById('numero').value.toUpperCase(); // Obtener el número introducido y convertirlo a mayúsculas
    const encontrado = numerosGenerados.includes(inputNumero); // Comprobar si el número introducido coincide con alguno de los generados
    
    if (encontrado) {
        mostrarMensajePremio(inputNumero); // Mostrar mensaje de premio si se encuentra el número
    } else {
        mostrarMensajeNoPremio(); // Mostrar mensaje de no premio si no se encuentra el número
    }
}

// Función para mostrar el mensaje de éxito
function mostrarMensajeExito() {
    const mensajeExito = document.querySelector('.mesajeEnPantallaTrue');
    mensajeExito.style.display = 'block';
    setTimeout(() => {
        mensajeExito.style.display = 'none';
    }, 3000); // Ocultar el mensaje después de 3 segundos (3000 milisegundos)
}

function mostrarMensajePremio(numero) {
    const mensajePremio = document.querySelector('.mesajeEnPantallaPremio');
    mensajePremio.innerHTML = `<p>¡¡Enhorabuena, te ha tocado el ${numero}!!</p>`;
    mensajePremio.style.display = 'flex'; // Mostrar el mensaje

    // Ocultar el fieldset con ID "premios"
    document.getElementById('premios').style.display = 'none';

    // Ocultar el fieldset con ID "comprobarNumero"
    document.getElementById('comprobarNumero').style.display = 'none';

    // Mostrar el formulario de contacto después de 3 segundos
    setTimeout(() => {
        mostrarFormulario();
    }, 3000);
}

// Función para mostrar el formulario de contacto
function mostrarFormulario() {
    // Mostrar el fieldset con la clase "divEncimaForm"
    document.querySelector('.divEncimaForm').style.display = 'block';
}

// Función para mostrar el mensaje de no premio
function mostrarMensajeNoPremio() {
    const mensajeNoPremio = document.querySelector('.mesajeEnPantallaFalse');
    mensajeNoPremio.style.display = 'flex'; // Mostrar el mensaje
    setTimeout(() => {
        mensajeNoPremio.style.display = 'none'; // Ocultar el mensaje después de 3 segundos
    }, 3000);
}

// Llamar a la función para asignar eventos cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', asignarEventos);
