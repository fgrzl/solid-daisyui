import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Carousel from "@/components/carousel";
import CarouselItem from "@/components/carousel-item";

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
          <div class="carousel-item">Slide 1</div>
          <div class="carousel-item">Slide 2</div>
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
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
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
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
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
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
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
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
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
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
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
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
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
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </Carousel>
      ));

      const carousel = container.firstChild as HTMLElement;

      fireEvent.keyDown(carousel, { key: "Home" });
      expect(onChange).toHaveBeenCalledWith(0);

      fireEvent.keyDown(carousel, { key: "End" });
      expect(onChange).toHaveBeenCalledWith(2);
    });
  });

  // Data-Driven Pattern with 'each' Prop Tests
  describe("Data-Driven Pattern with 'each' Prop", () => {
    const sampleData: Array<{ id: number; title: string; content: string }> = [
      { id: 1, title: "Slide 1", content: "Content 1" },
      { id: 2, title: "Slide 2", content: "Content 2" },
      { id: 3, title: "Slide 3", content: "Content 3" },
    ];

    it("renders slides from data array using each prop", () => {
      const { getByText, container } = render(() => (
        <Carousel each={sampleData}>
          {(item) => (
            <CarouselItem>
              <div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </CarouselItem>
          )}
        </Carousel>
      ));

      expect(getByText("Slide 1")).toBeInTheDocument();
      expect(getByText("Content 1")).toBeInTheDocument();
      expect(getByText("Slide 2")).toBeInTheDocument();
      expect(getByText("Content 2")).toBeInTheDocument();
      expect(getByText("Slide 3")).toBeInTheDocument();
      expect(getByText("Content 3")).toBeInTheDocument();

      // Check carousel-item classes are applied
      const items = container.querySelectorAll(".carousel-item");
      expect(items).toHaveLength(3);
    });

    it("provides index parameter in render function", () => {
      const { getByText } = render(() => (
        <Carousel each={sampleData}>
          {(item, index) => (
            <CarouselItem>
              <div>
                <span>Index: {index()}</span>
                <span>{item.title}</span>
              </div>
            </CarouselItem>
          )}
        </Carousel>
      ));

      expect(getByText("Index: 0")).toBeInTheDocument();
      expect(getByText("Index: 1")).toBeInTheDocument();
      expect(getByText("Index: 2")).toBeInTheDocument();
    });

    it("works with navigation when using each prop", () => {
      const onChange = vi.fn();
      const { getByLabelText } = render(() => (
        <Carousel each={sampleData} showNavigation onChange={onChange}>
          {(item) => <CarouselItem>{item.title}</CarouselItem>}
        </Carousel>
      ));

      const nextButton = getByLabelText("Next slide");
      fireEvent.click(nextButton);
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("works with indicators when using each prop", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <Carousel each={sampleData} showIndicators onChange={onChange}>
          {(item) => <CarouselItem>{item.title}</CarouselItem>}
        </Carousel>
      ));

      const indicators = container.querySelectorAll(
        "[role='button'][aria-label*='Go to slide']",
      );
      expect(indicators).toHaveLength(3);

      fireEvent.click(indicators[2]);
      expect(onChange).toHaveBeenCalledWith(2);
    });

    it("handles empty array gracefully with each prop", () => {
      const { container } = render(() => (
        <Carousel each={[] as Array<{ title: string }>}>
          {(item) => <CarouselItem>{item.title}</CarouselItem>}
        </Carousel>
      ));

      expect(container.firstChild).toHaveClass("carousel");
      expect(container.querySelectorAll(".carousel-item")).toHaveLength(0);
    });

    it("works with DaisyUI classes when using each prop", () => {
      const { container } = render(() => (
        <Carousel each={sampleData} snap="center" vertical>
          {(item) => <CarouselItem>{item.title}</CarouselItem>}
        </Carousel>
      ));

      expect(container.firstChild).toHaveClass(
        "carousel",
        "carousel-center",
        "carousel-vertical",
      );
    });

    it("supports keyboard navigation with each prop", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <Carousel each={sampleData} onChange={onChange}>
          {(item) => <CarouselItem>{item.title}</CarouselItem>}
        </Carousel>
      ));

      const carousel = container.firstChild as HTMLElement;
      fireEvent.keyDown(carousel, { key: "ArrowRight" });
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("handles complex data structures with each prop", () => {
      const complexData = [
        { 
          id: 1, 
          image: { src: "image1.jpg", alt: "Image 1" },
          caption: "First image"
        },
        { 
          id: 2, 
          image: { src: "image2.jpg", alt: "Image 2" },
          caption: "Second image"
        },
      ];

      const { getByText, getByAltText } = render(() => (
        <Carousel each={complexData}>
          {(item) => (
            <CarouselItem>
              <div>
                <img src={item.image.src} alt={item.image.alt} />
                <p>{item.caption}</p>
              </div>
            </CarouselItem>
          )}
        </Carousel>
      ));

      expect(getByAltText("Image 1")).toBeInTheDocument();
      expect(getByText("First image")).toBeInTheDocument();
      expect(getByAltText("Image 2")).toBeInTheDocument();
      expect(getByText("Second image")).toBeInTheDocument();
    });
  });

  // Backward Compatibility Tests
  describe("Backward Compatibility", () => {
    it("continues to work with traditional JSX children when each prop is not provided", () => {
      const { getByText } = render(() => (
        <Carousel>
          <div class="carousel-item">Traditional Slide 1</div>
          <div class="carousel-item">Traditional Slide 2</div>
        </Carousel>
      ));

      expect(getByText("Traditional Slide 1")).toBeInTheDocument();
      expect(getByText("Traditional Slide 2")).toBeInTheDocument();
    });

    it("works with navigation using traditional children", () => {
      const onChange = vi.fn();
      const { getByLabelText } = render(() => (
        <Carousel showNavigation onChange={onChange}>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </Carousel>
      ));

      fireEvent.click(getByLabelText("Next slide"));
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("prioritizes each prop when both each and children are provided", () => {
      const data: Array<{ title: string }> = [{ title: "Data Slide" }];
      const { getByText, container } = render(() => (
        <Carousel each={data}>
          {(item) => <CarouselItem>{item.title}</CarouselItem>}
        </Carousel>
      ));

      expect(getByText("Data Slide")).toBeInTheDocument();
      // Verify only the each prop content is rendered (1 carousel item)
      const items = container.querySelectorAll(".carousel-item");
      expect(items).toHaveLength(1);
    });
  });

  // CarouselItem Component Integration Tests
  describe("CarouselItem Component Integration", () => {
    it("renders CarouselItem children correctly", () => {
      const { getByText, container } = render(() => (
        <Carousel>
          <CarouselItem>
            <div>Slide 1 Content</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide 2 Content</div>
          </CarouselItem>
        </Carousel>
      ));

      expect(getByText("Slide 1 Content")).toBeInTheDocument();
      expect(getByText("Slide 2 Content")).toBeInTheDocument();

      // Check that CarouselItem components have proper carousel-item class
      const items = container.querySelectorAll(".carousel-item");
      expect(items).toHaveLength(2);
    });

    it("works with navigation when using CarouselItem children", () => {
      const onChange = vi.fn();
      const { getByLabelText } = render(() => (
        <Carousel showNavigation onChange={onChange}>
          <CarouselItem>
            <div>Slide 1</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide 2</div>
          </CarouselItem>
        </Carousel>
      ));

      // Test clicking Next button
      fireEvent.click(getByLabelText("Next slide"));
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("works with indicators when using CarouselItem children", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <Carousel showIndicators onChange={onChange}>
          <CarouselItem>
            <div>Slide 1</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide 2</div>
          </CarouselItem>
        </Carousel>
      ));

      const indicators = container.querySelectorAll(
        "[role='button'][aria-label*='Go to slide']",
      );
      expect(indicators).toHaveLength(2);

      fireEvent.click(indicators[1]);
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("supports keyboard navigation with CarouselItem children", () => {
      const onChange = vi.fn();
      const { container } = render(() => (
        <Carousel onChange={onChange}>
          <CarouselItem>
            <div>Slide 1</div>
          </CarouselItem>
          <CarouselItem>
            <div>Slide 2</div>
          </CarouselItem>
        </Carousel>
      ));

      const carousel = container.firstChild as HTMLElement;
      fireEvent.keyDown(carousel, { key: "ArrowRight" });
      expect(onChange).toHaveBeenCalledWith(1);
    });

    it("supports CarouselItem with custom classes and props", () => {
      const { container, getByText } = render(() => (
        <Carousel>
          <CarouselItem class="w-full" id="slide-1">
            <div>Custom Slide 1</div>
          </CarouselItem>
          <CarouselItem classList={{ active: true }}>
            <div>Custom Slide 2</div>
          </CarouselItem>
        </Carousel>
      ));

      expect(getByText("Custom Slide 1")).toBeInTheDocument();
      expect(getByText("Custom Slide 2")).toBeInTheDocument();

      // Find the CarouselItem components with their classes
      const slideWithId = container.querySelector("#slide-1");
      expect(slideWithId).toBeInTheDocument();
      expect(slideWithId).toHaveClass("carousel-item", "w-full");

      const slideWithActiveClass = container.querySelector(".active");
      expect(slideWithActiveClass).toBeInTheDocument();
      expect(slideWithActiveClass).toHaveClass("carousel-item", "active");
    });

    it("works with data-driven pattern and CarouselItem", () => {
      const sampleData = [
        { id: 1, title: "Item 1", content: "Content 1" },
        { id: 2, title: "Item 2", content: "Content 2" },
      ];

      const { getByText, container } = render(() => (
        <Carousel each={sampleData}>
          {(item) => (
            <CarouselItem>
              <div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            </CarouselItem>
          )}
        </Carousel>
      ));

      expect(getByText("Item 1")).toBeInTheDocument();
      expect(getByText("Content 1")).toBeInTheDocument();
      expect(getByText("Item 2")).toBeInTheDocument();
      expect(getByText("Content 2")).toBeInTheDocument();

      // Verify proper carousel-item structure
      const items = container.querySelectorAll(".carousel-item");
      expect(items).toHaveLength(2);
    });

    it("demonstrates better developer experience with CarouselItem", () => {
      const { container, getByText } = render(() => (
        <Carousel>
          <CarouselItem class="w-96 h-64">
            <img src="image1.jpg" alt="Image 1" />
          </CarouselItem>
          <CarouselItem class="w-full">
            <div class="card">
              <h3>Card Title</h3>
              <p>Card content</p>
            </div>
          </CarouselItem>
        </Carousel>
      ));

      expect(getByText("Card Title")).toBeInTheDocument();
      expect(getByText("Card content")).toBeInTheDocument();

      // Verify that CarouselItem components have their own styling
      const items = container.querySelectorAll(".carousel-item");
      expect(items).toHaveLength(2);
      
      // Check for the presence of custom classes
      const imageSlide = container.querySelector(".w-96");
      const cardSlide = container.querySelector(".w-full");
      expect(imageSlide).toBeInTheDocument();
      expect(cardSlide).toBeInTheDocument();
    });

    it("requires explicit CarouselItem wrapper for proper styling", () => {
      const { container, getByText } = render(() => (
        <Carousel>
          <CarouselItem>
            <div>Properly wrapped slide</div>
          </CarouselItem>
          <div>Direct JSX slide (not recommended)</div>
        </Carousel>
      ));

      expect(getByText("Properly wrapped slide")).toBeInTheDocument();
      expect(getByText("Direct JSX slide (not recommended)")).toBeInTheDocument();

      // Only the CarouselItem should have carousel-item class
      const items = container.querySelectorAll(".carousel-item");
      expect(items).toHaveLength(1); // Only the wrapped one
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
          <CarouselItem>Single Slide</CarouselItem>
        </Carousel>
      ));

      expect(getByText("Single Slide")).toBeInTheDocument();
      expect(container.querySelectorAll(".carousel-item")).toHaveLength(1);
    });

    it("handles currentSlide out of bounds gracefully", () => {
      expect(() => {
        render(() => (
          <Carousel currentSlide={10}>
            <CarouselItem>Slide 1</CarouselItem>
            <CarouselItem>Slide 2</CarouselItem>
          </Carousel>
        ));
      }).not.toThrow();
    });

    it("disables previous button on first slide", () => {
      const { getByLabelText } = render(() => (
        <Carousel showNavigation currentSlide={0}>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </Carousel>
      ));

      expect(getByLabelText("Previous slide")).toBeDisabled();
      expect(getByLabelText("Next slide")).not.toBeDisabled();
    });

    it("disables next button on last slide", () => {
      const { getByLabelText } = render(() => (
        <Carousel showNavigation currentSlide={1}>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </Carousel>
      ));

      expect(getByLabelText("Previous slide")).not.toBeDisabled();
      expect(getByLabelText("Next slide")).toBeDisabled();
    });
  });
});
