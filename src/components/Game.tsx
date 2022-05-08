import { useState } from "react";
import produce from "immer";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
};

const Board = (props) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    setSquares(
      produce((draft) => {
        draft[i] = isXNext ? "X" : "O";
      })
    );
    setIsXNext(!isXNext);
  };

  const renderSquare = (i) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
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
  const [history, setHistory] = useState({
    squares: Array(9).fill(null),
    isXNext: true
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}