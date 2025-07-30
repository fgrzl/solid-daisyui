import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import FileInput from "@/components/file-input";

describe("File Input Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <FileInput />);
    expect(getByText("File Input Component")).toBeInTheDocument();
  });
});
