let gameArray = [];
let game = {
    card1: null,
    card2: null,
    image1: null,
    image2: null,
    clickedCard1: null,
    clickedCard2: null,
    wait: false,
    remainingGems: 8,
    difficulty: 16,
    timeouts: []
}


function newGame(dif) {
    game.timeouts.forEach((key) => clearTimeout(key))
    game.remainingGems = game.difficulty/2
    game.wait = false
    emptyCards()
    
    let $mainSection = document.querySelector(".main")
    $mainSection.innerHTML = ""
    let $newMemotest = document.createElement("div")
    $newMemotest.classList.add("memotest-container")
    $mainSection.appendChild($newMemotest)
    generateBoard(dif)
    shuffle(gameArray)
}

newGame(game.difficulty)
