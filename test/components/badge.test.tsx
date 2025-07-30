import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Badge from "@/components/badge";

describe("Badge Component", () => {
  it("renders correctly", () => {
    render(() => <Badge />);
    expect(screen.getByText("Badge Component")).toBeInTheDocument();
  });
});
