import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Carousel from "@/components/carousel";

describe("Carousel Component", () => {
  it("renders correctly", () => {
    const { container } = render(() => (
      <Carousel items={["Slide 1", "Slide 2"]} />
    ));
    expect(container.firstChild).toBeInTheDocument();
  });
});
