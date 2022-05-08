# Tic tac toe

Tic tac toe with react hooks and typescript

Done mostly for practice

Based on this: https://reactjs.org/tutorial/tutorial.html

Steps

- Start with starter (static) code
- Add a value state to Square
- When clicking a Square, set its value to "X"
- Add squares state to the Board, initialize with array of length 9 with null values
- Pass as props to the Square the i-th value of squares state
- Pass to the Square as prop a method to handle click event
- Remove value state from Square, and use props instead
- On clicking a Square, click handler method replaces the value of that index with an 'X' in squares state
- Install Immer `pnpm install immer`
- Use immer in setSquares
  - https://immerjs.github.io/immer/example-setstate
- Add a xIsNext boolean state to Board
- Each time a Square is clicked, toggle xIsNext
- If xIsNext is true, fill Square with X, otherwise with O
- Next player message is X or O depending on xIsNext value
- Paste `calculateWinner` function from here: https://reactjs.org/tutorial/tutorial.html#declaring-a-winner
- Status message shows something like 'Winner: X' as soon as one team wins
- If there is a winner or the square is full, ignore click on Square (return before doing anything else)
- Add a history state to the Game, which has a squares and a xIsNext values
- renderSquare uses squares and onClick from props