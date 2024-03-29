let dragg_counter = 0;


function newProcess(){
  const cont = document.getElementById('imgs_container');

  var aux1 = cont.children[0];
  var aux2 = cont.children[1];
  cont.innerHTML='';
  cont.appendChild(aux1);
  cont.appendChild(aux2);
    addImageContainer(50,100);
  addImageContainer(300,100);
  addImageContainer(550,100);
  addImageContainer(50,350);
  addImageContainer(300,350);
  addImageContainer(550,350);

}
function addImageContainer(x=0, y=0) {

  const cont = document.getElementById('imgs_container');

  const newElem = document.createElement('div');
  newElem.id =  'img'+dragg_counter;
  newElem.dataset.source = '';
  newElem.classList.add('image-container-empty','draggable');
  newElem.style.left = x + 'px';
  newElem.style.top = y + 'px';

  var textDiv = document.createElement("div");
  textDiv.classList.add("centered-text");
  textDiv.textContent = "";
  newElem.appendChild(textDiv);


  const botonMas = document.createElement('button');
  botonMas.classList.add('boton-mas');
  botonMas.innerHTML = '<i class="fas fa-plus"></i>';
  botonMas.setAttribute('onclick','selectImage('+dragg_counter+')')
  newElem.appendChild(botonMas);

  cont.appendChild(newElem);

  dragg_counter++;
}

interact('.draggable').draggable({
  listeners: {
    move (event) {
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
