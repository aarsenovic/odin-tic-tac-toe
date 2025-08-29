function Gameboard() {
    const gameboardArray = [];
    let  testBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    console.log("ARRAY COUNT", testBoard.length)

    function renderGameBoard(gameboard) {
        const mainDiv = document.querySelector(".main");
        const gameBoardDiv = document.createElement("div");
        gameBoardDiv.classList.add("gameboard")
        mainDiv.appendChild(gameBoardDiv)
        
        let i = 0 
        gameboard.forEach(element => {
            const field  = document.createElement("div");
            field.textContent = element;
            field.setAttribute("data-index-number", i)
            i++;
            //  Also need logic that  checks  if element  already exists there and if  it  does user can't add new one
            field.addEventListener("click",()=>{
                if(gameboard[field.dataset.indexNumber] === " ") {
                    gameboard[field.dataset.indexNumber] = "X";
                    field.textContent = gameboard[field.dataset.indexNumber];
                }
                else {
                    alert ("That field is already taken")
                }
            })

            gameBoardDiv.appendChild(field);
        });
    }

    renderGameBoard(testBoard);
}

function Player(name, sign) {
    let score = 0;
    const getScore =()=> score;
    const increaseScore =()=> score++;

    return {name,sign,increaseScore,getScore}
}



function Game() {


    function checkIsGameOver(gameboard, sign) {

        const possibleWinningOutcomes = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
        ]


        // if (gameboard[possibleWinningOutcomes[0][0]] === sign && gameboard[possibleWinningOutcomes[0][1]] === sign && gameboard[possibleWinningOutcomes[0][2]] === sign) {

        // }

        let i = 0;
        let isgameWon = false;
        while (i < possibleWinningOutcomes.length) {
            if (gameboard[possibleWinningOutcomes[i][0]] === sign && gameboard[possibleWinningOutcomes[i][1]] === sign && gameboard[possibleWinningOutcomes[i][2]] === sign) {
                console.log(`${sign} is a winner`);
                console.log(`Game is won under condition ${i}`)
                isgameWon = true;
            }
            i++;
        }
        if (i === 6 && isgameWon === false) {
            console.log("Game is a tie!")
        }
    }
    const example1 = ["X", "X", "X", "", "", "", "", "", ""];
    const example2 = ["X", "", "", "X", "", "", "X", "", ""];
    const example3 = ["X", "", "", "", "X", "", "", "", "X"];
    const example4 = ["", "", "X", "", "X", "", "X", "", ""];
    const example5 = ["", "", "", "X", "X", "X", "", "", ""];
    const example6 = ["", "", "", "", "", "", "X", "X", "X"];
    const example7 = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];


    checkIsGameOver(example1, "X");
    checkIsGameOver(example2, "X");
    checkIsGameOver(example3, "X");
    checkIsGameOver(example4, "X");
    checkIsGameOver(example5, "X");
    checkIsGameOver(example6, "X");
    console.log("Treba da bude TIE!")
    checkIsGameOver(example7, "X");

    return { checkIsGameOver }
}

Game();
Gameboard();
