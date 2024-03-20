

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
    if(op_type==='input'||op_type==='output'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input id="op_id" type="hidden" name="op_id" value='+id+'></input>' +
                                    '<input id="op_type" type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="id">ID: </label>' +
                                    '<input id="id" type="text" name="id"><br></form>';
    }
    else if(op_type==='shift'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input id="op_id" type="hidden" name="op_id" value='+id+'></input>' +
                                    '<input id="op_type" type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="x-shift">X-shift: </label>' +
                                    '<input id="x-shift" type="text" name="x-shift" value="0"><br>' +
                                    '<label for="y-shift">Y-shift: </label>' +
                                    '<input id="y-shift" type="text" name="y-shift" value="0"><br>' +
                                    '<label for="fillValue">Fill value: </label>' +
                                    '<input id="fillValue" type="text" name="fillValue" value="(0,0,0)"><br>' +
            '</form>';
    }



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
