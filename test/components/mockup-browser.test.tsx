import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import MockupBrowser from "@/components/mockup-browser";

describe("Mockup Browser Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => (
      <MockupBrowser>Test Mockup Browser</MockupBrowser>
    ));
    expect(getByText("Test Mockup Browser")).toBeInTheDocument();
  });
});
