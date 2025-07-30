import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Textarea from "@/components/textarea";

describe("Textarea Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Textarea />);
    expect(getByText("Textarea Component")).toBeInTheDocument();
  });
});
