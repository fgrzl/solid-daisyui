import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Timeline from "@/components/timeline";

describe("Timeline Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Timeline />);
    expect(getByText("Timeline Component")).toBeInTheDocument();
  });
});
