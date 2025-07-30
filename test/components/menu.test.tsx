import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Menu from "@/components/menu";

describe("Menu Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Menu />);
    expect(getByText("Menu Component")).toBeInTheDocument();
  });
});
