//Fisher-Yates shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function generarTablero(cantidad) {
    exitos = 0
    for (let i = 1; i <= cantidad; i++) {
        arrayJuego.push(Math.ceil(i/2))
    }
    for (let i = 1; i <= cantidad; i++) {
        $div = document.createElement("div")
        $div.setAttribute("onclick", "verCarta(event)")
        $div.className = "item"
        $div.id = `carta${i}`


        $img = document.createElement("img")
        $img.src = "images/star.jpg"
        $div.appendChild($img)
        $memoTest.appendChild($div)
    }
}

function darVuelta(carta) {
    $carta = document.querySelector(`#${event.path[1].id} img`)

    if (carta === 1) { $carta.src = "images/rose.jpg" }
    else if (carta === 2) { $carta.src = "images/amet.png" }
    else if (carta === 3) { $carta.src = "images/perl.png" }
    else if (carta === 4) { $carta.src = "images/ruby.png" }
    else if (carta === 5) { $carta.src = "images/saph.png" }
    else if (carta === 6) { $carta.src = "images/lapi.png" }
    else if (carta === 7) { $carta.src = "images/peri.jpg" }
    else if (carta === 8) { $carta.src = "images/bism.png" }
}

function compararCartas(valor1, valor2) {
    if (valor1 === valor2) {
        return true
    }
    else {
        return false
    }
}

verCarta = function (event) {
    if (hold === false) {
        cartaClickeada1 = event.path[1].id
        carta1 = tablero[cartaClickeada1]
        bloquearCarta1(cartaClickeada1)
        darVuelta(carta1)
        hold = true
    }
    else {
        cartaClickeada2 = event.path[1].id
        carta2 = tablero[cartaClickeada2]
        darVuelta(carta2)
        bloquearCarta2(cartaClickeada2)
        bloquearMouse()
        setTimeout(function () { realizarComparacion(carta1, carta2) }, 2000)
        hold = false
    }
}

function revisarVictoria() {
    if (exitosRestantes === 0) {
        document.querySelector(".oculto").textContent = "ganaste SOS LO MAS"
        document.querySelector(".oculto").className = "victoria"
        document.querySelector(".memotest-container").className = "oculto"
    }
}

function realizarComparacion(valor1, valor2) {
    if (compararCartas(valor1, valor2)) {
        exitosRestantes -= 1
        revisarVictoria()
    }
    else {
        document.querySelector(`#${cartaClickeada1} img`).src = "images/star.jpg"
        document.querySelector(`#${cartaClickeada2} img`).src = "images/star.jpg"
        desbloquear(bloqueo1)
        desbloquear(bloqueo2)
    }
    desbloquearMouse()
}

function bloquearMouse() {
    $memoTest.classList.add("bloquear-mouse")
}

function desbloquearMouse() {
    $memoTest.classList.remove("bloquear-mouse")
}

function bloquearCarta1(selector) {
    $objetivo = document.querySelector(`#${selector}`)
    $objetivo.onclick = ''
    bloqueo1 = selector
}

function bloquearCarta2(selector) {
    $objetivo = document.querySelector(`#${selector}`)
    $objetivo.onclick = ''
    bloqueo2 = selector
}

function desbloquear(target) {
    $objetivo = document.querySelector(`#${target}`)
    $objetivo.onclick = verCarta
}