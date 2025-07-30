import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Wizard from "@/components/wizard";

describe("Wizard Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Wizard />);
    expect(getByText("Wizard Component")).toBeInTheDocument();
  });
});
