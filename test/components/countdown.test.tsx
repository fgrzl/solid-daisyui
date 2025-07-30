import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Countdown from "@/components/countdown";

describe("Countdown Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Countdown />);
    expect(getByText("Countdown Component")).toBeInTheDocument();
  });
});
