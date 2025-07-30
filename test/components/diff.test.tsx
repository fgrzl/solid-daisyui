import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Diff from "@/components/diff";

describe("Diff Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Diff />);
    expect(getByText("Diff Component")).toBeInTheDocument();
  });
});
