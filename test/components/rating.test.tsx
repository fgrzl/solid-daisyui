import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Rating from "@/components/rating";

describe("Rating Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Rating />);
    expect(getByText("Rating Component")).toBeInTheDocument();
  });
});
