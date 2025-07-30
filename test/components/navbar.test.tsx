import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Navbar from "@/components/navbar";

describe("Navbar Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Navbar />);
    expect(getByText("Navbar Component")).toBeInTheDocument();
  });
});
