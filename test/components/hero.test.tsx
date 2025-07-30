import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Hero from "@/components/hero";

describe("Hero Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Hero />);
    expect(getByText("Hero Component")).toBeInTheDocument();
  });
});
