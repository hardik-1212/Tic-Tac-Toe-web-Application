const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const playerBtn = document.getElementById("playerBtn");
const computerBtn = document.getElementById("computerBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsComputer = false;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Select Mode
playerBtn.addEventListener("click", () => {
    vsComputer = false;
    restartGame();
});

computerBtn.addEventListener("click", () => {
    vsComputer = true;
    restartGame();
});

// Cell Click
cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick(e){

    const index = e.target.dataset.index;

    if(board[index] !== "" || !gameActive){
        return;
    }

    makeMove(index, currentPlayer);

    if(checkWinner()){
        return;
    }

    if(vsComputer && currentPlayer === "O"){
        setTimeout(computerMove, 500);
    }
}

function makeMove(index, player){

    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player);

    if(checkWinner()){
        return;
    }

    currentPlayer = player === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function computerMove(){

    if(!gameActive) return;

    let empty = [];

    board.forEach((value,index)=>{
        if(value===""){
            empty.push(index);
        }
    });

    if(empty.length===0){
        return;
    }

    const randomIndex = empty[Math.floor(Math.random()*empty.length)];

    makeMove(randomIndex,"O");
}

function checkWinner(){

    for(let pattern of winPatterns){

        const [a,b,c] = pattern;

        if(
            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]
        ){

            statusText.textContent = `🎉 Player ${board[a]} Wins!`;
            gameActive = false;
            return true;
        }
    }

    if(!board.includes("")){
        statusText.textContent = "🤝 Match Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function restartGame(){

    board = ["","","","","","","","",""];
    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell=>{
        cell.textContent="";
        cell.classList.remove("X");
        cell.classList.remove("O");
    });

}