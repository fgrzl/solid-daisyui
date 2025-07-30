import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Drawer from "@/components/drawer";

describe("Drawer Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Drawer />);
    expect(getByText("Drawer Component")).toBeInTheDocument();
  });
});
