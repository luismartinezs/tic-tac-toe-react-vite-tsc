import React from "react";
import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { Square, Board, Game } from "@/components/GameFinished.tsx";

describe('Square', () => {
  it("Renders a button with a label dependent on props.value", () => {
    render(<Square value="X" onClick={() => null} />)
    const button = within(screen.getByRole('button'))
    expect(button).toBeDefined()
  })
})
