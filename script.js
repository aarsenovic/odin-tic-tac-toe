function Gameboard(helperFunction) {
    
    function renderGameBoard(gameboard) {
        console.log("Renderovala se tabla");
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
            //  Also need logic that  checks  if element  already exists there and if  it  does user can't add new one
            field.addEventListener("click", () => {
                //probaj da iskoristis ovo u helper funkciji
                // if(gameboard[field.dataset.indexNumber] === " ") {
                //     gameboard[field.dataset.indexNumber] = "X";
                //     field.textContent = gameboard[field.dataset.indexNumber];
                // }
                // else {
                //     alert ("That field is already taken")
                // }
                // console.log(field.dataset.indexNumber);
                helperFunction(field.dataset.indexNumber, field, gameboard);
            })

            gameBoardDiv.appendChild(field);
        });
    }

    function deleteCurrentGameBoard(gameBoardDiv) {
        gameBoardDiv.remove();
    }

    return { renderGameBoard, deleteCurrentGameBoard }
}

function Player(name, sign) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { name, sign, increaseScore, getScore }
}



function Game() {


    let testBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    const gameBoardObject = Gameboard(collectUserInput);
    gameBoardObject.renderGameBoard(testBoard);
    // const playerOneName = prompt("Input player one name:")
    // const playerTwoName = prompt("Input player two name:")
    const board = document.querySelector(".gameboard");
    const playerOne = Player("Zack", "X");
    const playerTwo = Player("Miri", "O");

    function restartGame(currentBoard, currentBoardState) {
        gameBoardObject.deleteCurrentGameBoard(currentBoard);
        // currentBoardState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        let newBoardState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        gameBoardObject.renderGameBoard(newBoardState);
    }

    function checkIsGameOver(gameboard, sign) {
        console.log("trenutno stanje table",gameboard);
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
            if (gameboard[possibleWinningOutcomes[i][0]] === sign && gameboard[possibleWinningOutcomes[i][1]] === sign && gameboard[possibleWinningOutcomes[i][2]] === sign) {
                console.log(`${sign} is a winner`);
                console.log(`Game is won under condition ${i}`)
                isgameWon = true;
                restartGame(board,gameboard);
                // gameBoardObject.deleteCurrentGameBoard(board);
                // console.log("STANJE TABLE  NAKON FINISHA",gameboard)
                // let newBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
                // gameBoardObject.renderGameBoard(newBoard);
                // console.log("Nova tabla", newBoard)
                // isgameWon = false;
                // i = 0;

            }
            i++;
        }
        if (i === 8 && isgameWon === false) {
            console.log("Game is a tie!")
        }
    }

    function playGame(playerOne, playerTwo, gameboard) {
        let turns = 0;

    }
    let turn = 1;
    function collectUserInput(fieldIndex, field, gameboard) {
        makeMove(fieldIndex, field, gameboard);
    }

    function makeMove(fieldIndex, field, gameboard) {
        let isFieldTaken = false;
       if(gameboard[fieldIndex] !== " ") {
            isFieldTaken = true;
        
       }
        if (turn % 2 === 0 && isFieldTaken ===  false) {
            gameboard[fieldIndex] = playerTwo.sign;
            field.textContent = gameboard[fieldIndex];
            checkIsGameOver(gameboard, playerTwo.sign)
            turn++;
        } else if (turn % 2 !== 0 && isFieldTaken ===  false){
            gameboard[fieldIndex] = playerOne.sign;
            field.textContent = gameboard[fieldIndex];
            checkIsGameOver(gameboard, playerOne.sign)
            turn++;
        }
        
    }





    return { checkIsGameOver }
}

Game();

