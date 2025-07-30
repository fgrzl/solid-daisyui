import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Card from "@/components/card";

describe("Card Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => (
      <Card title="Test Title" content="Test Content" />
    ));
    expect(getByText("Test Title - Test Content")).toBeInTheDocument();
  });
});
