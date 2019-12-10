function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

let arrayJuego

function nuevoJuego3() {
    arrayJuego = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
    shuffle(arrayJuego)
}

nuevoJuego3()

$cartas = document.querySelectorAll(".item")

tablero = {};
let i = 0;

$cartas.forEach(function (key) {
    tablero[key.id] = arrayJuego[i]
    i++
})

let carta1 = null
let carta2 = null

let hold = false

function darVuelta(carta) {
    $carta = document.querySelector(`#${event.path[1].id} img`)

    if (carta === 1) { $carta.src = "rose.jpg" }
    else if (carta === 2) { $carta.src = "amet.png" }
    else if (carta === 3) { $carta.src = "perl.png" }
    else if (carta === 4) { $carta.src = "ruby.png" }
    else if (carta === 5) { $carta.src = "saph.png" }
    else if (carta === 6) { $carta.src = "lapi.png" }
    else if (carta === 7) { $carta.src = "peri.jpg" }
    else if (carta === 8) { $carta.src = "bism.png" }
}

function compararCartas(valor1, valor2) {
    if (valor1 === valor2) {
        return true
    }
    else {
        return false
    }
}


let exitos = 0
function realizarComparacion(tara1, tara2) {
    

    if (compararCartas(tara1, tara2) === true) {    
        console.log("exito")
        carta1 = null
        carta2 = null
        document.querySelector("html").className = ""
        exitos += 1
        if (exitos === 8){
            console.log("ganaste el juego yey")
            document.querySelector(".oculto").className = ""
            document.querySelector(".memotest-container4").className = "oculto"
        }
    }
    else{
        console.log("fracaso")
        $cartaVolteada1 = document.querySelector(`#${cartaClickeada1} img`)
        $cartaVolteada1.src = "star.jpg" 
        $cartaVolteada2 = document.querySelector(`#${cartaClickeada2} img`)
        $cartaVolteada2.src = "star.jpg"
        desbloquear(bloqueo1)
        desbloquear(bloqueo2)
        bloqueo1 = null
        bloqueo2 = null
        carta1 = null
        carta2 = null
        document.querySelector("html").className = ""
    }
}

let bloqueo1 = null
let bloqueo2 = null

function bloquearCarta1(selector){
    $objetivo = document.querySelector(`#${selector}`)
    $objetivo.onclick = ''
    bloqueo1 = selector
}

function bloquearCarta2(selector){
    $objetivo = document.querySelector(`#${selector}`)
    $objetivo.onclick = ''
    bloqueo2 = selector
}

function desbloquear(target) {
    $objetivo = document.querySelector(`#${target}`)
    $objetivo.onclick = verCarta
}
cartaClickeada1 = null
cartaClickeada2 = null
verCarta = function (event) {
    
    if (hold === false) {
        cartaClickeada1 = event.path[1].id
        carta1 = tablero[cartaClickeada1]
        bloquearCarta1(cartaClickeada1)
        console.log(bloqueo1)

        darVuelta(carta1)

        hold = true
    }

    else {
        cartaClickeada2 = event.path[1].id
        carta2 = tablero[cartaClickeada2]
        darVuelta(carta2)
        bloquearCarta2(cartaClickeada2)
        console.log(bloqueo2)
        console.log(`${carta1} ${carta2}`)
        let $html = document.querySelector("html")
        $html.className = "bloquear-mouse"
        setTimeout(function(){realizarComparacion(carta1, carta2)}, 2000)

        
        hold = false
    }
    
    
}

Object.keys(tablero).forEach(function (key) {
    var $carta = document.querySelector(`#${key}`)
    $carta.onclick = verCarta
})



