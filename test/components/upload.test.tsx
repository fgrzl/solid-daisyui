import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Upload from "@/components/upload";

describe("Upload Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Upload />);
    expect(getByText("Upload Component")).toBeInTheDocument();
  });
});
