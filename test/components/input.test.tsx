import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Input from "@/components/input";

describe("Input Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Input />);
    expect(getByText("Input Component")).toBeInTheDocument();
  });
});
