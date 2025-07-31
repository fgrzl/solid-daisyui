import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import CarouselItem from "@/components/carousel-item";

describe("CarouselItem Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with base carousel-item class", () => {
      const { container } = render(() => (
        <CarouselItem>
          <div>Test content</div>
        </CarouselItem>
      ));
      expect(container.firstChild).toHaveClass("carousel-item");
    });

    it("renders children content", () => {
      const { getByText } = render(() => (
        <CarouselItem>
          <div>Test slide content</div>
        </CarouselItem>
      ));
      expect(getByText("Test slide content")).toBeInTheDocument();
    });

    it("applies custom class prop", () => {
      const { container } = render(() => (
        <CarouselItem class="custom-item">
          <div>Content</div>
        </CarouselItem>
      ));
      expect(container.firstChild).toHaveClass("carousel-item", "custom-item");
    });

    it("applies classList prop", () => {
      const { container } = render(() => (
        <CarouselItem classList={{ active: true, disabled: false }}>
          <div>Content</div>
        </CarouselItem>
      ));
      expect(container.firstChild).toHaveClass("carousel-item", "active");
      expect(container.firstChild).not.toHaveClass("disabled");
    });

    it("applies id prop", () => {
      const { container } = render(() => (
        <CarouselItem id="slide-1">
          <div>Content</div>
        </CarouselItem>
      ));
      expect(container.firstChild).toHaveAttribute("id", "slide-1");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("is focusable with tabindex", () => {
      const { container } = render(() => (
        <CarouselItem>
          <div>Content</div>
        </CarouselItem>
      ));
      expect(container.firstChild).toHaveAttribute("tabindex", "0");
    });

    it("renders as a div element", () => {
      const { container } = render(() => (
        <CarouselItem>
          <div>Content</div>
        </CarouselItem>
      ));
      expect(container.firstChild?.tagName).toBe("DIV");
    });
  });

  // Content Handling Tests
  describe("Content Handling", () => {
    it("handles complex JSX children", () => {
      const { getByText, getByAltText } = render(() => (
        <CarouselItem>
          <div>
            <img src="test.jpg" alt="Test image" />
            <h3>Slide Title</h3>
            <p>Slide description</p>
          </div>
        </CarouselItem>
      ));

      expect(getByAltText("Test image")).toBeInTheDocument();
      expect(getByText("Slide Title")).toBeInTheDocument();
      expect(getByText("Slide description")).toBeInTheDocument();
    });

    it("handles empty children gracefully", () => {
      const { container } = render(() => (
        <CarouselItem />
      ));
      expect(container.firstChild).toHaveClass("carousel-item");
      expect(container.firstChild).toBeEmptyDOMElement();
    });

    it("handles multiple child elements", () => {
      const { getByText } = render(() => (
        <CarouselItem>
          <div>
            <span>First element</span>
            <span>Second element</span>
          </div>
        </CarouselItem>
      ));

      expect(getByText("First element")).toBeInTheDocument();
      expect(getByText("Second element")).toBeInTheDocument();
    });
  });

  // Integration with DaisyUI Classes
  describe("DaisyUI Integration", () => {
    it("maintains carousel-item base class with custom classes", () => {
      const { container } = render(() => (
        <CarouselItem class="w-full">
          <div>Content</div>
        </CarouselItem>
      ));
      expect(container.firstChild).toHaveClass("carousel-item", "w-full");
    });

    it("works with DaisyUI utility classes", () => {
      const { container } = render(() => (
        <CarouselItem class="w-96 h-64">
          <img src="test.jpg" alt="Test" />
        </CarouselItem>
      ));
      expect(container.firstChild).toHaveClass("carousel-item", "w-96", "h-64");
    });

    it("supports responsive classes", () => {
      const { container } = render(() => (
        <CarouselItem class="w-full md:w-1/2 lg:w-1/3">
          <div>Responsive content</div>
        </CarouselItem>
      ));
      expect(container.firstChild).toHaveClass(
        "carousel-item",
        "w-full",
        "md:w-1/2",
        "lg:w-1/3"
      );
    });
  });
});