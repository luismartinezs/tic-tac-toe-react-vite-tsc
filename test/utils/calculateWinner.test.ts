import calculateWinner from "@/utils/calculateWinner";
import { it, expect, describe } from "vitest";

describe("calculateWinner", () => {
  it("Returns null if all squares are null", () => {
    const squares = Array(9).fill(null);

    expect(calculateWinner(squares)).toBe(null);
  });

  it("Return X if X won", () => {
    const squares = Array(9).fill("X");

    expect(calculateWinner(squares)).toBe("X");
  });

  it("Return O if O won", () => {
    const squares = Array(9).fill("O");

    expect(calculateWinner(squares)).toBe("O");
  });
});
