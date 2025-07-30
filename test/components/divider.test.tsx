import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Divider from "@/components/divider";

describe("Divider Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Divider />);
    expect(getByText("Divider Component")).toBeInTheDocument();
  });
});
