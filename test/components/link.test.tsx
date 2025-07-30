import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Link from "@/components/link";

describe("Link Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Link />);
    expect(getByText("Link Component")).toBeInTheDocument();
  });
});
