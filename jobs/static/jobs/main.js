interact('.draggable-menu').draggable({
        inertia: true,
        modifiers: [

        ],
        autoScroll: true,
        listeners: {
            start(event) {
                //event.target.classList.add('dragging');
            },
            move(event) {
            },
            end(event) {
                //event.target.classList.remove('dragging');
            }
        }
    });

interact('.canvas-container').dropzone({
        accept: '.draggable-menu',
        ondrop(event) {

            const draggableElement = event.relatedTarget.parentNode.cloneNode(true);

            const img = draggableElement.querySelector('.op-icon');
            img.classList.remove('draggable-menu');
            img.classList.add('draggable-canvas');
            draggableElement.style.left = event.dragEvent.pageX-event.currentTarget.getBoundingClientRect().left -5 +'px';
            draggableElement.style.top = event.dragEvent.pageY-event.currentTarget.getBoundingClientRect().top -5 +'px';
            draggableElement.style.position = 'absolute';


            event.currentTarget.appendChild(draggableElement);
        }
    });



interact('.draggable-canvas').draggable({
  listeners: {
    move (event) {
        var target = event.target.parentNode
          // keep the dragged position in the data-x/data-y attributes
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

          // translate the element
          target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

          // update the posiion attributes
          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)

    },
  }
})