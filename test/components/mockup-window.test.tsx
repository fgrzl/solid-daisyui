import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import MockupWindow from "@/components/mockup-window";

describe("Mockup Window Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => (
      <MockupWindow>Test Mockup Window</MockupWindow>
    ));
    expect(getByText("Test Mockup Window")).toBeInTheDocument();
  });
});
