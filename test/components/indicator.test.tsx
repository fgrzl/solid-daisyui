import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Indicator from "@/components/indicator";

describe("Indicator Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Indicator />);
    expect(getByText("Indicator Component")).toBeInTheDocument();
  });
});
