import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Join from "@/components/join";

describe("Join Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Join />);
    expect(getByText("Join Component")).toBeInTheDocument();
  });
});
