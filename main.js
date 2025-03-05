class TicTacToe {
    constructor() {
        this.board = document.getElementById('board');
        this.cells = document.querySelectorAll('[data-cell]');
        this.status = document.getElementById('status');
        this.restartButton = document.getElementById('restartButton');
        this.pvpMode = document.getElementById('pvpMode');
        this.pvcMode = document.getElementById('pvcMode');
        this.currentPlayer = 'x';
        this.isComputerMode = false;
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.initializeGame();
    }

    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleClick(cell));
        });

        this.restartButton.addEventListener('click', () => this.restartGame());
        this.pvpMode.addEventListener('click', () => this.setGameMode(false));
        this.pvcMode.addEventListener('click', () => this.setGameMode(true));

        this.updateBoardHoverClass();
    }

    handleClick(cell) {
        if (!this.gameActive || cell.classList.contains('x') || cell.classList.contains('o')) {
            return;
        }

        this.placeMark(cell, this.currentPlayer);
        
        if (this.checkWin(this.currentPlayer)) {
            this.endGame(`${this.currentPlayer.toUpperCase()} Wins!`);
            return;
        }

        if (this.isDraw()) {
            this.endGame("Draw!");
            return;
        }

        this.swapTurns();
        this.updateBoardHoverClass();

        if (this.isComputerMode && this.currentPlayer === 'o' && this.gameActive) {
            setTimeout(() => this.computerMove(), 500);
        }
    }

    computerMove() {
        const emptyCells = [...this.cells].filter(
            cell => !cell.classList.contains('x') && !cell.classList.contains('o')
        );
        
        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.placeMark(randomCell, this.currentPlayer);
            
            if (this.checkWin(this.currentPlayer)) {
                this.endGame(`${this.currentPlayer.toUpperCase()} Wins!`);
                return;
            }

            if (this.isDraw()) {
                this.endGame("Draw!");
                return;
            }

            this.swapTurns();
            this.updateBoardHoverClass();
        }
    }

    placeMark(cell, mark) {
        cell.classList.add(mark);
        cell.textContent = mark.toUpperCase();
    }

    swapTurns() {
        this.currentPlayer = this.currentPlayer === 'x' ? 'o' : 'x';
        this.status.textContent = `Player ${this.currentPlayer.toUpperCase()}'s turn`;
    }

    updateBoardHoverClass() {
        this.board.classList.remove('x', 'o');
        if (this.gameActive) {
            this.board.classList.add(this.currentPlayer);
        }
    }

    checkWin(player) {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.cells[index].classList.contains(player);
            });
        });
    }

    isDraw() {
        return [...this.cells].every(cell => {
            return cell.classList.contains('x') || cell.classList.contains('o');
        });
    }

    endGame(message) {
        this.status.textContent = message;
        this.gameActive = false;
        this.board.classList.remove('x', 'o');
    }

    restartGame() {
        this.cells.forEach(cell => {
            cell.classList.remove('x', 'o');
            cell.textContent = '';
        });
        this.currentPlayer = 'x';
        this.gameActive = true;
        this.status.textContent = `Player X's turn`;
        this.updateBoardHoverClass();
    }

    setGameMode(isComputer) {
        this.isComputerMode = isComputer;
        this.pvpMode.classList.toggle('active', !isComputer);
        this.pvcMode.classList.toggle('active', isComputer);
        this.restartGame();
    }
}

// Initialize the game
new TicTacToe();