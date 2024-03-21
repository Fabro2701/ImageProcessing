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


  const botonMas = document.createElement('button');
  botonMas.classList.add('boton-mas');
  botonMas.innerHTML = '<i class="fas fa-plus"></i>'; // Icono de Font Awesome para "más"
  botonMas.setAttribute('onclick','selectImage('+dragg_counter+')')
  newElem.appendChild(botonMas);

  cont.appendChild(newElem);

  dragg_counter++;
}

interact('.draggable').draggable({
  listeners: {
    move (event) {
      console.log(11);
        var target = event.target;
          // keep the dragged position in the data-x/data-y attributes
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // translate the element
          target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the position attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
    },
  }
})
