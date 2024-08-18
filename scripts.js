document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startbtn');
    const resetButton = document.getElementById('resetButton');
    const gameContent = document.querySelector('.gamecontent');
    const cells = document.querySelectorAll('.cell');
    const statusDiv = document.querySelector('.status');
    
    const clickSound = document.getElementById('clickSound');
    const winSound = document.getElementById('winSound');
    const tieSound = document.getElementById('tieSound');
    
    let currentPlayer = 'x';
    let gameActive = false;
    let board = Array(9).fill(null);

    const startGame = () => {
        gameContent.style.display = 'block';
        startButton.style.display = 'none';
        gameActive = true;
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.classList.add('empty');
        });
    };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        
        return board.every(cell => cell !== null) ? 'tie' : null;
    };

    const handleCellClick = (e) => {
        if (!gameActive) return;

        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (board[index] || cell.classList.contains('x') || cell.classList.contains('o')) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        cell.classList.remove('empty');
        clickSound.play();

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            if (winner === 'tie') {
                statusDiv.textContent = "It's a tie!";
                tieSound.play();
            } else {
                statusDiv.textContent = `Congratulations Player ${winner.toUpperCase()}! You win 🏆!`;
                winSound.play();
            }
        } else {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        }
    };

    const resetGame = () => {
        gameContent.style.display = 'none';
        startButton.style.display = 'block';
        gameActive = false;
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.classList.add('empty');
        });
        statusDiv.textContent = '';
    };

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
