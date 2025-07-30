import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Collapse from "@/components/collapse";

describe("Collapse Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Collapse />);
    expect(getByText("Collapse Component")).toBeInTheDocument();
  });
});
