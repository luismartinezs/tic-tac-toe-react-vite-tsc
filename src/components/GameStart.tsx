// Remove the TODO comments as you go

import { useState } from "react";
// TODO 1 import useState from react
// TODO 20 import calculateWinner from @/utils/calculateWinner.ts
import calculateWinner from "@/utils/calculateWinner";

// TODO 13 Receive value and onClick as props
const Square = ({ value, onClick }) => {
  // TODO 2 Initialize "value" state as null. Help: https://reactjs.org/docs/hooks-state.html
  // TODO 14 Remove "value" state (lift state up)

  // TODO 15 on click, run onClick from props (remove existing handler)
  // TODO 3 On click, set "value" state to 'X'
  return (
    <button className="square" onClick={() => onClick()}>
      {/* TODO 4 Show here the value */ value}
    </button>
  );
};

// TODO 38 Receive onClick as props
// TODO 30 Receive squares as props
const Board = ({ squares, onClick }) => {
  // TODO 45 Remove xIsNext state from here
  // TODO 31 Delete squares state from this component
  // TODO 5 Add a squares state, initialized with an array of length 9 filled with null values
  // TODO 16 Add a xIsNext boolean state and initialize it to true
  const [xIsNext, setXIsNext] = useState(true);

  // TODO 32 Copy handleClick function and paste it inside Game component
  // TODO 23 If there is a winner or the clicked square is full, make handleClick return before doing anything else
  // TODO 18 If xIsNext is true, fill Square with X, otherwise with O
  // TODO 17 Inside handleClick, toggle value of xIsNext
  // TODO 7 Create a function handleClick that takes i (index) as input
  // TODO 8 Inside handleClick, create a copy of squares
  // TODO 9 Then, replace i-th value by 'X'
  // CHALLENGE: Optionally to 8, 9 and 10, you can use immer: https://immerjs.github.io/immer/example-setstate
  // TODO 10 Lastly, set the new value of squares

  // TODO 39 In onClick prop, replace handleClick by onClick
  // TODO 6 Pass as value prop the i-th value of squares
  // TODO 11 Pass as onClick prop a function that runs the handleClick method
  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => onClick(i)} />
  );

  // TODO 40 Move all the logic handling status text to the Game component
  // TODO 22 As soon as one player wins, the status message becomes something like "Winner: X"
  // TODO 21 Assign the return value of calculateWinner(squares) (either 'X', 'O', or null) to a variable winner
  // TODO 19 The status message shows the next player to be 'X' or 'O' depending on xIsNext value

  return (
    <div>
      {/* TODO 42 Delete status from here */}
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
  // TODO 26 The elements of the history array will be "squares". Initialize the first element as an array of length 9 filled with null values
  // TODO 25 Initialize history to an empty array.
  // TODO 24 Add here a history state. It will record each move of the game.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // TODO 27 We're going to lift state again from Board. Add here a boolean state xIsNext and initialize it to true
  const [xIsNext, setXIsNext] = useState(true);
  // TODO 49 Add a stepNumber state, initialize it to 0
  const [stepNumber, setStepNumber] = useState(0);

  // TODO 28 Declare current variable whose value is the last element of history
  const current = history.at(-1);

  // TODO 58 In the handleClick method, after setting the new history, update stepNumber to the value of the length of newHistory
  // TODO 57 In the handleClick method, set newHistory as the new history
  // TODO 56 Create a new variable newHistory which is equal to _history with the last squares (current) that was just updated added at the end
  // TODO 55 In the handleClick method, rather than taking the last element of the history as the current step, take the last element of the new variable _history
  // TODO 54 In the handleClick method, create a new variable _history, which is a slice of history up to stepNumber + 1
  // TODO 33 After pasting here handleClick, update it:
  const handleClick = (i) => {
    // TODO 34 Inside handleClick, declare variable current whose value is the last element of history
    const _history = history.slice(0, stepNumber + 1)
    const current = _history.at(-1);
    // TODO 35 Replace squares by current in handleClick function
    if (calculateWinner(current) || current[i]) {
      return;
    }
    const _squares = [...current];
    _squares[i] = xIsNext ? "X" : "O";

    // TODO 36 Inside handleClick, update history, concatenating to it a new array element which contains the new squares array
    const newHistory = _history.concat([ _squares ])
    setHistory(newHistory);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  // TODO 43 Replace squares by current in status logic
  // TODO 41 Paste here the logic for the status message
  let status;
  const winner = calculateWinner(current);
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  // TODO 53 Then, jumpTo set the xIsNext value to true if the argument is even, or to false otherwise
  // TODO 52 First, jumpTo sets the value of stepNumber to the argument
  // TODO 51 Declare here a function jumpTo that takes an integer as argument
  const jumpTo = (move) => {
    setStepNumber(move);
    setXIsNext(move % 2 === 0);
  };

  // TODO 59 For styling, apply "active" class to the button in moves only if the stepNumber matches the history index
  // TODO 50 Add an onClick handler to each button in the "moves" list. It runs a jumpTo function and passes the current move number as parameter
  // TODO 48 The button label is "Go to game start" for first item, and "Go to move # x" for the rest, where x is a history index, starting from 1
  // TODO 47 For each item in history, the map returns a list of buttons. Add a key attribute to each list item
  // TODO 46 change moves to be a map over history
  const moves = history.map((step, move) => {
    const label = move ? `Go to move # ${move}` : "Go to game start";
    return (
      <li key={move}>
        <button className={move === stepNumber ? 'select-move active' : 'select-move'} onClick={() => jumpTo(move)}>
          {label}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* TODO 37 Pass to Board prop onClick whose value is a function that takes an index and runs handleClick, passing the index as parameter */}
        {/* TODO 29 Pass to Board prop squares with value current */}
        <Board squares={current} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        {/* TODO 44 Show status message here */}
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
