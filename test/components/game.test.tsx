import React from "react";
import { Square, Board, Game } from "@/components/GameFinished.tsx";
import { describe, it, expect } from "vitest";
import renderer from "react-test-renderer";
import { toUnicode } from "punycode";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

describe("Square", () => {
  it("Renders a button", () => {
    const component = renderer.create(
      <Square value="X" onClick={() => null} />
    );
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});

describe("Board", () => {
  it("Renders board", () => {
    const squares = Array(9).fill(null);
    const component = renderer.create(
      <Board squares={squares} onClick={() => null} />
    );
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});

describe("Game", () => {
  it("Renders game", () => {
    const component = renderer.create(<Game />);
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
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
});
