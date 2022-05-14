import React from "react";
import { Square, Board, Game } from "@/components/GameFinished.tsx";
import { describe, it, expect } from "vitest";
import renderer, { act, create } from "react-test-renderer";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

describe("Square", () => {
  let component;
  const testValue = (value) => {
    act(() => {
      if (component) {
        // update component
        component.update(<Square value={value} onClick={() => null} />);
      } else {
        // initialize component
        component = create(<Square value={value} onClick={() => null} />);
      }
    });
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  };
  it("Renders a button with a label dependent on props.value", () => {
    testValue("X");
    testValue("O");
    testValue(null);
  });
});

describe("Board", () => {
  it("Renders board", () => {
    const squares = Array(9).fill(null);
    const component = create(<Board squares={squares} onClick={() => null} />);
    // console.log(component.root.findByType(Square))
    // console.log(component.root.findAllByType(Square)) // all Square children
    // console.log(component.root.props);
    // console.log(component.root.children);
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});

describe("Game", () => {
  let component
  act(() => {
    component = create(<Game />);
  })
  let tree = toJson(component);
  let squares = component.root.findAllByType(Square)
  console.log(squares[0]._fiber.child)

  it("Renders game", () => {
    expect(tree).toMatchSnapshot();
  });
  it("Clicking on square fills it with X", () => {

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
