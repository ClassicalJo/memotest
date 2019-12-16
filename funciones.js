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
    for (let i = 1; i <= cantidad; i++) {
        arrayJuego.push(Math.ceil(i / 2))
    }
    for (let i = 0; i < cantidad; i++) {
        let $carta = document.createElement("div")
            $carta.className = "atrac"
            $carta.id = `atrac${i}`
            $carta.setAttribute("onclick", "verCarta(event)")

            let $cartaReverso = document.createElement("div")

            $cartaReverso.className = 'carta-reverso'

            let $cartaInterno = document.createElement("div")
            $cartaInterno.className = "carta-interno"

            let $cartaFrente = document.createElement("div")

            $cartaFrente.className = "carta-frente"
            $cartaFrente.id = `${i}`

            let $img = document.createElement("img")
            $img.src = "images/star.jpg"

            let $foto = document.createElement('img')
            $foto.id = `foto${i}`


            $cartaFrente.appendChild($img)

            $cartaReverso.appendChild($foto)
            $cartaInterno.appendChild($cartaFrente)
            $cartaInterno.appendChild($cartaReverso)

            $carta.appendChild($cartaInterno)

            $memoTest.appendChild($carta)
    }
}

function darVuelta(carta, reverso) {
    if (carta === 1) { reverso.src = "images/rose.jpg" }
    else if (carta === 2) { reverso.src = "images/amet.png" }
    else if (carta === 3) { reverso.src = "images/perl.png" }
    else if (carta === 4) { reverso.src = "images/ruby.png" }
    else if (carta === 5) { reverso.src = "images/saph.png" }
    else if (carta === 6) { reverso.src = "images/lapi.png" }
    else if (carta === 7) { reverso.src = "images/peri.png" }
    else if (carta === 8) { reverso.src = "images/bism.png" }
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
    let $darVuelta = document.querySelector(`#${event.path[3].id}`)
    $darVuelta.classList.add('carta')
    $darVuelta.removeAttribute("onclick")
    let $reverso = document.querySelector(`#${event.path[2].childNodes[1].childNodes[0].id}`)

    if (juego.esperar === false) {
        juego.carta1 = arrayJuego[event.path[1].id]
        juego.cartaClickeada1 = $darVuelta
        juego.imagen1 = $reverso
        darVuelta(juego.carta1, $reverso)
        juego.esperar = true
    }
    else {
        juego.carta2 = arrayJuego[event.path[1].id]
        juego.cartaClickeada2 = $darVuelta
        juego.imagen2 = $reverso
        darVuelta(juego.carta2, $reverso)
        juego.esperar = false
    }

    if (juego.cartaClickeada2 !== null) {
        bloquearMouse()
        setTimeout(function () { realizarComparacion(juego.carta1, juego.carta2) }, 2000)
    }

}
function revisarVictoria() {
    if (juego.exitosRestantes === 0) {
        $memoTest.innerHTML = ''
        $container = document.querySelector('.container')
        $h2 = document.createElement("h2")
        $h2.textContent = "VICTORIA!"
        $h2.className = "victoria"
        $container.appendChild($h2)
    }
}

function realizarComparacion(valor1, valor2) {
    if (compararCartas(valor1, valor2)) {
        juego.exitosRestantes -= 1
        revisarVictoria()
        vaciarCartas()
        desbloquearMouse()
    }
    else {
        juego.cartaClickeada1.classList.remove("carta")
        juego.cartaClickeada2.classList.remove("carta")

        setTimeout(function () {
            juego.imagen1.src = ""
            juego.cartaClickeada1.setAttribute("onclick", "verCarta(event)")
            juego.imagen2.src = ""
            juego.cartaClickeada2.setAttribute("onclick", "verCarta(event)")
            vaciarCartas()
            desbloquearMouse()
        }, 250)
    }

}


function vaciarCartas() {
    juego.carta1 = null
    juego.carta2 = null
    juego.cartaClickeada1 = null
    juego.cartaClickeada2 = null
    juego.imagen1 = null
    juego.imagen2 = null
}
function bloquearMouse() {
    $memoTest.classList.add("bloquear-mouse")
}

function desbloquearMouse() {
    $memoTest.classList.remove("bloquear-mouse")
}

function preCargarImagenes(array) {
    array.forEach((value, index) => {
        array[index] = new Image()
        array[index].src = value
    })
    return array
}

const imagenes = preCargarImagenes([
    "images/rose.jpg", 
    "images/amet.png", 
    "images/bism.png", 
    "images/lapi.png", 
    "images/peri.png", 
    "images/perl.png", 
    "images/ruby.png", 
    "images/saph.png", 
    "images/star.jpg"
])
