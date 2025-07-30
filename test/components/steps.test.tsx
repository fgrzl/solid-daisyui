import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Steps from "@/components/steps";

describe("Steps Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Steps />);
    expect(getByText("Steps Component")).toBeInTheDocument();
  });
});
