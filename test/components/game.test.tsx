import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import {
  render,
  screen,
  within,
  cleanup,
  fireEvent,
  logRoles,
} from "@testing-library/react";
import { Game } from "@/components/GameFinished.tsx";

afterEach(() => {
  cleanup();
});

describe("Game", () => {
  let game;

  // sequence is a sequence of clicks on the board, where each element is a square index, e.g. [0,2,5], indices out of bounds are ignored
  function playMoves(sequence = []) {
    if (!game) {
      return null;
    }
    const board = game.getByTestId("board");
    const squares = board.querySelectorAll("button");
    sequence.forEach((i) => {
      if (i < 0 || i > squares.length - 1) {
        return;
      }
      fireEvent.click(squares[i]);
    });
    return squares;
  }

  function expectBoardState(expected = [], squares = Array(9).fill(null)) {
    expected.forEach((exp, i) => {
      expect(squares[i].textContent).toBe(exp);
    });
  }

  // boardString is a string describing the board e.g. "XOX", missing spaces will be autofilled with empty
  function makeBoardState(boardString = "") {
    return `${boardString}         `
      .split("")
      .slice(0, 9)
      .map((el) => el.trim());
  }

  it("Renders game", () => {
    game = render(<Game />);
    expect(game).toBeDefined();
    expect(game).toMatchSnapshot(); // maybe I shouldn't use snapshot testing
  });

  it("Renders a board", () => {
    game = render(<Game />);
    const board = game.getByTestId("board");
    expect(board).toBeDefined();
  });

  it("Clicking on square fills it with X", () => {
    game = render(<Game />);
    const squares = playMoves([0]);
    expect(squares[0].textContent).toBe("X");
    expectBoardState(makeBoardState("X"), squares);
  });
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
