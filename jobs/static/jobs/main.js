interact('.draggable').draggable({
        inertia: true,
        modifiers: [

        ],
        autoScroll: true,
        listeners: {
            start(event) {
                event.target.classList.add('dragging');
            },
            move(event) {
            },
            end(event) {
                event.target.classList.remove('dragging');
            }
        }
    });

interact('#canvas-container').dropzone({
        accept: '.draggable',
        ondrop(event) {
            event.relatedTarget.removeAttribute('class');
            event.relatedTarget.removeAttribute('style');
            const draggableElement = event.relatedTarget.parentNode.cloneNode(true);

            draggableElement.style.left = event.dragEvent.pageX-event.currentTarget.getBoundingClientRect().left -5 +'px';
            draggableElement.style.top = event.dragEvent.pageY-event.currentTarget.getBoundingClientRect().top -5 +'px';
            draggableElement.style.position = 'absolute';


            event.currentTarget.appendChild(draggableElement);
        }
    });