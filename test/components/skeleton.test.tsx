import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Skeleton from "@/components/skeleton";

describe("Skeleton Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Skeleton />);
    expect(getByText("Skeleton Component")).toBeInTheDocument();
  });
});
