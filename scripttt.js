const BOARD_SIZE = 9;
let board = [];

// Initialize board with empty cells
function initializeBoard() {
    board = Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => 0));
}

// Generate a random Sudoku puzzle (for demonstration purposes)
function generateSudoku() {
    const exampleBoard = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    board = exampleBoard;
    renderBoard();
}

// Render the Sudoku board
function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement('div');
            cell.textContent = board[i][j] === 0 ? '' : board[i][j];
            cell.classList.add('cell');
            if (board[i][j] !== 0) {
                cell.classList.add('fixed');
            }
            gameBoard.appendChild(cell);
        }
    }
}

// Solve the Sudoku puzzle using backtracking algorithm
function solve() {
    if (solveSudoku()) {
        renderBoard();
        document.getElementById('message').textContent = 'Sudoku solved successfully!';
    } else {
        document.getElementById('message').textContent = 'No solution exists for this Sudoku puzzle.';
    }
}

// Helper function to solve Sudoku using backtracking
function solveSudoku() {
    const emptyCell = findEmptyCell();
    if (!emptyCell) {
        return true; // Puzzle solved
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValidMove(row, col, num)) {
            board[row][col] = num;

            if (solveSudoku()) {
                return true;
            }

            board[row][col] = 0; // Backtrack
        }
    }

    return false; // No valid number found, backtrack
}

// Helper function to find an empty cell in the board
function findEmptyCell() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null; // No empty cell found
}

// Helper function to check if placing a number in a cell is valid
function isValidMove(row, col, num) {
    // Check row and column
    for (let i = 0; i < BOARD_SIZE; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    return true; // Valid move
}

// Validate the current board state
function validate() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] !== 0) {
                const num = board[i][j];
                board[i][j] = 0; // Temporarily clear the cell
                if (!isValidMove(i, j, num)) {
                    board[i][j] = num; // Restore the cell value
                    document.getElementById('message').textContent = 'Invalid Sudoku puzzle.';
                    return;
                }
                board[i][j] = num; // Restore the cell value
            }
        }
    }
    document.getElementById('message').textContent = 'Valid Sudoku puzzle.';
}

// Reset the Sudoku board
function reset() {
    initializeBoard();
    generateSudoku();
    document.getElementById('message').textContent = '';
}

// Initialize and generate the Sudoku board on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    generateSudoku();
});
