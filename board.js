const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');

const xImgSrc = 'images/x.png';
const oImgSrc = 'images/heart.png';

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

let xWins = 0;
let oWins = 0;
const maxWins = 3;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function updateScoreboard() {
  document.getElementById('x-wins').textContent = `me: ${xWins}`;
  document.getElementById('o-wins').textContent = `you: ${oWins}`;
}

function checkWinner(board) {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[b] === board[c]
    ) {
      return board[a];
    }
  }
  return null;
}

function resetGame() {
  boardState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.innerHTML = '';
  });
  currentPlayer = 'X';

  if (currentPlayer === 'X' && !isGameOver()) {
    botPlay();
  }
}

function isGameOver() {
  return xWins >= maxWins || oWins >= maxWins;
}

function goToScorePage(winner) {
  window.location.href = `score.html?winner=${winner}`;
}

function botPlay() {
  if (isGameOver()) return;

  const emptyIndices = boardState
    .map((val, idx) => val === '' ? idx : null)
    .filter(idx => idx !== null);

  if (emptyIndices.length === 0) return;

  const choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  boardState[choice] = 'X';

  const cell = cells[choice];
  const img = document.createElement('img');
  img.src = xImgSrc;
  img.alt = 'X';
  cell.appendChild(img);

  const winner = checkWinner(boardState);

  if (winner) {
    xWins++;
    updateScoreboard();

    if (isGameOver()) {
      goToScorePage(winner);
    } else {
      setTimeout(resetGame, 1000);
    }
    return;
  }

  if (!boardState.includes('')) {
    setTimeout(resetGame, 1000);
    return;
  }

  currentPlayer = 'O';
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (isGameOver()) {
      return;
    }
    if (currentPlayer !== 'O') return;
    if (cell.querySelector('img')) return;
    if (checkWinner(boardState)) return;

    boardState[index] = 'O';

    const img = document.createElement('img');
    img.src = oImgSrc;
    img.alt = 'O';

    cell.appendChild(img);

    const winner = checkWinner(boardState);

    if (winner) {
      if (winner === 'X') xWins++;
      else oWins++;
      updateScoreboard();

      if (isGameOver()) {
        goToScorePage(winner);
      } else {
        setTimeout(resetGame, 1000);
      }
      return;
    }

    if (!boardState.includes('')) {
      setTimeout(resetGame, 1000);
      return;
    }

    currentPlayer = 'X';

    setTimeout(botPlay, 500);
  });
});

updateScoreboard();

if (currentPlayer === 'X' && !isGameOver()) {
  botPlay();
}
