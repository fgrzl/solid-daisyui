import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Validator from "@/components/validator";

describe("Validator Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Validator />);
    expect(getByText("Validator Component")).toBeInTheDocument();
  });
});
