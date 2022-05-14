import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import { Square } from "@/components/GameFinished.tsx";

afterEach(() => {
  cleanup();
});

describe("Square", () => {
  it("Renders a button with a label dependent on props.value", () => {
    const square = render(<Square value="X" onClick={() => null} />);
    expect(square).toMatchSnapshot();

    let button = within(screen.getByRole("button"));
    expect(button).toBeDefined();
    expect(button.getByText("X")).toBeDefined();

    square.rerender(<Square value="O" onClick={() => null} />);

    button = within(screen.getByRole("button"));
    expect(button).toBeDefined();
    expect(button.getByText("O")).toBeDefined();

    square.rerender(<Square value={null} onClick={() => null} />);
    button = within(screen.getByRole("button"));
    expect(button).toBeDefined();
    expect(button.getByText("")).toBeDefined();
  });
});
