


interact('.draggable-canvas')
  .on('doubletap', function (event) {

    Array.from(document.getElementsByClassName('selected')).forEach(e=>e.classList.remove('selected'));


    event.target.classList.add('selected');
  })

