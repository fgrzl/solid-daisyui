import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Stat from "@/components/stat";

describe("Stat Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Stat />);
    expect(getByText("Stat Component")).toBeInTheDocument();
  });
});
