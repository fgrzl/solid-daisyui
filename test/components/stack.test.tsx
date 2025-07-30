import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Stack from "@/components/stack";

describe("Stack Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Stack />);
    expect(getByText("Stack Component")).toBeInTheDocument();
  });
});
