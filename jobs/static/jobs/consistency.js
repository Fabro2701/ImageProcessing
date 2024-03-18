

// Función para guardar el contenido del elemento en el localStorage
function guardarContenido() {
    var contenido = document.getElementById('canvas-container').innerHTML;
    localStorage.setItem('canvas-container', contenido);
}

// Función para cargar el contenido guardado del localStorage
function cargarContenido() {

    var contenidoGuardado = localStorage.getItem('canvas-container');
    if (contenidoGuardado) {
        document.getElementById('canvas-container').innerHTML = contenidoGuardado;
    }
        Array.from(document.getElementsByClassName('selected')).forEach(e=>e.classList.remove('selected'));

}

// Evento que se dispara cuando se cambia de pestaña
window.addEventListener('beforeunload', function() {
    guardarContenido();
});

// Evento que se dispara cuando se carga la página
window.addEventListener('load', function() {
    cargarContenido();
});