import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Range from "@/components/range";

describe("Range Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Range />);
    expect(getByText("Range Component")).toBeInTheDocument();
  });
});
