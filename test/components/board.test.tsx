import React from "react";
import { describe, expect, it, vi, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/react";
import { Board } from "@/components/GameFinished.tsx";

afterEach(() => {
  cleanup();
});

describe("Board", () => {
  it("Renders board", () => {
    const onClick = vi.fn((i) => null);
    const squares = Array(9).fill(null);
    const board = render(<Board squares={squares} onClick={onClick} />);
    expect(board).toMatchSnapshot();
  });
});
