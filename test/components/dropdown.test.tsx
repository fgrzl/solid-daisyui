import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Dropdown from "@/components/dropdown";

describe("Dropdown Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Dropdown />);
    expect(getByText("Dropdown Component")).toBeInTheDocument();
  });
});
