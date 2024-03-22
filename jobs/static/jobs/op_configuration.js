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
    if(op_type==='input'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input id="op_id" type="hidden" name="op_id" value='+id+'></input>' +
                                    '<input id="op_type" type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="id">ID: </label>' +
                                    '<input id="id" type="text" name="id"><br>' +
                                    '<label for="source">Source: </label>' +
                                    '<input id="source" type="file" name="source"><br>' +
                        '</form>';
    }
    else if(op_type==='output'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input id="op_id" type="hidden" name="op_id" value='+id+'></input>' +
                                    '<input id="op_type" type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="id">ID: </label>' +
                                    '<input id="id" type="text" name="id"><br>' +
                        '</form>';
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
    else if(op_type==='resize'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input id="op_id" type="hidden" name="op_id" value='+id+'></input>' +
                                    '<input id="op_type" type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="x-new">X-new: </label>' +
                                    '<input id="x-new" type="text" name="x-new" value="100"><br>' +
                                    '<label for="y-new">Y-new: </label>' +
                                    '<input id="y-new" type="text" name="y-new" value="100"><br>' +
            '</form>';
    }
    else if(op_type==='crop'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input id="op_id" type="hidden" name="op_id" value='+id+'></input>' +
                                    '<input id="op_type" type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="left">Left: </label>' +
                                    '<input id="left" type="text" name="left" value="0"><br>' +
                                    '<label for="right">Right: </label>' +
                                    '<input id="right" type="text" name="right" value="0"><br>' +
                                    '<label for="bottom">Bottom: </label>' +
                                    '<input id="bottom" type="text" name="bottom" value="0"><br>' +
                                    '<label for="top">Top: </label>' +
                                    '<input id="top" type="text" name="top" value="0"><br>' +
            '</form>';
    }
    else if(op_type==='gray'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input id="op_id" type="hidden" name="op_id" value='+id+'></input>' +
                                    '<input id="op_type" type="hidden" name="op_type" value='+op_type+'></input>' +
            '</form>';
    }
    else if(op_type==='global_threshold'){
        formularioHTML = '<form id="formulario-'+id+'">' +
                                    '<input id="op_id" type="hidden" name="op_id" value='+id+'></input>' +
                                    '<input id="op_type" type="hidden" name="op_type" value='+op_type+'></input>' +
                                    '<label for="threshold">Threshold: </label>' +
                                    '<input id="threshold" type="text" name="threshold" value="0"><br>' +
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
    console.log($(this));

    if(fieldName==='source'){
        var file = $(this).prop('files')[0];
        var formData = new FormData();
        formData.append('image', file);

        var x = formulariosPorElemento[formId.substring(11)].querySelector('#' + $(this).attr('id'));
        x.setAttribute('value',file.name) ;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload_image/', true);
        const csrfToken = getCookie('csrftoken');
        xhr.setRequestHeader('X-CSRFToken', csrfToken);
        xhr.onload =  function () {
            if (xhr.status === 200) {
                console.log('Imagen subida correctamente.');
            } else {
                console.log('Error al subir la imagen.');
            }
        };
        xhr.send(formData);
    }
    else{
        var x = formulariosPorElemento[formId.substring(11)].querySelector('#' + $(this).attr('id'));
        x.setAttribute('value',fieldValue) ;
    }

    


});
