// Remove the TODO comments as you go

import {useState} from 'react'
// TODO 1 import useState from react

// TODO 13 Receive value and onClick as props
const Square = ({value, onClick}) => {
  // TODO 2 Initialize value state as null. Help: https://reactjs.org/docs/hooks-state.html
  // TODO 14 Remove value state (lift state up)

  // TODO 15 on click, run onClick from props
  // TODO 3 On click, set value to 'X'
  return <button className="square" onClick={() => onClick()}>{/* TODO 4 Show here the value */ value}</button>;
};

const Board = () => {
  // TODO 5 Add a squares state, initialized with an array of length 9 filled with null values
  const [squares, setSquares] = useState(Array(9).fill(null))

  // TODO 7 Create a function handleClick that takes i (index) as input
  const handleClick = (i) => {
    // TODO 8 Inside handleClick, create a copy of squares
    const _squares = [...squares]
    // TODO 9 Then, replace i-th value by 'X'
    // CHALLENGE: Optionally to 8, 9 and 10, you can use immer: https://immerjs.github.io/immer/example-setstate
    _squares[i] = 'X'
    // TODO 10 Lastly, set the new value of squares
    setSquares(_squares)
  }

  // TODO 6 Pass as value prop the i-th value of squares
  // TODO 11 Pass as onClick prop a function that runs the handleClick method
  const renderSquare = (i) => <Square value={squares[i]} onClick={() => handleClick(i)} />;

  const status = "Next player: X";

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
  const moves = (
    <li>
      <button className="select-move active">Go to game start</button>
    </li>
  );

  return (
    <div className="game">
      <div className="game-board">
        <Board  />
      </div>
      <div className="game-info">
        <div className="status">{/* status */}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
