import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import List from "@/components/list";

describe("List Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <List />);
    expect(getByText("List Component")).toBeInTheDocument();
  });
});
