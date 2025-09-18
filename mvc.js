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

    function returnNodeList () {
        return fieldNodeArray
    }

    function updateField (field, sign) {
        field.textContent = sign;
    }

    function remakeGameBoard() {
        const board = document.querySelector(".gameboard");
        board.remove();
    }


    return {renderGameBoard, returnNodeList, updateField}
}

//model
function game() {
    let gameState = [" ", " ", " ", " ", " ", " ", " ", " ", " "];


    function updateGameState(index, sign) {
        if(gameState[index] === " ") {
            gameState[index] === sign
            return true
        } else {
            return false
        }
    }

    return {gameState}
}


function player() {

}


//controller
function gameController() {
    const view = gameboard();
    const model = game();

    view.renderGameBoard(model.gameState);

    const nodeListArray = view.returnNodeList();
    nodeListArray.forEach(element => {
        element.addEventListener ("click", ()=>{
            console.log(element.dataset.indexNumber)
        })
    })
}


gameController();