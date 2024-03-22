interact('.draggable-canvas, .connecting-line')
  .on('tap', function (event) {

      if(event.ctrlKey){
          var target = event.target;
          if(target.classList.contains('draggable-canvas')){
              target = target.parentNode;
              target.remove();
              var id = target.dataset.op_id;
              Array.from(document.querySelectorAll('.connecting-line')).forEach(function (cl){
                 if(cl.dataset.in_elem==id || cl.dataset.out_elem==id){
                     cl.remove();
                 }
              });
              delete formulariosPorElemento[id];
          }
          else{
              target.remove();
          }


      }
  });