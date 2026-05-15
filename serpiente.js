// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. Constante que guarda el tamaño de cada celda del tablero
const TAMANIO_CELDA = 25;

// 3. Arreglo que guarda las partes del cuerpo de la serpiente
const serpiente = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 }
];

// 4. Variable global para guardar el intervalo
let intervaloSerpiente;

// 5. Variable global para controlar la velocidad del juego
let velocidad = 200;

// 6. Variable global que guarda la dirección actual
let direccionActual = "derecha";

// 7. Variable global que guarda el puntaje
let puntaje = 0;

// 8. Variable global que guarda la posición de la comida
let comida = {
  x: 12,
  y: 12
};

// Generamos una comida aleatoria al cargar la página
generarComida();

// Primera pintura del juego al cargar la página
dibujarTodo();

// =========================
// FUNCIONES DE DIBUJO
// =========================

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();
  pintarComida();
  pintarSerpiente();
}

function dibujarTablero() {
  ctx.strokeStyle = "#1e293b";

  // Líneas verticales
  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Líneas horizontales
  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY, color) {
  let posicionRealX = lineaX * TAMANIO_CELDA;
  let posicionRealY = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = color;
  ctx.fillRect(posicionRealX, posicionRealY, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(posicionRealX, posicionRealY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    let parte = serpiente[i];

    if (i == 0) {
      pintarParte(parte.x, parte.y, "#ffff00");
    } else {
      pintarParte(parte.x, parte.y, "#ff1f1f");
    }
  }
}

function pintarComida() {
  pintarParte(comida.x, comida.y, "#22c55e");
}

// =========================
// FUNCIONES DE COMIDA
// =========================

function generarComida() {
  let cantidadColumnas = canvas.width / TAMANIO_CELDA;
  let cantidadFilas = canvas.height / TAMANIO_CELDA;

  let posicionX = Math.floor(Math.random() * cantidadColumnas);
  let posicionY = Math.floor(Math.random() * cantidadFilas);

  comida = {
    x: posicionX,
    y: posicionY
  };
}

// =========================
// FUNCIONES DE MOVIMIENTO
// =========================

function moverDerecha() {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverIzquierda() {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x - 1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverArriba() {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y - 1
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

function moverAbajo() {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x,
    y: cabezaActual.y + 1
  };

  serpiente.unshift(nuevaCabeza);
  serpiente.pop();
}

// =========================
// FUNCIONES DEL JUEGO
// =========================

function cambiarDireccion(direccion) {
  direccionActual = direccion;
}

function moverSerpiente() {
  if (direccionActual == "derecha") {
    moverDerecha();
  }

  if (direccionActual == "izquierda") {
    moverIzquierda();
  }

  if (direccionActual == "arriba") {
    moverArriba();
  }

  if (direccionActual == "abajo") {
    moverAbajo();
  }

  if (tocaBorde() == true) {
    finalizarJuego();
    return;
  }

  if (atrapaComida() == true) {
    aumentarPuntaje();
    crecerSerpiente();
    generarComida();
  }

  dibujarTodo();
}

function iniciarJuego() {
  clearInterval(intervaloSerpiente);

  intervaloSerpiente = setInterval(moverSerpiente, velocidad);

  let etiquetaEstado = document.getElementById("estado");
  etiquetaEstado.innerText = "Jugando";

  let mensaje = document.getElementById("mensaje");
  mensaje.innerText = "Juego iniciado.";
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
}

function atrapaComida() {
  let cabeza = serpiente[0];

  if (cabeza.x == comida.x && cabeza.y == comida.y) {
    return true;
  } else {
    return false;
  }
}

function aumentarPuntaje() {
  puntaje = puntaje + 1;

  let etiquetaPuntaje = document.getElementById("puntaje");
  etiquetaPuntaje.innerText = puntaje;
}

function crecerSerpiente() {
  let cola = serpiente[serpiente.length - 1];

  let nuevaParte;

  if (direccionActual == "derecha") {
    nuevaParte = {
      x: cola.x - 1,
      y: cola.y
    };
  }

  if (direccionActual == "izquierda") {
    nuevaParte = {
      x: cola.x + 1,
      y: cola.y
    };
  }

  if (direccionActual == "arriba") {
    nuevaParte = {
      x: cola.x,
      y: cola.y + 1
    };
  }

  if (direccionActual == "abajo") {
    nuevaParte = {
      x: cola.x,
      y: cola.y - 1
    };
  }

  serpiente.push(nuevaParte);
}

function tocaBorde() {
  let cabeza = serpiente[0];

  let cantidadColumnas = canvas.width / TAMANIO_CELDA;
  let cantidadFilas = canvas.height / TAMANIO_CELDA;

  if (cabeza.x < 0) {
    return true;
  }

  if (cabeza.x >= cantidadColumnas) {
    return true;
  }

  if (cabeza.y < 0) {
    return true;
  }

  if (cabeza.y >= cantidadFilas) {
    return true;
  }

  return false;
}

function finalizarJuego() {
  clearInterval(intervaloSerpiente);

  let etiquetaEstado = document.getElementById("estado");
  etiquetaEstado.innerText = "GAME OVER";

  let mensaje = document.getElementById("mensaje");
  mensaje.innerText = "GAME OVER: La serpiente tocó el borde del tablero.";
}

function reiniciarJuego() {
  clearInterval(intervaloSerpiente);

  serpiente.length = 0;

  serpiente.push({ x: 8, y: 8 });
  serpiente.push({ x: 7, y: 8 });
  serpiente.push({ x: 6, y: 8 });

  direccionActual = "derecha";

  puntaje = 0;

  let etiquetaPuntaje = document.getElementById("puntaje");
  etiquetaPuntaje.innerText = puntaje;

  let etiquetaEstado = document.getElementById("estado");
  etiquetaEstado.innerText = "Listo";

  let mensaje = document.getElementById("mensaje");
  mensaje.innerText = "Presiona iniciar para comenzar.";

  generarComida();

  dibujarTodo();
}