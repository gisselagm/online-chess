# Online Chess Game with Node.js & Socket.io

This is a **real-time online chess game** built using **Node.js**, **Express**, and **Socket.io**.  
Players can connect to the server, get assigned a color (white or black), and play chess against each other.

## Features
**Real-time gameplay** using WebSockets  
**Pure HTML, CSS, and JavaScript frontend** (no frameworks)  
**Uses images instead of text** for chess pieces  
**Deployed easily with Docker** (no database required)  

## Required Packages
- express  
- socket.io  

## How to play

1. Open the game in your browser
2. The first player to connect gets the White pieces, the second gets Black.
3. Click on a piece of your color to select it.
4. Click on a valid square to move the selected piece.
5. The move is sent to the server, which updates the board for both players in real-time.
6. The turn automatically switches after each move.
7. The game continues until checkmate (currently, move validation is basic).

## Rules & Game Mechanics
- Turn-based system: Only the player whose turn it is can move.
- Piece movement: The pieces move as per chess rules (but currently without full validation).
- Win condition: The game does not yet detect checkmate, so players must follow the rules manually.
