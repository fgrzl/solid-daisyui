import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Toggle from "@/components/toggle";

describe("Toggle Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Toggle />);
    expect(getByText("Toggle Component")).toBeInTheDocument();
  });
});
