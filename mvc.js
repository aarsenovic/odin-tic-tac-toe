(function() {
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
        if (nextTurn === playerOne.sign) {
            nextTurn = playerTwo.sign;
            nextPlayer = playerTwo;
        } else {
            nextTurn = playerOne.sign;
            nextPlayer = playerOne;
        }
        turn++;
    }

    function getTurnNumber() {
        return turn
    }

    function getNextTurn() {
        return nextTurn
    }

    function makeAMove(index, sign) {
        if (gameState[index] === " ") {
            gameState[index] = sign
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
                isgameWon = true;
                return {status: "WIN", winner: nextPlayer}

            }
            i++;
        }

        if (turn === 9 && isgameWon === false) {
            alert("GAME IS TIE!!!");
            return {status: "TIE"}
        }

        else {
            return {status: "ONGOING"}
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

    const playerOneName = prompt("Enter player one name: ");
    const playerTwoname = prompt("Enter player two name: ");

    const playerOne = player(playerOneName, "X");
    const playerTwo = player(playerTwoname, "O");

    const view = gameboard();
    const model = game(playerOne, playerTwo);

    view.renderGameBoard(model.gameState);

    function resetRound() {
            model.resetGameState();
            view.remakeGameBoard();
            view.renderGameBoard(model.getGameState());
    }

    function displaPlayerNames() {
        const playerOneNameDiv = document.querySelector(".player-one");
        const playerTwoNameDiv = document.querySelector(".player-two");
        playerOneNameDiv.textContent = playerOne.name;
        playerTwoNameDiv.textContent = playerTwo.name;
    }

    function displayPlayerScores() {
        const playerOneScoreDiv = document.querySelector(".player-one-score");
        const playerTwoScoreDiv = document.querySelector(".player-two-score");
        playerOneScoreDiv.textContent = playerOne.getScore();
        playerTwoScoreDiv.textContent = playerTwo.getScore();
    }

    function attachListeners() {
        const nodeListArray = view.returnNodeList();
        nodeListArray.forEach(element => {
            element.addEventListener("click", () => {
                if (model.makeAMove(element.dataset.indexNumber, model.getNextTurn())) {
                    view.updateField(element, model.getNextTurn())
                    let game = model.checkIsGameOver(model.getGameState(), model.getNextTurn(), model.getTurnNumber());

                    switch(game.status) {
                        case "WIN":
                            game.winner.increaseScore();
                            resetRound();
                            attachListeners();
                            displayPlayerScores();
                            break
                        case "ONGOING":
                            model.changeTurn();
                            break
                        case "TIE":
                            resetRound();
                            attachListeners();
                            break
                    }
                }
            })
        })
    }
    displaPlayerNames();
    displayPlayerScores();
    attachListeners();
}


gameController();
})();