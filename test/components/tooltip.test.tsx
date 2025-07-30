import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Tooltip from "@/components/tooltip";

describe("Tooltip Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Tooltip />);
    expect(getByText("Tooltip Component")).toBeInTheDocument();
  });
});
