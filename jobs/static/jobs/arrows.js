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
            //console.log('yydragggginy')
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

            console.log(targetElement);

            arrowIn = targetElement.parentNode.querySelector('.arrow-in');
            arrowOut = event.relatedTarget;

            if(arrowIn){


                var punto1X = parseInt(arrowOut.parentNode.style.left,10)+ parseInt((arrowOut.parentNode.getAttribute('data-x') || 0),10) + parseInt(arrowOut.parentNode.getAttribute('width'),10) *0.9+2;
                var punto1Y = parseInt(arrowOut.parentNode.style.top,10)+ parseInt((arrowOut.parentNode.getAttribute('data-y') || 0),10) + parseInt(arrowOut.parentNode.getAttribute('height'),10)*0.32+2;
                var punto2X = parseInt(arrowIn.parentNode.style.left,10)+ parseInt((arrowIn.parentNode.getAttribute('data-x') || 0),10) + parseInt(arrowIn.parentNode.getAttribute('width'),10) *0.1+2;
                var punto2Y = parseInt(arrowIn.parentNode.style.top,10)+ parseInt((arrowIn.parentNode.getAttribute('data-y') || 0),10) + parseInt(arrowIn.parentNode.getAttribute('height'),10)*0.32+2;

                console.log(parseInt(arrowIn.parentNode.style.left,10));
                console.log((arrowIn.parentNode.getAttribute('data-x') || 0));
                console.log(parseInt(arrowIn.parentNode.getAttribute('width'),10));
                console.log(punto2X);
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

                console.log(linea)

                // Agregar la línea al SVG
                document.getElementById("canvas-container").appendChild(linea);

                //arrowOut.parentNode.appendChild(arrow);

            }
        }
});