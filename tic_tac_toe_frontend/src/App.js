import React, { useState } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main application component for the Tic Tac Toe game.
 * Features:
 *   - 3x3 grid board
 *   - Current player display
 *   - Win/draw detection
 *   - Reset game button
 *   - Light, minimalistic, modern UI with specified colors
 */
function App() {
  // Game board: null = empty, 'X' or 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' starts first
  const [currentPlayer, setCurrentPlayer] = useState("X");
  // Game status: 'ongoing', 'win', 'draw'
  const [status, setStatus] = useState("ongoing");
  // Winner: 'X', 'O' or null
  const [winner, setWinner] = useState(null);

  // PUBLIC_INTERFACE
  // Handle a cell click (index = 0-8)
  function handleCellClick(index) {
    if (board[index] !== null || status !== "ongoing") return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const win = calculateWinner(updatedBoard);
    if (win) {
      setStatus("win");
      setWinner(win);
    } else if (updatedBoard.every((cell) => cell !== null)) {
      setStatus("draw");
      setWinner(null);
    } else {
      setCurrentPlayer((p) => (p === "X" ? "O" : "X"));
    }
  }

  // PUBLIC_INTERFACE
  // Reset the game to initial state
  function handleReset() {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setStatus("ongoing");
    setWinner(null);
  }

  // PUBLIC_INTERFACE
  // Calculate winner given current board state
  function calculateWinner(bd) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (const [a, b, c] of lines) {
      if (
        bd[a] &&
        bd[a] === bd[b] &&
        bd[a] === bd[c]
      ) {
        return bd[a];
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  // Render a single cell (square)
  function renderCell(idx) {
    let cellHighlight = "";
    // After win: highlight winning line
    if (status === "win") {
      const winIdxs = getWinningCells(board);
      if (winIdxs && winIdxs.includes(idx)) {
        cellHighlight = "cell-highlight";
      }
    }
    return (
      <button
        className={`ttt-cell ${cellHighlight}`}
        key={idx}
        onClick={() => handleCellClick(idx)}
        aria-label={`Cell ${idx + 1}`}
        disabled={board[idx] !== null || status !== "ongoing"}
      >
        {board[idx]}
      </button>
    );
  }

  // Find winning cells for highlighting
  function getWinningCells(bd) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (const triple of lines) {
      const [a, b, c] = triple;
      if (
        bd[a] &&
        bd[a] === bd[b] &&
        bd[a] === bd[c]
      ) {
        return triple;
      }
    }
    return null;
  }

  // Status display logic
  let statusText = "";
  if (status === "win" && winner) {
    statusText = `Winner: Player ${winner}`;
  } else if (status === "draw") {
    statusText = "It's a draw!";
  } else {
    statusText = (
      <span>
        <span style={{ color: "var(--ttt-accent)" }}>
          Player {currentPlayer}
        </span>
        &nbsp;turn
      </span>
    );
  }

  return (
    <div className="ttt-outer-container">
      <div className="ttt-header">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-status">{statusText}</div>
      </div>
      <div className="ttt-board-container">
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
          {Array(3)
            .fill(0)
            .map((_, row) => (
              <div className="ttt-row" key={row} role="row">
                {Array(3)
                  .fill(0)
                  .map((_, col) =>
                    renderCell(row * 3 + col)
                  )}
              </div>
            ))}
        </div>
      </div>
      <div className="ttt-controls">
        <button className="ttt-reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      <footer className="ttt-footer">
        <span className="ttt-footer-text">
          Minimal Tic Tac Toe &middot; React
        </span>
      </footer>
    </div>
  );
}

export default App;

