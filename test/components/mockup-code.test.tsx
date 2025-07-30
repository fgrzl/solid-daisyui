import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import MockupCode from "@/components/mockup-code";

describe("Mockup Code Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => (
      <MockupCode>Test Mockup Code</MockupCode>
    ));
    expect(getByText("Test Mockup Code")).toBeInTheDocument();
  });
});
