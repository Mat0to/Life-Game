// Esta función muestra las instrucciones del juego
function instrucciones(){
  alert("Por favor, elige las casillas que desees y ten en cuenta estas pautas: Si una célula está activa y tiene dos o tres células vecinas vivas, continuará activa en el siguiente ciclo. Si una célula está inactiva y tiene exactamente tres células vecinas vivas, se activará en el próximo ciclo. Sin embargo, si una célula está activa y tiene más de tres células vecinas vivas, fallecerá debido a la sobre población.");
}

// Esta función detiene el juego
function detener(){
  clearInterval(intervalId);
}

// Variables para el juego
let detente;
let intervalId;
let reconoce =[];

// Esta función inicia el juego
function jugar(){
  intervalId = setInterval(siguienteEstado, 500);
}

// Esta función reinicia el juego
function reiniciar(){
  window.location.href = window.location.href;
}

let body = document.getElementsByTagName("body")[0];
let tabla = document.createElement("table");
let tblBody = document.createElement("tbody");
let tdiv = document.createElement("div");

// Crea la tabla y las celdas del juego
for (let i = 0; i < 15; i++) {
  let hilera = document.createElement("tr");

  for (let j = 0; j < 15; j++) {
    let celda = document.createElement("td");
    celda.setAttribute("id",`celula-${i + "-"+ j}`);
    celda.setAttribute("onmouseup",`cambiarEstado(${i},${j})`);
    let textoCelda = document.createTextNode(" ");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
  }

  tblBody.appendChild(hilera);
}

tabla.appendChild(tblBody);
body.appendChild(tabla);
tabla.setAttribute("border", "1");
tabla.setAttribute("cellspacing", "0");
tabla.setAttribute("cellpadding", "0");
tabla.setAttribute("id","tablero");

// Esta función cambia el estado de una célula al ser clickeada
function cambiarEstado(i, j){
  let celula = document.getElementById(`celula-${i + "-"+ j}`);
  if (celula.style.background != "black"){
    celula.style.background = "black";
  } else {
    celula.style.background != "";
  }
}

// Esta función copia el estado actual del tablero
function reconocer(){
  reconoce = [];
  for (let i = 0; i < 15; i++) {
    reconoce.push([]);
    for (let j = 0; j < 15; j++) {
      let celula = document.getElementById(`celula-${i + "-"+ j}`);
      reconoce[i][j] = celula.style.background == "black";
    }
  }
}

// Esta función cuenta las células vivas alrededor de una célula específica
function contadorVivas(i, j){
  let vivas = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++){
      if (x == 0 && y == 0 )
        continue;
      try {
        if (reconoce[i + x][j + y])
          vivas++;
      } catch (e){}
      if(vivas > 3){
        return vivas;
      }
    }
  }
  return vivas;
}

// Esta función calcula el siguiente estado del juego
function siguienteEstado(){
  reconocer();
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++){
      let vivas = contadorVivas(i, j);
      let celula = document.getElementById(`celula-${i + "-"+ j}`);
      if (reconoce[i][j]) { // Si la célula está viva
        if (vivas < 2 || vivas > 3) {
          celula.style.background = ""; // La célula muere por sobrepoblación o soledad
        }
      } else { // Si la célula está muerta
        if (vivas === 3) {
          celula.style.background = "black"; // La célula nace si tiene exactamente 3 vecinas vivas
        }
      }
    }
  }
}





//Queria agregar una funcion para poder pintar celdas manteniendo el muse estripado pero no me funcionó :)
//
//
//let mousePresionado = false;

//tabla.addEventListener('mousedown', function() {
    //mousePresionado = true;
//});

//tabla.addEventListener('mouseup', function() {
    //mousePresionado = false;
//});

//function cambiarEstado(i, j){
    //let celula = document.getElementById(`celula-${i + "-"+ j}`);
//}

