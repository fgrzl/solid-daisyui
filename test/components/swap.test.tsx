import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Swap from "@/components/swap";

describe("Swap Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Swap />);
    expect(getByText("Swap Component")).toBeInTheDocument();
  });
});
