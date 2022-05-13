import React from "react";
import { Square, Board, Game } from "@/components/GameFinished.tsx";
import { describe, it, expect } from "vitest";
import renderer from "react-test-renderer";

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON();
  expect(result).toBeDefined();
  expect(result).not.toBeInstanceOf(Array);
  return result as renderer.ReactTestRendererJSON;
}

describe("Square", () => {
  it("Renders a button", () => {
    const component = renderer.create(
      <Square value='X' onClick={() => null} />
    );
    let tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});

describe('Board', () => {
  it.todo('test')
})

describe('Game', () => {
  it.todo('test')
})