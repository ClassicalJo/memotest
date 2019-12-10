let arrayJuego = [];
let tablero = {};
let carta1 = null
let carta2 = null
let hold = false
let $body = document.querySelector("body")
let exitosRestantes
let bloqueo1 = null
let bloqueo2 = null
let cartaClickeada1 = null
let cartaClickeada2 = null

let nombre = null
let dificultad = 16

function nuevoJuego(dif) {
    $dificultad.classList.add("oculto")
    $memoTest = document.querySelector(".memotest-container")
    $memoTest.innerHTML = ""
    $memoTest.classList.remove("oculto")
    exitosRestantes = dif / 2
    generarTablero(dif)
    shuffle(arrayJuego)
    let $cartas = document.querySelectorAll(".item")
    for (let i = 0; i < $cartas.length; i++) { tablero[$cartas[i].id] = arrayJuego[i] }
}


$bienvenida = document.createElement("div")
$bienvenida.innerText = "Hola!"
$dificultad = document.querySelector(".dificultad")
$dificultad.appendChild($bienvenida)
$input = document.createElement("input");
$input.type = "text";
$input.classList.add("hidden")
$input.setAttribute("onkeydown", "nuevoNombre(event)")
$dificultad.appendChild($input)

setTimeout(function () { preguntarNombre() }, 600)

function preguntarNombre() {
    $bienvenida.innerText = "Como prefieres que te llame?"
    $input.classList.remove("hidden")
}

nuevoNombre = function (event) {
    if (event.key === "Enter") {
        nombre = $input.value
        $input.classList.add("hidden")
        let $unDiv = document.createElement("div")
        $unDiv.id = ("selector-dificultad")
        $bienvenida.innerText = "Por favor, elija una dificultad:"

        for (let i = 2; i <= 8; i = i + 2) {
            $radio = document.createElement("input")
            $radio.type = "radio"
            $radio.setAttribute("value", `${i*2}`)
            $radio.name = "dificultad"

            $texto = document.createElement("span")
            $texto.innerText = ` ${i} x ${i}`
            $unDiv.appendChild($radio)
            $unDiv.appendChild($texto)
        }
        $dificultad.appendChild($unDiv)
        document.querySelector("input[type=radio]").checked = true
        $comenzar = document.createElement("input")
        $comenzar.type = "button"
        $comenzar.value = "Comenzar!"
        $comenzar.setAttribute("onclick", `comenzar()`)
        $dificultad.appendChild($comenzar)

    }
}

comenzar = function(){
    let difficulty
    $radios = document.querySelectorAll("input[name=dificultad]")
    $radios.forEach(function(key){
        difficulty = key.value
        if(key.checked === true) {nuevoJuego(difficulty)}
    })
    
}
