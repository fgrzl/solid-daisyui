import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Progress from "@/components/progress";

describe("Progress Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Progress />);
    expect(getByText("Progress Component")).toBeInTheDocument();
  });
});
