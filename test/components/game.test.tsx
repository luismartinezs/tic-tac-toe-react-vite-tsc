import React from "react";
import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Square, Board, Game } from "@/components/GameFinished.tsx";

describe('Square', () => {
  it("Renders a button with a label dependent on props.value", () => {
    const square = render(<Square value="X" onClick={() => null} />)

    let button = within(screen.getByRole('button'))
    expect(button).toBeDefined()
    expect(button.getByText("X")).toBeDefined()

    square.rerender(<Square value="O" onClick={() => null} />)

    button = within(screen.getByRole('button'))
    expect(button).toBeDefined()
    expect(button.getByText("O")).toBeDefined()

    square.rerender(<Square value={null} onClick={() => null} />)
    button = within(screen.getByRole('button'))
    expect(button).toBeDefined()
    expect(button.getByText("")).toBeDefined()
  })
})

describe("Board", () => {
  it.todo("Renders board");
});

describe("Game", () => {
  it.todo("Renders game");
  it.todo("Clicking on square fills it with X");
  it.todo("Clicking on square switches status to 'Next player: O'");
  it.todo("Clicking on square adds new item to moves list");
  it.todo("Clicking on first item of moves list resets Board state");
  it.todo(
    "Clicking on last item of moves list returns Board state to that move"
  );
  it.todo("Clicking on any one moves list item, resets Board to that move");
  it.todo("When X wins, show 'Winner: X' message");
  it.todo("After a player wins, clicking on a square does nothing");
  it.todo("Clicking on Show finish / start button toggles the game");
});
