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
      //formulariosPorElemento[id] = generarFormulario(id,op_type);
        console.log('form not found');
    }
    $('#config-container').html('');//formulariosPorElemento[id]
    document.querySelector('#config-container').appendChild(formulariosPorElemento[id]);
    //formulariosPorElemento[id] = document.querySelector('#config-container').lastChild;
  });

function generarFormulario(id,op_type) {
    console.log(op_type);
    let formularioHTML;
    if(op_type==='input'){
        formularioHTML = templateForm(id,op_type,[{id:'id',label:'ID:',type:'text',value:''},
                                                  {id:'source',label:'Source:',type:'file',value:''}]);
    }
    else if(op_type==='output'){
        formularioHTML = templateForm(id,op_type,[{id:'id',label:'ID:',type:'text',value:''}]);
    }
    else if(op_type==='shift'){
        formularioHTML = templateForm(id,op_type,[{id:'x-shift',label:'X-shift:',type:'text',value:'0'},
                                                  {id:'y-shift',label:'Y-shift:',type:'text',value:'0'},
                                                  {id:'fillValue',label:'Fill value:',type:'text',value:"(0,0,0)"}]);
    }
    else if(op_type==='resize'){
        formularioHTML = templateForm(id,op_type,[{id:'x-new',label:'X-new:',type:'text',value:'100'},
                                                  {id:'y-new',label:'Y-new:',type:'text',value:'100'}]);
    }
    else if(op_type==='crop'){
        formularioHTML = templateForm(id,op_type,[{id:'left',label:'Left:',type:'text',value:'0'},
                                                  {id:'right',label:'Right:',type:'text',value:'0'},
                                                  {id:'bottom',label:'Bottom:',type:'text',value:'0'},
                                                  {id:'top',label:'Top:',type:'text',value:'0'}]);
    }
    else if(op_type==='gray'){
        formularioHTML = templateForm(id,op_type,[]);
    }
    else if(op_type==='global_threshold'){
        formularioHTML = templateForm(id,op_type,[{id:'threshold',label:'Threshold:',type:'range',value:'',min:'0',max:'255',step:'1'}]);
    }
    else{
        console.error('not a valid type', op_type);
    }



    // Devolver el formulario generado
    /*const form = document.createElement('form');
    form.innerHTML = formularioHTML;
    form.id ="formulario-"+id;*/
    return formularioHTML;
}
$('#config-container').on('input', 'input', function() {
    var formId = $(this).closest('form').attr('id');
    var fieldName = $(this).attr('name');
    var fieldValue = $(this).val();
    //console.log($(this));

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

function templateForm(id, type, elements){
    var form = document.createElement('form');
    form.id = 'formulario-' + id;

    var inputOpId = document.createElement('input');
    inputOpId.type = 'hidden';
    inputOpId.name = 'op_id';
    inputOpId.id = 'op_id';
    inputOpId.value = id;
    form.appendChild(inputOpId);

    var inputOpType = document.createElement('input');
    inputOpType.type = 'hidden';
    inputOpType.name = 'op_type';
    inputOpType.id = 'op_type';
    inputOpType.value = type;
    form.appendChild(inputOpType);

    for(let element of elements){
        var labelField = document.createElement('label');
        labelField.setAttribute('for', element.id);
        labelField.textContent = element.label;
        form.appendChild(labelField);

        var inputField = document.createElement('input');
        form.appendChild(inputField);
        inputField.id = element.id;
        inputField.name = element.id;
        inputField.value = element.value;
        if(element.type==='text'){
            inputField.type = element.type;
        }
        else if(element.type==='file'){
            inputField.type = element.type;
        }
        else if(element.type==='range'){
            inputField.type = element.type;
            inputField.max = element.max;
            inputField.min = element.min;
            inputField.step = element.step;
            var outputField = document.createElement('output');
            outputField.textContent = inputField.value;
            inputField.addEventListener("input", (event) => {
              outputField.textContent = event.target.value;
            });
            form.appendChild(outputField);
        }


        form.appendChild(document.createElement('br'));
    }



    return form;
}
