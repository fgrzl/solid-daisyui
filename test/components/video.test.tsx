import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Video from "@/components/video";

describe("Video Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(() => <Video />);
    expect(getByText("Video Component")).toBeInTheDocument();
  });
});
