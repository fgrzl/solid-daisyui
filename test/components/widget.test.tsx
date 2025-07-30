import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Widget from "@/components/widget";

describe("Widget Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Widget />);
    expect(getByText("Widget Component")).toBeInTheDocument();
  });
});
