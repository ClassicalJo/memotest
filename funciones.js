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

function generateBoard(amount) {
    $memoTest = document.querySelector(".memotest-container")
    for (let i = 1; i <= amount; i++) {
        gameArray.push(Math.ceil(i / 2))
    }
    for (let i = 0; i < amount; i++) {
        let $card = document.createElement("div")
        $card.className = "atrac"
        $card.id = `atrac${i}`
        $card.setAttribute("onclick", "lookAtCard(event)")

        let $cardReverse = document.createElement("div")

        $cardReverse.className = 'card-reverse'

        let $cardInterior = document.createElement("div")
        $cardInterior.className = "card-interior"

        let $cardFront = document.createElement("div")

        $cardFront.className = "card-front"
        $cardFront.id = `${i}`

        let $img = document.createElement("img")
        $img.src = "images/star.jpg"

        let $photo = document.createElement('img')
        $photo.id = `photo${i}`


        $cardFront.appendChild($img)

        $cardReverse.appendChild($photo)
        $cardInterior.appendChild($cardFront)
        $cardInterior.appendChild($cardReverse)

        $card.appendChild($cardInterior)

        $memoTest.appendChild($card)
    }
}

function turnAround(card, reverse) {
    if (card === 1) { reverse.src = "images/rose.jpg" }
    else if (card === 2) { reverse.src = "images/amet.png" }
    else if (card === 3) { reverse.src = "images/perl.png" }
    else if (card === 4) { reverse.src = "images/ruby.png" }
    else if (card === 5) { reverse.src = "images/saph.png" }
    else if (card === 6) { reverse.src = "images/lapi.png" }
    else if (card === 7) { reverse.src = "images/peri.png" }
    else if (card === 8) { reverse.src = "images/bism.png" }
}

function compareCards(value1, value2) {
    return (value1 === value2)
}

lookAtCard = function (event) {
    let $turnAround = document.querySelector(`#${event.path[3].id}`)
    $turnAround.classList.add('card')
    $turnAround.removeAttribute("onclick")
    let $reverse = document.querySelector(`#${event.path[2].childNodes[1].childNodes[0].id}`)

    if (game.wait === false) {
        game.card1 = gameArray[event.path[1].id]
        game.clickedCard1 = $turnAround
        game.image1 = $reverse
        turnAround(game.card1, $reverse)
        game.wait = true
    }
    else {
        game.card2 = gameArray[event.path[1].id]
        game.clickedCard2 = $turnAround
        game.image2 = $reverse
        turnAround(game.card2, $reverse)
        game.wait = false
    }

    if (game.clickedCard2 !== null) {
        blockMouse()
        let comparison = setTimeout(function () { makeComparison(game.card1, game.card2) }, 2000)
        game.timeouts.push(comparison)
    }

}
function checkVictory() {
    if (game.remainingGems === 0) {
        let $main = document.querySelector('.main')
        $main.innerHTML = ''

        let $div = document.createElement("div")
        $div.className = "victory-wrapper"
        let $h2 = document.createElement("h2")
        $h2.textContent = "You win!!"
        $h2.className = "victory"

        $div.appendChild($h2)
        $main.appendChild($div)
    }
}

function makeComparison(valor1, valor2) {
    if (compareCards(valor1, valor2)) {
        game.remainingGems -= 1
        checkVictory()
        emptyCards()
        unblockMouse()
    }
    else {
        game.clickedCard1.classList.remove("card")
        game.clickedCard2.classList.remove("card")

        let failTimeout = setTimeout(function () {
            game.image1.src = ""
            game.clickedCard1.setAttribute("onclick", "lookAtCard(event)")
            game.image2.src = ""
            game.clickedCard2.setAttribute("onclick", "lookAtCard(event)")
            emptyCards()
            unblockMouse()
        }, 250)
        game.timeouts.push(failTimeout)
    }

}


function emptyCards() {
    game.card1 = null
    game.card2 = null
    game.clickedCard1 = null
    game.clickedCard2 = null
    game.image1 = null
    game.image2 = null
}
function blockMouse() {
    $memoTest.classList.add("block-mouse")
}

function unblockMouse() {
    $memoTest.classList.remove("block-mouse")
}

function preloadImages(array) {
    array.forEach((value, index) => {
        array[index] = new Image()
        array[index].src = value
    })
    return array
}

const images = preloadImages([
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
