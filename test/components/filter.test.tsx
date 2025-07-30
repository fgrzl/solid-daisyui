import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Filter from "@/components/filter";

describe("Filter Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Filter />);
    expect(getByText("Filter Component")).toBeInTheDocument();
  });
});
