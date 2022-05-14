// react testing library playground
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
  prettyDOM,
  logRoles,
  within
} from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import Link from "@/components/Link";

afterEach(() => {
  cleanup();
});

describe("Link", () => {
  it("Is rendered", async () => {
    const component = render(<Link page="http://antfu.me">Anthony Fu</Link>);
    expect(component).toBeDefined();
    expect(component).toMatchSnapshot();
    expect(component.getByText("Anthony Fu")).toBeInTheDocument();
    expect(screen.getByText("Anthony Fu")).toBeInTheDocument();
    expect(component.container.firstChild).toMatchInlineSnapshot(`
    <a
      class="normal"
      href="http://antfu.me"
    >
      Anthony Fu
    </a>
  `);
    // fireEvent.click(screen.getByText("Anthony Fu")) // navigation is not implemented
    const items = await screen.findAllByText(/\w/);
    expect(items).toHaveLength(1);
    // mouseover event
    fireEvent.mouseEnter(screen.getByRole("link"));
    expect(component).toMatchSnapshot();
    fireEvent.mouseLeave(screen.getByRole("link"));
    expect(component).toMatchSnapshot();

    component.rerender(
      <Link page="https://luis-martinez.net">Luis Martinez</Link>
    );
    expect(component.getByText("Luis Martinez")).toBeInTheDocument()

    console.log(prettyDOM(component.baseElement));

    logRoles(component.baseElement)

    const link = within(component.container).getByRole('link')
    console.log(prettyDOM(link));

    component.unmount();
  });
});
