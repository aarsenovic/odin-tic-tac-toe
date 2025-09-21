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
function game(playerOne, playerTwo) {
    let gameState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];


    let nextTurn = playerOne.sign;
    let nextPlayer = playerOne;
    let turn = 1;

    function getGameState() {
        return gameState
    }

    function changeTurn() {
        // console.log("Funkcija se pokrenula")
        // console.log(nextTurn)
        if (nextTurn === playerOne.sign) {
            nextTurn = playerTwo.sign;
            nextPlayer = playerTwo;
        } else {
            nextTurn = playerOne.sign;
            nextPlayer = playerOne;
        }
        console.log("broj poteza", turn);
        turn++;
    }

    function getTurnNumber() {
        return turn
    }

    function getNextTurn() {
        // console.log("unutar getNextTurn",nextTurn)
        return nextTurn
    }

    function makeAMove(index, sign) {
        if (gameState[index] === " ") {
            gameState[index] = sign
            // console.log("Stanje niza", gameState)
            return true
        } else {
            alert("Incorrect Move")
            return false
        }
    }

    function checkIsGameOver(boardState, sign, turn) {
        const possibleWinningOutcomes = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
            [1, 4, 7],
            [2, 5, 8],
        ]

        let i = 0;
        let isgameWon = false;
        while (i < possibleWinningOutcomes.length) {
            if (boardState[possibleWinningOutcomes[i][0]] === sign && boardState[possibleWinningOutcomes[i][1]] === sign && boardState[possibleWinningOutcomes[i][2]] === sign) {
                console.log(`${sign} is a winner`);
                console.log(`Game is won under condition ${i}`)
                isgameWon = true;
                return nextPlayer

            }
            i++;
        }

        if (turn === 9 && isgameWon === false) {
            alert("GAME IS TIE!!!");
            return "TIE"
        }
    }

    function resetGameState() {
        turn = 1;
        gameState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        nextTurn = playerOne.sign;
        nextPlayer = playerOne;
    }

    return { gameState, makeAMove, changeTurn, nextTurn, getNextTurn, checkIsGameOver, getTurnNumber, resetGameState, getGameState }
}


function player(name, sign) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { name, sign, increaseScore, getScore }
}


//controller
function gameController() {

    const playerOne = player("Zack", "X");
    const playerTwo = player("Miri", "O");

    const view = gameboard();
    const model = game(playerOne, playerTwo);

    view.renderGameBoard(model.gameState);

    function attachListeners() {
        const nodeListArray = view.returnNodeList();
        nodeListArray.forEach(element => {
            element.addEventListener("click", () => {
                if (model.makeAMove(element.dataset.indexNumber, model.getNextTurn())) {
                    view.updateField(element, model.getNextTurn())
                    let game = model.checkIsGameOver(model.getGameState(), model.getNextTurn(), model.getTurnNumber());
                    if (typeof game === "object") {
                        game.increaseScore();
                        model.resetGameState();
                        view.remakeGameBoard();
                        view.renderGameBoard(model.getGameState());
                        attachListeners();
                        console.log("Prvi igrac: ", playerOne.getScore());
                        console.log("Drugi igrac: ", playerTwo.getScore());
                        console.log("Potez", model.getNextTurn());
                        console.log("State table", model.getGameState());
                    }
                    if (!game) {
                        model.changeTurn();
                    }
                    if (game === "TIE") {
                        model.resetGameState();
                        view.remakeGameBoard();
                        view.renderGameBoard(model.getGameState());
                        attachListeners();
                    }
                }
            })
        })
    }
    attachListeners();
}


gameController();