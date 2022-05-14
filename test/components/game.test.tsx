import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import { Game } from "@/components/GameFinished.tsx";

afterEach(() => {
  cleanup();
});

describe("Game", () => {
  let game;

  game = render(<Game />);

  it("Renders game", () => {
    expect(game).toMatchSnapshot();
  });
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
