function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Objeto para almacenar los formularios generados por elemento


interact('.draggable-canvas')
  .on('doubletap', function (event) {
    Array.from(document.getElementsByClassName('selected')).forEach(e=>e.classList.remove('selected'));
    event.target.classList.add('selected');

    const op_type = event.target.parentNode.dataset.op_type;
    const id = event.target.parentNode.id;
    // Verificar si ya existe un formulario para este elemento
    if (!formulariosPorElemento[id]) {
      // Si no existe, generar el formulario y guardarlo en el objeto
      formulariosPorElemento[id] = generarFormulario(id,op_type);
    }
    $('#config-container').html(formulariosPorElemento[id]);
    //document.querySelector('#config-container').appendChild(formulariosPorElemento[id]);
    //formulariosPorElemento[id] = document.querySelector('#config-container').lastChild;
  });

function generarFormulario(id,op_type) {
    let formularioHTML;
    const csrfToken = getCookie('csrftoken');
    if(op_type==='input'||op_type==='output'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="id">ID: </label>' +
                                    '<input id="id" type="text" name="id"><br></form>';
    }
    else if(op_type==='shift'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="left">Left: </label>' +
                                    '<input id="left" type="text" name="left" value="0"><br>' +
                                    '<label for="right">Right: </label>' +
                                    '<input id="right" type="text" name="right" value="0"><br>' +
                                    '<label for="top">Top: </label>' +
                                    '<input id="top" type="text" name="top" value="0"><br>' +
                                    '<label for="bottom">Bottom: </label>' +
                                    '<input id="bottom" type="text" name="bottom" value="0"><br>' +
            '</form>';
    }


    // Manejar el envío del formulario
    /*$('#formulario-'+op_type+id).submit(function(event) {
        event.preventDefault();
        var formData = $(this).serialize();

        $.ajax({
            url: '/jobs/',
            type: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            data: formData
        });
    });
    */
    // Devolver el formulario generado
    const form = document.createElement('form');
    form.innerHTML = formularioHTML;
    form.id ="formulario-"+id;
    return form;
}
$('#config-container').on('input', 'input', function() {
    var formId = $(this).closest('form').attr('id');
    var fieldName = $(this).attr('name');
    var fieldValue = $(this).val();
    //console.log($(this));
   //console.log($(this).closest('form'));

    //formulariosPorElemento[formId.substring(16)].formData[fieldName] = fieldValue;
    var x = formulariosPorElemento[formId.substring(11)].querySelector('#' + $(this).attr('id'));
    x.setAttribute('value',fieldValue) ;
    console.log(formulariosPorElemento[formId.substring(11)]);
    // Actualizar los datos del formulario en el objeto
    //formulariosPorElemento[formId.substring(16)].formData[fieldName] = fieldValue;
    //$(this).setAttribute('value',fieldValue);
    //var input_field = $(this).closest('form').find('#' + $(this).attr('id'));
    //input_field.val(fieldValue);
});
