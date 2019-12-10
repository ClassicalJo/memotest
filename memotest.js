let arrayJuego = [];
let juego = {
    carta1: null,
    carta2: null,
    imagen1: null,
    imagen2: null,
    cartaClickeada1: null,
    cartaClickeada2: null,
    esperar: false,
    exitosRestantes: 8,
    dificultad: 16
}
let $memoTest = document.querySelector(".memotest-container")

function nuevoJuego(dif) {
    $memoTest.innerHTML = ""
    generarTablero(dif)
    shuffle(arrayJuego)
}

comenzar = function () {
    nuevoJuego(juego.dificultad)
}

comenzar()