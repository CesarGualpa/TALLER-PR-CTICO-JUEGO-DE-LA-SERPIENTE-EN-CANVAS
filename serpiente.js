// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. Constante que guarda el tamaño de cada celda del tablero
const TAMANIO_CELDA = 25;

// 3. Arreglo que guarda las partes del cuerpo de la serpiente
const serpiente = [
  { x: 8, y: 8 },
  { x: 9, y: 8 },
  { x: 10, y: 8 },
  { x: 10, y: 9 }
];

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

function moverDerecha() {
  let cabezaActual = serpiente[0];

  let nuevaCabeza = {
    x: cabezaActual.x + 1,
    y: cabezaActual.y
  };

  serpiente.unshift(nuevaCabeza);

  serpiente.pop();
}

function cambiarDireccion(direccion) {
  if (direccion == "derecha") {
    moverDerecha();
  }

  limpiarCanvas();
  dibujarTablero();
  pintarSerpiente();
}