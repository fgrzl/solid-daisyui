import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Kbd from "@/components/kbd";

describe("Kbd Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Kbd />);
    expect(getByText("Kbd Component")).toBeInTheDocument();
  });
});
