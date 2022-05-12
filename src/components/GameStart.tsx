const Square = () => {
  return <button className="square">{/* TODO */}</button>;
};

const Board = () => {
  const renderSquare = (i) => <Square />;

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
