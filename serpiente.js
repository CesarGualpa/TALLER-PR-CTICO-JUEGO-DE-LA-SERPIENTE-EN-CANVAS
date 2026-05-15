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

// 5. Variable global que guarda la dirección actual
let direccionActual = "derecha";

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

  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
}

function iniciarJuego() {
  intervaloSerpiente = setInterval(moverSerpiente, 1000);
}

function pausarJuego() {
  clearInterval(intervaloSerpiente);
}