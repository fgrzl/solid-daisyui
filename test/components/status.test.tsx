import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Status from "@/components/status";

describe("Status Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Status />);
    expect(getByText("Status Component")).toBeInTheDocument();
  });
});
