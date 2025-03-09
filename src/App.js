import React, { useEffect, useState } from "react";
import SquareComponent from "./SquareComponent";

const initialState = ["", "", "", "", "", "", "", "", ""];

function App() {
  const [gameState, updateGameState] = useState(initialState);
  const [isXChance, updateIsXChance] = useState(true); // Start with X (isXChance true means X starts)
  const [winner, setWinner] = useState(null); // To store the winner if any
  const [gameOver, setGameOver] = useState(false); // To track if the game is over

  const onSquareClicked = (index) => {
    let strings = Array.from(gameState);
    // To prevent clicking on an already filled square
    if (strings[index] === "" && !gameOver) {
      strings[index] = isXChance ? "X" : "O"; // Set X or O based on the current turn
      updateGameState(strings);
      updateIsXChance(!isXChance); // Toggle turn after placing the move
    }
  };

  // Winner detection logic
  useEffect(() => {
    const currentWinner = calculateWinner();
    if (currentWinner) {
      setWinner(currentWinner); // Set winner state if there's a winner
      setGameOver(true); // Set game over if there's a winner
    }
  }, [gameState]); // Runs when gameState changes

  // Draw detection logic after gameState changes
  useEffect(() => {
    // Check for draw only if all cells are filled and there's no winner
    if (!gameOver && !gameState.includes("")) {
      setGameOver(true); // Mark the game as over if it's a draw
    }
  }, [gameState, gameOver]);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    updateGameState(initialState); // Reset the game state
    setWinner(null); // Reset winner
    setGameOver(false); // Game is not over anymore
    updateIsXChance(true); // Reset to X always after a reset
  };

  return (
    <div className="app-header">
      <p className="heading-text">TIC TAC TOE</p>

      {/* Show Next Player or Winner */}
      {!gameOver && (
        <p className="next-player">NEXT PLAYER: {isXChance ? "X" : "O"}</p>
      )}
      {gameOver && (
        <p className="winner">{winner ? `WINNER: ${winner}` : "MATCH DRAW"}</p>
      )}

      <div className="row jc-center">
        <SquareComponent
          className="b-bottom-right"
          state={gameState[0]}
          onClick={() => onSquareClicked(0)}
        />
        <SquareComponent
          className="b-bottom-right"
          state={gameState[1]}
          onClick={() => onSquareClicked(1)}
        />
        <SquareComponent
          className="b-bottom"
          state={gameState[2]}
          onClick={() => onSquareClicked(2)}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          className="b-bottom-right"
          state={gameState[3]}
          onClick={() => onSquareClicked(3)}
        />
        <SquareComponent
          className="b-bottom-right"
          state={gameState[4]}
          onClick={() => onSquareClicked(4)}
        />
        <SquareComponent
          className="b-bottom"
          state={gameState[5]}
          onClick={() => onSquareClicked(5)}
        />
      </div>
      <div className="row jc-center">
        <SquareComponent
          className="b-right"
          state={gameState[6]}
          onClick={() => onSquareClicked(6)}
        />
        <SquareComponent
          className="b-right"
          state={gameState[7]}
          onClick={() => onSquareClicked(7)}
        />
        <SquareComponent
          state={gameState[8]}
          onClick={() => onSquareClicked(8)}
        />
      </div>
      <button className="rst-btn" onClick={resetGame}>
        RESTART
      </button>
    </div>
  );
}

export default App;
