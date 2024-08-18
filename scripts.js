// Wait for the entire HTML document to be loaded and ready
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const startButton = document.getElementById('startbtn');
    const resetButton = document.getElementById('resetButton');
    const gameContent = document.querySelector('.gamecontent');
    const cells = document.querySelectorAll('.cell');
    const statusDiv = document.querySelector('.status');
    
    // Audio elements for different game events
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const tieSound = document.getElementById('tieSound');
    
    // Game state variables
    let currentPlayer = 'x'; // Current player ('x' or 'o')
    let gameActive = false; // Flag to check if the game is active
    let board = Array(9).fill(null); // Array representing the game board

    // Function to start a new game
    const startGame = () => {
        gameContent.style.display = 'block'; // Show the game board
        startButton.style.display = 'none'; // Hide the start button
        gameActive = true; // Mark the game as active
        board.fill(null); // Reset the board
        cells.forEach(cell => {
            cell.textContent = ''; // Clear cell text
            cell.classList.remove('x', 'o'); // Remove previous player marks
            cell.classList.add('empty'); // Add empty class to cells
        });
    };

    // Function to check if there's a winner or a tie
    const checkWinner = () => {
        // Winning patterns for rows, columns, and diagonals
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        // Check each winning pattern
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winner ('x' or 'o')
            }
        }
        
        // Check for a tie (no more empty cells)
        return board.every(cell => cell !== null) ? 'tie' : null;
    };

    // Function to handle a cell click event
    const handleCellClick = (e) => {
        if (!gameActive) return; // Ignore clicks if the game is not active
        
        const cell = e.target; // The cell that was clicked
        const index = cell.getAttribute('data-index'); // Get the cell index

        // Check if the cell is already occupied or not empty
        if (board[index] || cell.classList.contains('x') || cell.classList.contains('o')) return;

        // Update the board and cell to reflect the current player's move
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        cell.classList.remove('empty');
        clickSound.play(); // Play click sound

        // Check if the game has a winner or a tie
        const winner = checkWinner();
        if (winner) {
            gameActive = false; // End the game
            if (winner === 'tie') {
                statusDiv.textContent = "It's a tie!"; // Show tie message
                tieSound.play(); // Play tie sound
            } else {
                statusDiv.textContent = `Congratulations Player ${winner.toUpperCase()}! You win 🏆!`; // Show winner message
                winSound.play(); // Play win sound
            }
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        }
    };

    // Function to reset the game
    const resetGame = () => {
        gameContent.style.display = 'none'; // Hide the game board
        startButton.style.display = 'block'; // Show the start button
        gameActive = false; // Mark the game as inactive
        board.fill(null); // Reset the board
        cells.forEach(cell => {
            cell.textContent = ''; // Clear cell text
            cell.classList.remove('x', 'o'); // Remove player marks
            cell.classList.add('empty'); // Add empty class
        });
        statusDiv.textContent = ''; // Clear status message
    };

    // Event listeners for start, reset buttons, and cell clicks
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
