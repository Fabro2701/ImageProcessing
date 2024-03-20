let dragg_counter = 0;
addImageContainer(50,100);
addImageContainer(300,100);
addImageContainer(50,350);
addImageContainer(300,350);

function addImageContainer(x=0, y=0) {

  const cont = document.getElementById('imgs_container');

  const newElem = document.createElement('div');
  newElem.id =  'img'+dragg_counter;
  newElem.dataset.source = '';
  newElem.classList.add('draggable');
  newElem.classList.add('image-container');
  newElem.style.left = x + 'px';
  newElem.style.top = y + 'px';

  const dragHandle = document.createElement('div');
  dragHandle.classList.add('handle');
  newElem.appendChild(dragHandle);

  const botonMas = document.createElement('button');
  botonMas.classList.add('boton-mas');
  botonMas.innerHTML = '<i class="fas fa-plus"></i>'; // Icono de Font Awesome para "más"
  botonMas.setAttribute('onclick','selectImage('+dragg_counter+')')
  newElem.appendChild(botonMas);

  cont.appendChild(newElem);


  dragHandle.addEventListener('mousedown', startDrag);

  dragg_counter++;
}
function startDrag(e) {
  e.preventDefault();

  const draggableElement = e.target.parentNode;
  const startX = e.clientX - draggableElement.offsetLeft;
  const startY = e.clientY - draggableElement.offsetTop;

  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDrag);

  // Función para arrastrar el elemento
  function drag(e) {
    draggableElement.style.left = (e.clientX - startX) + 'px';
    draggableElement.style.top = (e.clientY - startY) + 'px';
  }

  // Función para detener el arrastre
  function stopDrag() {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  }
}