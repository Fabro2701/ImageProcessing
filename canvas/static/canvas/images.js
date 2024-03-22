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


function selectImage(id){
    var popupMenu = document.createElement('div');
    popupMenu.classList.add('popup-menu');
    popupMenu.id='menu-image-chooser';
    var aux = {};
    if(localStorage.getItem('formulariosPorElemento')){
       aux = JSON.parse(localStorage.getItem('formulariosPorElemento'));
    }
    for(var key in aux){
        var elemento = document.createElement('form');
        elemento.innerHTML = aux[key];
        console.log(elemento);
        let type = elemento.querySelector('#op_type').getAttribute('value');
        if(type==='input'||type==='output'){
            var menuItem = document.createElement('div');
            menuItem.textContent = elemento.querySelector('#id').getAttribute('value');
            menuItem.classList.add('menu-item');
            menuItem.style.textAlign = 'left';
            menuItem.onclick = function() {
                // Aquí puedes realizar la acción deseada al seleccionar una imagen
                var img = document.querySelector('#img'+id);
                img.dataset.source = this.textContent;
                img.firstChild.textContent = this.textContent;
                console.log('Imagen seleccionada:', this.textContent);
                document.querySelector('#menu-image-chooser').remove();
                // Por ejemplo, podrías cargar la imagen correspondiente utilizando this.textContent como clave
            };
            popupMenu.appendChild(menuItem);
        }
    }
    document.querySelector('#img'+id).appendChild(popupMenu);
}
function runProcess(){
    var aux = (localStorage.getItem('canvas-container')||'');
    var canvas = document.createElement('div');
    canvas.innerHTML = aux
    forms_storage = document.createElement('div');;
    if(localStorage.getItem('formulariosPorElemento')){
        var aux = JSON.parse(localStorage.getItem('formulariosPorElemento'));
        for (var key in aux) {
            var elemento = document.createElement('form');
            elemento.innerHTML = aux[key];
            forms_storage.appendChild(elemento);
        }
    }

    //console.log(canvas.querySelectorAll('.connecting-line'));
    let connections = [];
    Array.from(canvas.querySelectorAll('.connecting-line')).forEach(function(elemento) {
        connections.push({'in' : elemento.getAttribute('data-in_elem'),
                          'out' : elemento.getAttribute('data-out_elem')});
    });
    console.log(connections);




    let forms = {};
    Array.from(forms_storage.querySelectorAll('form')).forEach(function(elemento) {
        var inputs = elemento.querySelectorAll('input');
        var json = {};
        var formID = inputs[0].getAttribute('value');

        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];

            var id = input.getAttribute('id');
            var valor = input.getAttribute('value');
            json[id] = valor;
        }

        forms[formID]=json;
    });
    console.log(forms);


    const csrfToken = getCookie('csrftoken');
    $.ajax({
            url: '',
            type: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
            },
            data: JSON.stringify({ 'connections':connections,'forms':forms }),
            ContentType: 'application/json',
            success: function (data) {
                console.log('success');
                console.log(data);
                updateImages(data);
            },
            error: function (error) {
                console.error('Error al enviar reportes:', error);
            }
        });

}
function updateImages(results){
    for(var k in results){
        result = results[k];
        Array.from(document.querySelectorAll('.draggable')).forEach(function(element){

            if(element.getAttribute('data-source')===result.id){
                element.classList.remove('image-container-empty');
                element.classList.add('image-container-filled');
                var texte = element.firstChild;
                element.innerHTML = '';
                element.appendChild(texte);
                var img = new Image();
                img.src = "/static/" + result.path;
                element.appendChild(img);
            }
        });
    }

}