
var formulariosPorElemento;

function clearComponents(){
  var componente = document.getElementById('canvas-container');
  var nhijos = componente.children.length;
  for (var i = 0; i < nhijos-1; i++) {
      componente.lastChild.remove();
  }
  if(localStorage.getItem('formulariosPorElemento')){
      localStorage.removeItem('formulariosPorElemento');
  }
  formulariosPorElemento = {};
  localStorage.removeItem('id_counter');
}
// Función para guardar el contenido del elemento en el localStorage
function guardarContenido() {
  var componente = document.getElementById('canvas-container');
  componente.children[0].remove();
    var contenido = componente.innerHTML;

    localStorage.setItem('canvas-container', contenido);
    let aux = {};
    for (var key in formulariosPorElemento) {
        aux[key] = formulariosPorElemento[key].innerHTML;
        console.log(aux[key]);
    }
    localStorage.setItem('formulariosPorElemento', JSON.stringify(aux));
}

// Función para cargar el contenido guardado del localStorage
function cargarContenido() {
    formulariosPorElemento = {}
    if(localStorage.getItem('formulariosPorElemento')){
        var aux = JSON.parse(localStorage.getItem('formulariosPorElemento'));

        for (var key in aux) {
            var elemento = document.createElement('form');
            elemento.id = "formulario-"+key;
            elemento.innerHTML = aux[key];
            formulariosPorElemento[key] = elemento;
        }
    }


    var contenidoGuardado = localStorage.getItem('canvas-container');
    if (contenidoGuardado) {
        const comp = document.getElementById('canvas-container');
        comp.innerHTML = comp.innerHTML+contenidoGuardado;
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