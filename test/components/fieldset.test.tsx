import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Fieldset from "@/components/fieldset";

describe("Fieldset Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Fieldset />);
    expect(getByText("Fieldset Component")).toBeInTheDocument();
  });
});
