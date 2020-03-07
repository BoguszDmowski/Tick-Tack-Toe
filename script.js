/*###game status element*/
const statusDisplay = document.querySelector(".game--status");

/*###game state variables*/
/*activity variable*/
let gameActive = true;
/*current player variable*/
let currentPlayer = "X";
/*game state variable*/
let gameState = ["","","","","","","","",""];

/*arrow functions for in game messanges*/
const winningMessage = () => `Player ${currentPlayer} obliterated the enemy`;
const drawMessage = () => `Game ended in an unsatisfying draw`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn, ${currentPlayer} May the odds be ever in your favor`;
/*First messange- who plays*/
statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 6, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    /*updating internal game state to reflect player move and updating interface*/
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
currentPlayer = currentPlayer === "X" ? "0": "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <=7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a ==="" || b ==="" || c === "") {
            continue;
        }
        if (a===b && b ===c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        
        return;
    }
    /*check if there are any free cells*/
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    /*if we made it to here the game is still on and the player needs to be changed*/
    handlePlayerChange();

}

function handleCellClick(clickedCellEvent) {
    /*I will save the clicked html element in a variable for further use*/    
    const clikedCell = clickedCellEvent.target;
    /*grabbing the 'data-cell-ondex' atribute from cliked cell to identify where the cell is in our grid.
    getAtribute will return a string value. I need an actual number, I will parse it to an integer(number)*/
    const clickedCellIndex = parseInt(
        clikedCell.getAttribute('data-cell-index')
    );
    /*Now: has this cell already been played, or is the game paused, than ignore the click*/
    if (gameState[clickedCellIndex] !=="" || !gameActive) {
        return;
    }
    /*if the situation is wright the game proceeds*/
    handleCellPlayed(clikedCell, clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach(cell => (cell.innerHTML = ""));
}
/*evnt listeners for game cells and restart button*/
document
 .querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document
  .querySelector('.game--restart').addEventListener('click', handleRestartGame);