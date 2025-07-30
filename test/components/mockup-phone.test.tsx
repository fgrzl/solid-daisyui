import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import MockupPhone from "@/components/mockup-phone";

describe("Mockup Phone Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => (
      <MockupPhone>Test Mockup Phone</MockupPhone>
    ));
    expect(getByText("Test Mockup Phone")).toBeInTheDocument();
  });
});
