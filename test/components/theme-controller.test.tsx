import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import ThemeController from "@/components/theme-controller";

describe("Theme Controller Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => (
      <ThemeController>Test Theme Controller</ThemeController>
    ));
    expect(getByText("Test Theme Controller")).toBeInTheDocument();
  });
});
