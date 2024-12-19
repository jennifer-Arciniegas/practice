document.addEventListener("DOMContentLoaded", () => {
  const comenzarJuego = document.getElementById("comenzarJuego");
  const tablero = document.getElementById("tablero");
  const display = document.getElementById("display");
  const turnoJugador = document.getElementById("turnoJugador");
  const celdas = tablero.children;

  let jugador1, jugador2, jugadorActual;
  let juegoActivo = false;
  let estadoJuego = ["", "", "", "", "", "", "", "", ""];

  const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Filas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columnas
    [0, 4, 8],
    [2, 4, 6], // Diagonales
  ];

  comenzarJuego.addEventListener("click", iniciarJuego);

  function iniciarJuego() {
    jugador1 = document.getElementById("alias1").value || "Jugador 1";
    jugador2 = document.getElementById("alias2").value || "Jugador 2";

    if (!jugador1 || !jugador2) {
      alert("Por favor, ingresa los alias de ambos jugadores.");
      return;
    }

    juegoActivo = true;
    jugadorActual = jugador1;
    turnoJugador.textContent = `Turno de: ${jugadorActual}`;
    display.value = "";
    estadoJuego = ["", "", "", "", "", "", "", "", ""];

    for (let celda of celdas) {
      celda.textContent = "";
      celda.addEventListener("click", manejarClick);
    }
  }

  function manejarClick(e) {
    const celdaIndex = Array.from(celdas).indexOf(e.target);

    if (estadoJuego[celdaIndex] !== "" || !juegoActivo) return;

    estadoJuego[celdaIndex] = jugadorActual === jugador1 ? "X" : "O";
    e.target.textContent = estadoJuego[celdaIndex];

    if (verificarGanador()) {
      display.value = `¡${jugadorActual} ha ganado!`;
      juegoActivo = false;
    } else if (!estadoJuego.includes("")) {
      display.value = "¡Empate!";
      juegoActivo = false;
    } else {
      jugadorActual = jugadorActual === jugador1 ? jugador2 : jugador1;
      turnoJugador.textContent = `Turno de: ${jugadorActual}`;
    }
  }

  function verificarGanador() {
    for (let combinacion of combinacionesGanadoras) {
      if (
        estadoJuego[combinacion[0]] &&
        estadoJuego[combinacion[0]] === estadoJuego[combinacion[1]] &&
        estadoJuego[combinacion[0]] === estadoJuego[combinacion[2]]
      ) {
        return true;
      }
    }
    return false;
  }
});
