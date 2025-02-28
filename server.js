const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let players = {};
let gameState = {
    board: [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ],
    turn: "white"
};

// Handle socket connections
io.on('connection', (socket) => {
    console.log(`Player connected: ${socket.id}`);

    if (Object.keys(players).length < 2) {
        let color = Object.keys(players).length === 0 ? "white" : "black";
        players[socket.id] = color;
        socket.emit("assignColor", color);
    } else {
        socket.emit("roomFull");
    }

    socket.emit("updateBoard", gameState);

    socket.on("move", (data) => {
        if (players[socket.id] === gameState.turn) {
            gameState.board = data.board;
            gameState.turn = gameState.turn === "white" ? "black" : "white";
            io.emit("updateBoard", gameState);
        }
    });

    socket.on("disconnect", () => {
        console.log(`Player disconnected: ${socket.id}`);
        delete players[socket.id];
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
