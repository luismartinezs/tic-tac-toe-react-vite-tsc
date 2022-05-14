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

  function getSquares() {
    if (!game) {
      return null;
    }
    const board = game.getByTestId("board");
    return board.querySelectorAll("button");
  }

  // sequence is a sequence of clicks on the board, where each element is a square index, e.g. [0,2,5], indices out of bounds are ignored
  function playMoves(sequence = []) {
    if (!game) {
      return null;
    }
    const squares = getSquares();
    sequence.forEach((i) => {
      if (i < 0 || i > squares.length - 1) {
        console.warn(`Warning: Square ${i} is out of bounds`)
        return;
      }
      fireEvent.click(squares[i]);
    });
    return squares;
  }

  function expectBoardState(expected = []) {
    expected.forEach((exp, i) => {
      expect(getSquares()[i].textContent).toBe(exp);
    });
  }

  // boardString is a string describing the board e.g. "XOX", missing spaces will be autofilled with empty
  function makeBoardState(boardString = "") {
    return `${boardString}         `
      .split("")
      .slice(0, 9)
      .map((el) => el.trim());
  }

  function clickOnMove(i) {
    if (!game) {
      return null;
    }
    const moves = game.getByTestId("moves");
    const buttons = moves.querySelectorAll("button");
    fireEvent.click(buttons[i]);
  }

  function expectStatus(expected = "") {
    const status = game.getByTestId("status");
    expect(status.textContent).toBe(expected);
  }

  it("Renders game", () => {
    game = render(<Game />);
    expect(game).toBeDefined();
    // expect(game).toMatchSnapshot(); // maybe I shouldn't use snapshot testing
  });

  it("Renders a board", () => {
    game = render(<Game />);
    const board = game.getByTestId("board");
    expect(board).toBeDefined();
  });

  it("Clicking on square fills it with X", () => {
    game = render(<Game />);
    playMoves([0]);
    expectBoardState(makeBoardState("X"));
  });
  it("Clicking on square switches status to 'Next player: O'", () => {
    game = render(<Game />);
    playMoves([0]);
    expectStatus("Next player: O");
  });
  it("Clicking on square adds new item to moves list", () => {
    game = render(<Game />);
    const moves = game.getByTestId("moves");
    expect(moves.querySelectorAll("li")).toHaveLength(1);
    playMoves([0]);
    expect(moves.querySelectorAll("li")).toHaveLength(2);
    playMoves([1]);
    expect(moves.querySelectorAll("li")).toHaveLength(3);
    playMoves([1]);
    expect(moves.querySelectorAll("li")).toHaveLength(3);
  });
  it("Clicking on first item of moves list resets Board state", () => {
    game = render(<Game />);
    playMoves([0, 1, 2]);
    expectBoardState(makeBoardState("XOX"));
    clickOnMove(2);
    expectBoardState(makeBoardState("XO"));
    clickOnMove(1);
    expectBoardState(makeBoardState("X"));
    clickOnMove(0);
    expectBoardState(makeBoardState(""));
    clickOnMove(3);
    expectBoardState(makeBoardState("XOX"));
  });
  it("When X wins, show 'Winner: X' message", () => {
    game = render(<Game />);
    playMoves([0, 4, 1, 5, 2]);
    expectStatus("Winner: X");
  });
  it("When O wins, show 'Winner: O' message", () => {
    game = render(<Game />);
    playMoves([8, 0, 4, 1, 5, 2]);
    expectStatus("Winner: O");
  });
  it.todo("After a player wins, clicking on a square does nothing");
});
