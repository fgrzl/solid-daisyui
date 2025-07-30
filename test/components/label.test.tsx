import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Label from "@/components/label";

describe("Label Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Label />);
    expect(getByText("Label Component")).toBeInTheDocument();
  });
});
