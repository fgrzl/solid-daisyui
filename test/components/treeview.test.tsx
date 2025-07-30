import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Treeview from "@/components/treeview";

describe("Treeview Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Treeview />);
    expect(getByText("Treeview Component")).toBeInTheDocument();
  });
});
