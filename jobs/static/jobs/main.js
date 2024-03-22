interact('.draggable-menu').draggable({
        inertia: true,
        modifiers: [

        ],
        autoScroll: true,
        listeners: {
            start(event) {
            },
            move(event) {
            },
            end(event) {
            }
        }
    });
let id_counter = (localStorage.getItem('id_counter')||0);
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
            draggableElement.id = 'opid_'+id_counter;
            draggableElement.dataset.op_id = 'opid_'+id_counter;
            id_counter++;
            localStorage.setItem('id_counter',id_counter);

            formulariosPorElemento[draggableElement.id] = generarFormulario(draggableElement.id, draggableElement.dataset.op_type);
            console.log(formulariosPorElemento[draggableElement.id]);


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


        Array.from(document.getElementsByClassName('connecting-line')).filter(line => (line.dataset.in_elem == target.dataset.op_id || line.dataset.out_elem == target.dataset.op_id)).forEach(function(line){

            var punto1X = parseFloat(line.dataset.in_pointx);
            var punto1Y = parseFloat(line.dataset.in_pointy);
            var punto2X = parseFloat(line.dataset.out_pointx);
            var punto2Y = parseFloat(line.dataset.out_pointy);

            if(line.dataset.out_elem == target.dataset.op_id){
                punto1X = parseInt(target.style.left,10)+ parseInt((target.getAttribute('data-x') || 0),10) + parseInt(target.getAttribute('width'),10) *0.9+2;
                punto1Y = parseInt(target.style.top,10)+ parseInt((target.getAttribute('data-y') || 0),10) + parseInt(target.getAttribute('height'),10) *0.32+2;
            }
            else{
                punto2X = parseInt(target.style.left,10)+ parseInt((target.getAttribute('data-x') || 0),10) + parseInt(target.getAttribute('width'),10) *0.1+2;
                punto2Y = parseInt(target.style.top,10)+ parseInt((target.getAttribute('data-y') || 0),10) + parseInt(target.getAttribute('height'),10)*0.32+2;
            }
            var distancia = Math.sqrt(Math.pow(punto2X - punto1X, 2) + Math.pow(punto2Y - punto1Y, 2));
            var angulo = Math.atan2(punto2Y - punto1Y, punto2X - punto1X);

            var linea = document.createElement('div');
            linea.style.width = distancia + "px";
            linea.style.transform = "rotate(" + angulo + "rad)";
            linea.style.transformOrigin = 'top left';
            linea.style.top = punto1Y + "px";
            linea.style.left = punto1X + "px";
            linea.style.position='absolute';
            linea.style.border = '1px solid black'
            linea.dataset.in_elem = line.dataset.in_elem;
            linea.dataset.out_elem = line.dataset.out_elem;
            linea.dataset.in_pointx = punto1X;
            linea.dataset.in_pointy = punto1Y;
            linea.dataset.out_pointx = punto2X;
            linea.dataset.out_pointy = punto2Y;
            linea.classList.add('connecting-line');

            line.remove();


            document.getElementById("canvas-container").appendChild(linea);

        });

    },
  }
})