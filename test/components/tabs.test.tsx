import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Tabs from "@/components/tabs";

describe("Tabs Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Tabs />);
    expect(getByText("Tabs Component")).toBeInTheDocument();
  });
});
