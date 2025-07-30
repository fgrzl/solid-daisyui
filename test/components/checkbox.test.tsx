import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Checkbox from "@/components/checkbox";

describe("Checkbox Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Checkbox />);
    expect(getByText("Checkbox Component")).toBeInTheDocument();
  });
});
