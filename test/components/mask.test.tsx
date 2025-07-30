import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Mask from "@/components/mask";

describe("Mask Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Mask />);
    expect(getByText("Mask Component")).toBeInTheDocument();
  });
});
