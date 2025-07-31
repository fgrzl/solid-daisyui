import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Carousel from "@/components/carousel";

describe("Carousel Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with base carousel class", () => {
      const { container } = render(() => (
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass("carousel");
    });

    it("renders children as carousel items", () => {
      const { getByText, container } = render(() => (
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      expect(getByText("Slide 1")).toBeInTheDocument();
      expect(getByText("Slide 2")).toBeInTheDocument();

      // Check carousel-item classes are applied
      const items = container.querySelectorAll(".carousel-item");
      expect(items).toHaveLength(2);
    });

    it("applies custom class prop", () => {
      const { container } = render(() => (
        <Carousel class="custom-carousel">
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass("carousel", "custom-carousel");
    });

    it("applies classList prop", () => {
      const { container } = render(() => (
        <Carousel classList={{ active: true, disabled: false }}>
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass("carousel", "active");
      expect(container.firstChild).not.toHaveClass("disabled");
    });
  });

  // DaisyUI Snap Alignment Tests
  describe("DaisyUI Snap Alignment", () => {
    it("applies carousel-start class for start snap", () => {
      const { container } = render(() => (
        <Carousel snap="start">
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass("carousel", "carousel-start");
    });

    it("applies carousel-center class for center snap", () => {
      const { container } = render(() => (
        <Carousel snap="center">
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass("carousel", "carousel-center");
    });

    it("applies carousel-end class for end snap", () => {
      const { container } = render(() => (
        <Carousel snap="end">
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass("carousel", "carousel-end");
    });

    it("applies no snap class by default", () => {
      const { container } = render(() => (
        <Carousel>
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass("carousel");
      expect(container.firstChild).not.toHaveClass("carousel-start");
      expect(container.firstChild).not.toHaveClass("carousel-center");
      expect(container.firstChild).not.toHaveClass("carousel-end");
    });
  });

  // DaisyUI Orientation Tests
  describe("DaisyUI Orientation", () => {
    it("applies carousel-vertical class for vertical orientation", () => {
      const { container } = render(() => (
        <Carousel vertical>
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass("carousel", "carousel-vertical");
    });

    it("applies carousel-horizontal class for horizontal orientation", () => {
      const { container } = render(() => (
        <Carousel vertical={false}>
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass(
        "carousel",
        "carousel-horizontal",
      );
    });

    it("applies carousel-horizontal class by default", () => {
      const { container } = render(() => (
        <Carousel>
          <div>Slide 1</div>
        </Carousel>
      ));
      expect(container.firstChild).toHaveClass(
        "carousel",
        "carousel-horizontal",
      );
    });
  });

  // Navigation Controls Tests
  describe("Navigation Controls", () => {
    it("renders navigation buttons when showNavigation is true", () => {
      const { getByLabelText } = render(() => (
        <Carousel showNavigation>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      expect(getByLabelText("Previous slide")).toBeInTheDocument();
      expect(getByLabelText("Next slide")).toBeInTheDocument();
    });

    it("does not render navigation buttons by default", () => {
      const { queryByLabelText } = render(() => (
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      expect(queryByLabelText("Previous slide")).not.toBeInTheDocument();
      expect(queryByLabelText("Next slide")).not.toBeInTheDocument();
    });

    it("renders indicators when showIndicators is true", () => {
      const { container } = render(() => (
        <Carousel showIndicators>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      const indicators = container.querySelectorAll(
        "[role='button'][aria-label*='Go to slide']",
      );
      expect(indicators).toHaveLength(2);
    });

    it("does not render indicators by default", () => {
      const { container } = render(() => (
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      const indicators = container.querySelectorAll(
        "[role='button'][aria-label*='Go to slide']",
      );
      expect(indicators).toHaveLength(0);
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(() => (
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      const carousel = container.firstChild as HTMLElement;
      expect(carousel).toHaveAttribute("role", "region");
      expect(carousel).toHaveAttribute("aria-label", "Carousel");
    });

    it("allows custom aria-label", () => {
      const { container } = render(() => (
        <Carousel ariaLabel="Product images">
          <div>Slide 1</div>
        </Carousel>
      ));

      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "Product images",
      );
    });

    it("carousel items have proper tab order", () => {
      const { container } = render(() => (
        <Carousel>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      const items = container.querySelectorAll(".carousel-item");
      items.forEach((item) => {
        expect(item).toHaveAttribute("tabindex", "0");
      });
    });
  });

  // Navigation Functionality Tests
  describe("Navigation Functionality", () => {
    it("calls onChange when navigation buttons are clicked", () => {
      const onChange = vi.fn();
      const { getByLabelText } = render(() => (
        <Carousel showNavigation onChange={onChange}>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      // Test clicking Next button
      fireEvent.click(getByLabelText("Next slide"));
      expect(onChange).toHaveBeenNthCalledWith(1, 1);

      // Test clicking Previous button
      fireEvent.click(getByLabelText("Previous slide"));
      expect(onChange).toHaveBeenNthCalledWith(2, 0);
    });

    it("calls onChange when indicators are clicked", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <Carousel showIndicators onChange={onChange}>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      const secondIndicator = container.querySelector(
        "[aria-label='Go to slide 2']",
      );
      expect(secondIndicator).toBeInTheDocument();

      fireEvent.click(secondIndicator!);
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("updates active indicator based on currentSlide prop", () => {
      const { container } = render(() => (
        <Carousel showIndicators currentSlide={1}>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      const indicators = container.querySelectorAll(
        "[role='button'][aria-label*='Go to slide']",
      );
      expect(indicators[0]).toHaveAttribute("aria-pressed", "false");
      expect(indicators[1]).toHaveAttribute("aria-pressed", "true");
    });
  });

  // Keyboard Navigation Tests
  describe("Keyboard Navigation", () => {
    it("supports arrow key navigation", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <Carousel onChange={onChange}>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      const carousel = container.firstChild as HTMLElement;

      fireEvent.keyDown(carousel, { key: "ArrowRight" });
      expect(onChange).toHaveBeenCalledWith(1);

      fireEvent.keyDown(carousel, { key: "ArrowLeft" });
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it("supports vertical arrow key navigation when vertical", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <Carousel vertical onChange={onChange}>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      const carousel = container.firstChild as HTMLElement;

      fireEvent.keyDown(carousel, { key: "ArrowDown" });
      expect(onChange).toHaveBeenCalledWith(1);

      fireEvent.keyDown(carousel, { key: "ArrowUp" });
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it("supports Home and End keys", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <Carousel currentSlide={1} onChange={onChange}>
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </Carousel>
      ));

      const carousel = container.firstChild as HTMLElement;

      fireEvent.keyDown(carousel, { key: "Home" });
      expect(onChange).toHaveBeenCalledWith(0);

      fireEvent.keyDown(carousel, { key: "End" });
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });

  // Edge Cases and Error Handling Tests
  describe("Edge Cases and Error Handling", () => {
    it("handles empty children gracefully", () => {
      const { container } = render(() => <Carousel />);
      expect(container.firstChild).toHaveClass("carousel");
      expect(container.querySelectorAll(".carousel-item")).toHaveLength(0);
    });

    it("handles single child", () => {
      const { getByText, container } = render(() => (
        <Carousel>
          <div>Single Slide</div>
        </Carousel>
      ));

      expect(getByText("Single Slide")).toBeInTheDocument();
      expect(container.querySelectorAll(".carousel-item")).toHaveLength(1);
    });

    it("handles currentSlide out of bounds gracefully", () => {
      expect(() => {
        render(() => (
          <Carousel currentSlide={10}>
            <div>Slide 1</div>
            <div>Slide 2</div>
          </Carousel>
        ));
      }).not.toThrow();
    });

    it("disables previous button on first slide", () => {
      const { getByLabelText } = render(() => (
        <Carousel showNavigation currentSlide={0}>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      expect(getByLabelText("Previous slide")).toBeDisabled();
      expect(getByLabelText("Next slide")).not.toBeDisabled();
    });

    it("disables next button on last slide", () => {
      const { getByLabelText } = render(() => (
        <Carousel showNavigation currentSlide={1}>
          <div>Slide 1</div>
          <div>Slide 2</div>
        </Carousel>
      ));

      expect(getByLabelText("Previous slide")).not.toBeDisabled();
      expect(getByLabelText("Next slide")).toBeDisabled();
    });
  });
});
