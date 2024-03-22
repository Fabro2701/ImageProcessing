
function clearComponents(){
  /*var componente = document.getElementById('canvas-container');
  var nhijos = componente.children.length;
  for (var i = 0; i < nhijos-1; i++) {
      componente.lastChild.remove();
  }
  if(localStorage.getItem('formulariosPorElemento')){
      localStorage.removeItem('formulariosPorElemento');
  }
  formulariosPorElemento = {};
  localStorage.removeItem('id_counter');*/
}
// Función para guardar el contenido del elemento en el localStorage
function guardarContenido() {
  var componente = document.querySelector('#imgs_container');
  componente.children[0].remove();
  componente.children[0].remove();
    var contenido = componente.innerHTML;

    localStorage.setItem('imgs_container', contenido);
}

function cargarContenido() {
    var contenidoGuardado = localStorage.getItem('imgs_container');
    console.log(contenidoGuardado);
    if (contenidoGuardado) {
        const comp = document.querySelector('#imgs_container');
        comp.innerHTML = comp.innerHTML+contenidoGuardado;
    }
}

// Evento que se dispara cuando se cambia de pestaña
window.addEventListener('beforeunload', function() {
    guardarContenido();
});

// Evento que se dispara cuando se carga la página
window.addEventListener('load', function() {
    cargarContenido();
});