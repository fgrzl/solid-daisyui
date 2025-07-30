import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Select from "@/components/select";

describe("Select Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Select />);
    expect(getByText("Select Component")).toBeInTheDocument();
  });
});
