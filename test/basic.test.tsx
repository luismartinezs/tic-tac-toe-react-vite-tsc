import { expect, describe, it, vi, beforeEach } from "vitest";

describe("suite", () => {
  it("Sanity check", () => {
    expect(true).toBe(true);
  });
  // concurrent tests
  it.concurrent("Double check", () => {
    expect(true).toBe(true);
  });
  it("Mock fn", () => {
    // mocking
    const fn = vi.fn();

    fn("hello", 1);

    expect(vi.isMockFunction(fn)).toBe(true);
    expect(fn.mock.calls[0]).toEqual(["hello", 1]);

    fn.mockImplementation((arg) => arg);
    fn("world", 2);

    expect(fn.mock.results[1].value).toBe("world");
  });
});


// vi.spyOn() = spy on function (has it been called?)
// vi.fn() = mock function implementation
// vi.stubGlobal = mock global variables
// Mock API requests https://mswjs.io/

// Extend test context

declare module 'vitest' {
  export interface TestContext {
    foo?: string
  }
}

beforeEach(async (context) => {
  // extend context
  context.foo = 'bar'
})

it('should work', ({ foo }) => {
  console.log(foo) // 'bar'
})