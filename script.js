const gameboard = document.getElementById('tictactoeContainer');
const squares = document.querySelectorAll('.square');
const winnerBoard = document.querySelector('#winnerBoard');
const x = document.querySelector('#x');
const o = document.querySelector('#o');
const squareID = ["tl", "tc", "tr", "cl", "cc", "cr", "bl", "bc", "br"];
let myTurn = true;
let numberOfPLays = 0; // start comparing when > 4
const boardValues = {
  tl: "",
  tc: "",
  tr: "",
  cl: "",
  cc: "",
  cr: "",
  bl: "",
  bc: "",
  br: ""
};

const boardIDs = ["tl", "tc", "tr", "cl", "cc", "cr", "bl", "bc", "br"];

const winningCombos = [
  ["tl", "tc", "tr"], 
  ["cl", "cc", "cr"],
  ["bl", "bc", "br"],
  ["tl", "cl", "bl"],    
  ["tc", "cc", "bc"], 
  ["tr", "cr", "br"], 
  ["tr", "cc", "bl"], 
  ["tl", "cc", "br"],  
];

const whosTurn = (myTurn) => {
  if (myTurn) {
    x.classList.add('yourTurn');
    o.classList.remove('yourTurn');
  } else {
    o.classList.add('yourTurn');
    x.classList.remove('yourTurn');
  }
}

const removeTurn = () => {
  x.classList.remove('yourTurn');
  o.classList.remove('yourTurn');
}

// EVERYTHING STARTS HERE
(function makeGameBoard() {
  const spaces = 8;
  for( let i = 0; i <= spaces; i += 1) {
    let square = `
      <div class="square" id="${squareID[i]}"></div>
    `;
    gameboard.innerHTML += square;
  }
    whosTurn(myTurn);
})();

// Add X and O to board after clicking squares
gameboard.addEventListener('click', (square) => {
  let sign = !myTurn ? "O" : "X";
  // Add X or O to the square clicked
  document.getElementById(square.target.id).innerHTML = `<span class="xo-sign">${sign}</span>`;
  // Change myTurn boolean to opposite value of current value
  myTurn = !myTurn; 
  // Keep track of where Xs and Os are; seen in console only
  addBoardValues(square.target.id, sign);
  numberOfPLays += 1;
});

const addBoardValues = (target, sign) => {
  boardValues[target] = sign;
  whosTurn(myTurn);
  // Only check for winner after
  numberOfPLays < 4 ? null : checkWinner(boardValues);
}

const checkWinner = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    const [ sp1, sp2, sp3 ] = winningCombos[i];
    for (let key in boardValues) {
      if (boardValues[sp1]
         &&
         boardValues[sp1] === boardValues[sp2]
         &&
         boardValues[sp2] === boardValues[sp3]) { 
           let winner = boardValues[sp1];
           setTimeout(winngMsg, 1000, winner);
           return boardValues[sp1];
         }   
    }
    // console.log(boardValues[sp1], boardValues[sp2], boardValues[sp3]);
  }
}

const winngMsg = (winner) => {
  winnerBoard.innerHTML = `<h1>Winner is <span id="winnerSymbol">${winner}</span></h1>`;
  removeTurn();
}

const playAgain = () => {
  // clear out boardValues object
  for (let key in boardValues) {
    boardValues[key] = "";
  }  
  // clear out squares array
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => square.innerHTML = "");
  // Remove Winner sign
  winnerBoard.innerHTML = "";
  whosTurn();
}

document.querySelector('button').addEventListener('click', playAgain);