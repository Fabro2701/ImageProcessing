/*
<div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    I/O
                  </button>
                </h5>
              </div>
 */

function generate_menu(){
    var ioSection = generate_section('I/O', '1', [{img:'op_input.svg', label:'Input', op_type:'input', in:false, out:true},
                                                                                   {img:'op_output.svg', label:'Output', op_type:'output', in:true, out:false}])
    var basicSection = generate_section('Basic', '2', [{img:'op_basic.svg', label:'Shift', op_type:'shift', in:true, out:true},
                                                                                     {img:'op_basic.svg', label:'Crop', op_type:'crop', in:true, out:true},
                                                                                     {img:'op_basic.svg', label:'Resize', op_type:'resize', in:true, out:true}])
    var thresholdSection = generate_section('Threshold', '2', [{img:'op_threshold.svg', label:'t1', op_type:'t1', in:true, out:true},
                                                                                     {img:'op_threshold.svg', label:'t2', op_type:'t2', in:true, out:true},
                                                                                     {img:'op_threshold.svg', label:'t3', op_type:'t3', in:true, out:true},
                                                                                     {img:'op_threshold.svg', label:'t4', op_type:'t4', in:true, out:true}])

    var cont = document.querySelector('#accordion');
    cont.appendChild(ioSection);
    cont.appendChild(basicSection);
    cont.appendChild(thresholdSection);
}
function generate_section(title, id, elements){
    var card = document.createElement('div');
    card.classList.add('card');
    var header = document.createElement('div');
    header.classList.add('card-header');
    header.setAttribute("id", "heading"+id);
    var h5 = document.createElement('h5');
    h5.classList.add("mb-0");
    var button = document.createElement('button');
    button.classList.add("btn", "btn-link");
    button.setAttribute("data-toggle", "collapse");
    button.setAttribute("data-target", "#collapse"+id);
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-controls", "collapse"+id);
    button.textContent = title;

    card.appendChild(header);
    header.appendChild(h5);
    h5.appendChild(button);

    var collapse = document.createElement("div");
    collapse.setAttribute("id", "collapse"+id);
    collapse.classList.add("collapse", "show");
    collapse.setAttribute("aria-labelledby", "heading"+id);

    var cardBodyContainer = document.createElement("div");
    cardBodyContainer.classList.add("card-body", "container");

    const limitRow = 3;
    var c = 0;
    while (c<elements.length){
        var rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let i=0;i<limitRow && c+i<elements.length;i++){
            var element = elements[c+i];

            var col = document.createElement("div");
            col.classList.add("col-4");

            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.setAttribute("data-op_type", element.op_type);
            svg.setAttribute("width", "80px");
            svg.setAttribute("height", "80px");




            var svgNS = "http://www.w3.org/2000/svg";
            var xlinkNS = "http://www.w3.org/1999/xlink";
            var image = document.createElementNS(svgNS, "image");
            image.setAttributeNS(null, "class", "draggable-menu op-icon");
            image.setAttributeNS(xlinkNS, "href", '/static/canvas/images/' + element.img);
            image.setAttributeNS(null, "width", "50");
            image.setAttributeNS(null, "height", "50");
            image.setAttributeNS(null, "x", "15");
            image.setAttributeNS(null, "y", "0");

            svg.appendChild(image);

            if(element.out){
                var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.classList.add("arrow-out", "arrow");
                circle.setAttribute("cx", "90%");
                circle.setAttribute("cy", "32%");
                circle.setAttribute("r", "4px");
                svg.appendChild(circle);
            }
            if(element.in){
                var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.classList.add("arrow-in", "arrow");
                circle.setAttribute("cx", "10%");
                circle.setAttribute("cy", "32%");
                circle.setAttribute("r", "4px");
                svg.appendChild(circle);
            }

            var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", "50%");
            text.setAttribute("y", "85%");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("dominant-baseline", "middle");
            text.setAttribute("font-family", "Arial");
            text.setAttribute("font-size", "12");
            text.setAttribute("fill", "black");
            text.textContent = element.label;

            svg.appendChild(text);

            col.appendChild(svg);
            rowDiv.appendChild(col);

        }
        c += limitRow;
        cardBodyContainer.appendChild(rowDiv);
    }


    collapse.appendChild(cardBodyContainer);
    card.appendChild(collapse);
    return card;
}

window.addEventListener('load', function() {
    generate_menu();
});

/*

<div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    I/O
                  </button>
                </h5>
              </div>
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne">
                <div class="card-body container">
                    <div class="row">
                        <div class="col-4">
                            <svg data-op_type="input" width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_input.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Input</text>
                            </svg>
                        </div>
                        <div class="col-4">
                            <svg data-op_type="output" width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_output.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Output</text>
                            </svg>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Basics
                  </button>
                </h5>
              </div>
              <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo">
                <div class="card-body container">
                    <div class="row">
                        <div class="col-4">
                            <svg data-op_type="shift" width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_basic.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Shift</text>
                            </svg>
                        </div>
                        <div class="col-4">
                            <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_basic.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Crop</text>
                            </svg>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" id="headingThree">
                <h5 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Threshold
                  </button>
                </h5>
              </div>
              <div id="collapseThree" class="collapse show" aria-labelledby="headingThree">
                <div class="card-body container">
                  <div class="row">
                        <div class="col-4">
                            <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_threshold.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Simple</text>
                            </svg>
                        </div>
                        <div class="col-4">
                            <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_threshold.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Local</text>
                            </svg>
                        </div>
                        <div class="col-4">
                            <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_threshold.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Adaptively</text>
                            </svg>
                        </div>
                    </div>
                  <div class="row mt-3">
                        <div class="col-4">
                            <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_threshold.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Variance</text>
                            </svg>
                        </div>
                        <div class="col-4">
                            <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_threshold.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Entropy</text>
                            </svg>
                        </div>
                    </div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header" id="heading4">
                <h5 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                    Filtering
                  </button>
                </h5>
              </div>
              <div id="collapse4" class="collapse show" aria-labelledby="heading4">
                <div class="card-body container">
                    <div class="row">
                        <div class="col-4">
                            <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_filtering.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">TMF</text>
                            </svg>
                        </div>
                    </div>
              </div>
            </div>
            </div>

            <div class="card">
              <div class="card-header" id="heading5">
                <h5 class="mb-0">
                  <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                    Others
                  </button>
                </h5>
              </div>
              <div id="collapse5" class="collapse show" aria-labelledby="heading5">
                <div class="card-body container">
                    <div class="row">
                        <div class="col-4">
                            <svg width="80px" height="80px" xmlns="http://www.w3.org/2000/svg">
                                <image class='draggable-menu op-icon' xlink:href="{% static 'canvas/images/op_others.svg' %}" width="50px" height="50px" x="15px"y="0"/>
                                <circle class='arrow-in arrow' cx="10%" cy="32%" r="4px"/>
                                <circle class='arrow-out arrow' cx="90%" cy="32%" r="4px"/>
                                <text x="50%" y="85%" text-anchor='middle' dominant-baseline='middle'font-family="Arial" font-size="12" fill="black">Contrast</text>
                            </svg>
                        </div>
                    </div>
                </div>
              </div>
            </div>

 */