import React, { useState } from "react";
import calculateWinner from "@/utils/calculateWinner";
import type { TSquare } from "@/types";

interface SquareProps {
  value: TSquare;
  onClick: () => void;
};

interface BoardProps {
  squares: TSquare[];
  onClick: (i: number) => void;
};

const Square: React.FC<SquareProps> = ({ value, onClick }): JSX.Element => {
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
};

const Board: React.FC<BoardProps> = ({ squares, onClick }): JSX.Element => {
  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => onClick(i)} />
  );

  return (
    <div data-testid="board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null) as TSquare[],
    },
  ]);

  const [isXNext, setIsXNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const current = history[stepNumber] as { squares: TSquare[] };

  const handleClick = (i: number) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history.at(-1) as { squares: TSquare[] };
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = isXNext ? "X" : "O";

    const newHistory = _history.concat({ squares });
    setHistory(newHistory);
    setStepNumber(newHistory.length - 1);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? "X" : "O"}`;
  }

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setIsXNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : "Go to game start";
    return (
      <li key={move}>
        <button
          className={move === stepNumber ? "select-move active" : "select-move"}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div data-testid="status" className="status">
          {status}
        </div>
        <ol data-testid="moves">{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
export { Square, Board, Game };
