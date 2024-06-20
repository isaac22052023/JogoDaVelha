const playerText = document.getElementById("playerText");
const restartBtn = document.getElementById("restartBtn");
const boxes = Array.from(document.getElementsByClassName("box"));
const winningIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
const xPointsText = document.getElementById("x-points");
const oPointsText = document.getElementById("o-points");

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id] && !playerHasWon()) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      playerText.innerText = `${currentPlayer} Ganhou!!!`;
      const winningBlocks = playerHasWon();
      winningBlocks.map(
        (box) => (boxes[box].style.backgroundColor = winningIndicator)
      );
      addPointsToWinner();
    } else if (isDraw()) {
      playerText.innerText = "Empate!!!";
    }

    currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
      return combo;
    }
  }
  return false;
}

function isDraw() {
  for (let i = 0; i < spaces.length; i++) {
    if (spaces[i] === null) return false;
  }
  return true;
}

function addPointsToWinner() {
  if (currentPlayer === X_TEXT)
    xPointsText.innerText = Number(xPointsText.innerText) + 1;
  else oPointsText.innerText = Number(oPointsText.innerText) + 1;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerText.innerText = "# Jogo da Velha #";

  currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
}

startGame();