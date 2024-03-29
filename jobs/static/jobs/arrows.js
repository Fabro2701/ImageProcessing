interact('.arrow').draggable({
        inertia: true,
        modifiers: [

        ],
        autoScroll: true,
        listeners: {
            start(event) {
                //event.target.classList.add('dragging');
            },
            move(event) {
            //console.log(event.target.parentNode.dataset.op_id,event.relatedTarget?event.relatedTarget.parentNode.dataset.op_id:0);
            },
            end(event) {
                //event.target.classList.remove('dragging');
            }
        }
    });

interact('.draggable-canvas').dropzone({
        accept: '.arrow-out',
        ondrop(event) {
            const targetElement = event.currentTarget.parentNode;
            arrowIn = targetElement.querySelector('.arrow-in');
            arrowOut = event.relatedTarget;

            if(arrowIn){
                console.log(arrowIn);
                //console.log(arrowIn.parentNode.dataset.op_id,arrowOut.parentNode.dataset.op_id);

                var punto1X = parseInt(arrowOut.parentNode.style.left,10)+ parseInt((arrowOut.parentNode.getAttribute('data-x') || 0),10) + parseInt(arrowOut.parentNode.getAttribute('width'),10) *0.9+2;
                var punto1Y = parseInt(arrowOut.parentNode.style.top,10)+ parseInt((arrowOut.parentNode.getAttribute('data-y') || 0),10) + parseInt(arrowOut.parentNode.getAttribute('height'),10)*0.32+2;
                var punto2X = parseInt(arrowIn.parentNode.style.left,10)+ parseInt((arrowIn.parentNode.getAttribute('data-x') || 0),10) + parseInt(arrowIn.parentNode.getAttribute('width'),10) *0.1+2;
                var punto2Y = parseInt(arrowIn.parentNode.style.top,10)+ parseInt((arrowIn.parentNode.getAttribute('data-y') || 0),10) + parseInt(arrowIn.parentNode.getAttribute('height'),10)*0.32+2;


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

                linea.dataset.in_elem = arrowIn.parentNode.dataset.op_id;
                linea.dataset.out_elem = arrowOut.parentNode.dataset.op_id;
                linea.dataset.in_pointx = punto1X;
                linea.dataset.in_pointy = punto1Y;
                linea.dataset.out_pointx = punto2X;
                linea.dataset.out_pointy = punto2Y;
                linea.classList.add('connecting-line');

                // Agregar la línea al SVG
                document.getElementById("canvas-container").appendChild(linea);

                //arrowOut.parentNode.appendChild(arrow);

            }
        }
});