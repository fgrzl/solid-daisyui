import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Pagination from "@/components/pagination";

describe("Pagination Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => (
      <Pagination>Test Pagination</Pagination>
    ));
    expect(getByText("Test Pagination")).toBeInTheDocument();
  });
});
