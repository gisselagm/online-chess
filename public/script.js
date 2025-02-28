const socket = io();
let playerColor = null;
let board = [];
let selectedPiece = null;

// Assign player color when connected
socket.on("assignColor", (color) => {
    playerColor = color;
    document.getElementById("playerInfo").innerText = `You are playing as ${color}`;
});

// Update board when receiving changes
socket.on("updateBoard", (gameState) => {
    board = gameState.board;
    renderBoard();
});

// Function to render the board dynamically
function renderBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "light" : "dark");
            square.dataset.row = row;
            square.dataset.col = col;

            const piece = board[row][col];
            if (piece) {
                const img = document.createElement("img");
                img.src = getPieceImage(piece);
                img.classList.add("piece");
                square.appendChild(img);
            }

            square.addEventListener("click", () => handleMove(row, col));
            boardDiv.appendChild(square);
        }
    }
}

// Get piece image path based on board notation
function getPieceImage(piece) {
    const pieceMap = {
        "P": "white_pawn.png",
        "R": "white_rook.png",
        "N": "white_knight.png",
        "B": "white_bishop.png",
        "Q": "white_queen.png",
        "K": "white_king.png",
        "p": "black_pawn.png",
        "r": "black_rook.png",
        "n": "black_knight.png",
        "b": "black_bishop.png",
        "q": "black_queen.png",
        "k": "black_king.png"
    };
    return `/pieces/${pieceMap[piece]}`;
}

// Handle piece movement
function handleMove(row, col) {
    if (!playerColor) return;

    const piece = board[row][col];

    if (selectedPiece) {
        // Send move to the server
        socket.emit("move", {
            from: selectedPiece,
            to: { row, col },
            board: applyMove(board, selectedPiece, { row, col })
        });
        selectedPiece = null;
    } else if (piece && isPlayerPiece(piece)) {
        selectedPiece = { row, col };
    }
}

// Apply a move on the local board (only visual)
function applyMove(board, from, to) {
    const newBoard = board.map(row => row.slice()); // Clone board
    newBoard[to.row][to.col] = newBoard[from.row][from.col];
    newBoard[from.row][from.col] = "";
    return newBoard;
}

// Check if the piece belongs to the player
function isPlayerPiece(piece) {
    return (playerColor === "white" && piece === piece.toUpperCase()) ||
           (playerColor === "black" && piece === piece.toLowerCase());
}

// Initial rendering
renderBoard();
