const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; // X always starts
let board = ['', '', '', '', '', '', '', '', '']; // Empty board

// Function to check if there's a winner
const checkWinner = () => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      message.textContent = `${currentPlayer} Wins!`;
      return true;
    }
  }

  if (!board.includes('')) {
    message.textContent = "It's a Draw!";
    return true;
  }

  return false;
};

// Function to handle cell click
const handleClick = (index) => {
  if (board[index] !== '') return; // Cell already clicked
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWinner()) {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    message.textContent = `Player ${currentPlayer}'s turn`;
  }
};

// Attach click event to each cell
const handleCellClick = (e) => {
  const index = e.target.id.split('-')[1]; // Get the index from cell id
  handleClick(index);
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Reset the game
resetButton.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick);
  });
  currentPlayer = 'X';
  message.textContent = "Player X's turn";
});
