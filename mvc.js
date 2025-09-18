// view
function gameboard() {
    const fieldNodeArray = [];
    function renderGameBoard(gameboard) {

        const mainDiv = document.querySelector(".main");
        const gameBoardDiv = document.createElement("div");
        gameBoardDiv.classList.add("gameboard")
        mainDiv.appendChild(gameBoardDiv)

        let i = 0
        gameboard.forEach(element => {
            const field = document.createElement("div");
            field.textContent = element;
            field.setAttribute("data-index-number", i)
            i++;

            gameBoardDiv.appendChild(field);
            fieldNodeArray.push(field);
        })

    }

    function returnNodeList() {
        return fieldNodeArray
    }

    function updateField(field, sign) {
        field.textContent = sign;
    }

    function remakeGameBoard() {
        const board = document.querySelector(".gameboard");
        board.remove();
    }


    return { renderGameBoard, returnNodeList, updateField, remakeGameBoard }
}

//model
function game() {
    let gameState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const playerOne = player("Zack", "X");
    const playerTwo = player("Miri", "O");
    
    let nextTurn = playerOne.sign;

    function changeTurn() {
        console.log("Funkcija se pokrenula")
        console.log(nextTurn)
        if(nextTurn === playerOne.sign) {
            nextTurn = playerTwo.sign;
        } else {
             nextTurn = playerOne.sign;
        }
    }

    function getNextTurn() {
        console.log("unutar getNextTurn",nextTurn)
        return nextTurn
    }

    function makeAMove(index, sign) {
        if (gameState[index] === " ") {
            gameState[index] = sign
            console.log("Stanje niza", gameState)
            return true
        } else {
            alert("Incorrect Move")
            return false
        }
    }

    return {gameState, makeAMove, changeTurn, nextTurn, getNextTurn}
}


function player(name, sign) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { name, sign, increaseScore, getScore }
}


//controller
function gameController() {
    const view = gameboard();
    const model = game();

    view.renderGameBoard(model.gameState);

    const nodeListArray = view.returnNodeList();
    nodeListArray.forEach(element => {
        element.addEventListener("click", () => {
            if (model.makeAMove(element.dataset.indexNumber, model.getNextTurn())) {
                view.updateField(element, model.getNextTurn())

                model.changeTurn();
            }
            // console.log(element.dataset.indexNumber)
        })
    })
}


gameController();