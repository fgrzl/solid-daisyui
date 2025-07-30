import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Dock from "@/components/dock";

describe("Dock Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Dock />);
    expect(getByText("Dock Component")).toBeInTheDocument();
  });
});
