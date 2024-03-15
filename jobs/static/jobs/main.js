// layers
// <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512"><path d="M22.485,10.975,12,17.267,1.515,10.975A1,1,0,1,0,.486,12.69l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M22.485,15.543,12,21.834,1.515,15.543A1,1,0,1,0,.486,17.258l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z"/><path d="M.485,8.357l9.984,5.991a2.97,2.97,0,0,0,3.062,0l9.984-5.991a1,1,0,0,0,0-1.714L13.531.652a2.973,2.973,0,0,0-3.062,0L.485,6.643a1,1,0,0,0,0,1.714Z"/></svg>
// play
// <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="512" height="512"><path d="M20.492,7.969,10.954.975A5,5,0,0,0,3,5.005V19a4.994,4.994,0,0,0,7.954,4.03l9.538-6.994a5,5,0,0,0,0-8.062Z"/></svg>


function agregarElementosAlMenu() {
  // Selecciona el contenedor del menú
  var menuContainer = document.getElementById("menuContainer");

  // Crea un espacio entre los elementos
  var espacio = document.createElement("div");
  espacio.style.height = "15px"; // Ajusta el espacio vertical
  menuContainer.appendChild(espacio);

  // Crea tres elementos SVG con texto y los agrega al menú container
  for (var i = 0; i < 3; i++) {
    // Crea un nuevo elemento SVG contenedor
    var svgContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgContainer.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgContainer.setAttribute("width", "70");
    svgContainer.setAttribute("height", "70");

    // Crea el elemento SVG
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("id", "Filled");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "50");
    svg.setAttribute("height", "50");
    svg.setAttribute("x", "14%"); // Centra horizontalmente
    svg.setAttribute("y", "2%"); // Centra verticalmente

    // Crea el elemento Path
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M22.485,10.975,12,17.267,1.515,10.975A1,1,0,1,0,.486,12.69l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z");
    svg.appendChild(path);
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M22.485,15.543,12,21.834,1.515,15.543A1,1,0,1,0,.486,17.258l11,6.6a1,1,0,0,0,1.03,0l11-6.6a1,1,0,1,0-1.029-1.715Z");
    svg.appendChild(path2);
    var path3 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path3.setAttribute("d", "M.485,8.357l9.984,5.991a2.97,2.97,0,0,0,3.062,0l9.984-5.991a1,1,0,0,0,0-1.714L13.531.652a2.973,2.973,0,0,0-3.062,0L.485,6.643a1,1,0,0,0,0,1.714Z");
    svg.appendChild(path3);

    // Agrega el elemento SVG al contenedor SVG
    svgContainer.appendChild(svg);

    // Crea el elemento de texto
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "50%");
    text.setAttribute("y", "85%");
    text.setAttribute("text-anchor", "middle"); // Centra el texto horizontalmente
    text.setAttribute("dominant-baseline", "middle"); // Centra el texto verticalmente
    text.textContent = "Texto" + (i + 1); // Ajusta el texto según tu preferencia


    // Agrega el elemento de texto al contenedor SVG
    svgContainer.appendChild(text);

    // Agrega el contenedor SVG al menú container
    menuContainer.appendChild(svgContainer);

    // Añade un espacio entre cada ícono, excepto después del último
    if (i < 2) {
      var espacio = document.createElement("div");
      espacio.style.height = "15px"; // Ajusta el espacio vertical
      menuContainer.appendChild(espacio);
    }
  }
}

// Llama a la función para agregar elementos al cargar la página
window.onload = agregarElementosAlMenu;
