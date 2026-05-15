// 1. Capturamos el canvas y su contexto de dibujo
const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");

// 2. Constante que guarda el tamaño de cada celda del tablero
const TAMANIO_CELDA = 25;

// 3. Arreglo que guarda las partes del cuerpo de la serpiente
const serpiente = [
  { x: 5, y: 4 },
  { x: 10, y: 10 },
  { x: 8, y: 0 }
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
  ctx.strokeStyle = "#22d3ee";

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

function pintarParte(lineaX, lineaY) {
  let posicionRealX = lineaX * TAMANIO_CELDA;
  let posicionRealY = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = "#facc15";
  ctx.fillRect(posicionRealX, posicionRealY, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#f97316";
  ctx.strokeRect(posicionRealX, posicionRealY, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    let parte = serpiente[i];

    pintarParte(parte.x, parte.y);
  }
}