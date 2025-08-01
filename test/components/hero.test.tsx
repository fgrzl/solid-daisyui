import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Hero from "@/components/hero";

describe("Hero Component", () => {
  // Basic rendering tests
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      const { container } = render(() => <Hero />);
      const heroElement = container.firstChild as HTMLElement;
      
      expect(heroElement).toBeInTheDocument();
      expect(heroElement).toHaveClass("hero");
    });

    it("renders children content", () => {
      const { getByText } = render(() => (
        <Hero>
          <div>Hero Content</div>
        </Hero>
      ));
      
      expect(getByText("Hero Content")).toBeInTheDocument();
    });

    it("applies custom class prop", () => {
      const { container } = render(() => (
        <Hero class="custom-hero">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveClass("hero");
      expect(heroElement).toHaveClass("custom-hero");
    });

    it("applies dynamic classList prop", () => {
      const { container } = render(() => (
        <Hero classList={{ "dynamic-class": true, "inactive-class": false }}>
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveClass("hero");
      expect(heroElement).toHaveClass("dynamic-class");
      expect(heroElement).not.toHaveClass("inactive-class");
    });
  });

  // Background and overlay tests
  describe("Background and Overlay", () => {
    it("applies background image when provided", () => {
      const { container } = render(() => (
        <Hero backgroundImage="https://example.com/hero.jpg">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveStyle("background-image: url(https://example.com/hero.jpg)");
    });

    it("renders overlay when overlay prop is true", () => {
      const { container } = render(() => (
        <Hero overlay>
          <div>Content</div>
        </Hero>
      ));
      
      const overlayElement = container.querySelector(".hero-overlay");
      expect(overlayElement).toBeInTheDocument();
    });

    it("does not render overlay when overlay prop is false", () => {
      const { container } = render(() => (
        <Hero overlay={false}>
          <div>Content</div>
        </Hero>
      ));
      
      const overlayElement = container.querySelector(".hero-overlay");
      expect(overlayElement).not.toBeInTheDocument();
    });

    it("renders both background image and overlay together", () => {
      const { container } = render(() => (
        <Hero backgroundImage="https://example.com/hero.jpg" overlay>
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      const overlayElement = container.querySelector(".hero-overlay");
      
      expect(heroElement).toHaveStyle("background-image: url(https://example.com/hero.jpg)");
      expect(overlayElement).toBeInTheDocument();
    });
  });

  // Content structure tests
  describe("Content Structure", () => {
    it("wraps children in hero-content by default", () => {
      const { container, getByText } = render(() => (
        <Hero>
          <div>Test Content</div>
        </Hero>
      ));
      
      const contentElement = container.querySelector(".hero-content");
      expect(contentElement).toBeInTheDocument();
      expect(contentElement).toContainElement(getByText("Test Content"));
    });

    it("does not double-wrap content when noContentWrapper is true", () => {
      const { container } = render(() => (
        <Hero noContentWrapper>
          <div class="hero-content">
            <div>Custom Content Structure</div>
          </div>
        </Hero>
      ));
      
      // Should only have one hero-content element
      const contentElements = container.querySelectorAll(".hero-content");
      expect(contentElements).toHaveLength(1);
    });
  });

  // Size and height tests
  describe("Size and Height", () => {
    it("applies min-height when provided", () => {
      const { container } = render(() => (
        <Hero minHeight="400px">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveStyle("min-height: 400px");
    });

    it("applies screen size class when size prop is provided", () => {
      const { container } = render(() => (
        <Hero size="screen">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveClass("min-h-screen");
    });

    it("applies custom height class when size prop is provided", () => {
      const { container } = render(() => (
        <Hero size="96">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveClass("min-h-96");
    });
  });

  // Accessibility tests
  describe("Accessibility", () => {
    it("has proper semantic structure", () => {
      const { container } = render(() => (
        <Hero>
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement.tagName.toLowerCase()).toBe("section");
    });

    it("supports aria-label for screen readers", () => {
      const { container } = render(() => (
        <Hero aria-label="Main hero banner">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveAttribute("aria-label", "Main hero banner");
    });

    it("supports aria-labelledby for complex labeling", () => {
      const { container } = render(() => (
        <Hero aria-labelledby="hero-title">
          <h1 id="hero-title">Welcome</h1>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveAttribute("aria-labelledby", "hero-title");
    });

    it("applies proper role when specified", () => {
      const { container } = render(() => (
        <Hero role="banner">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveAttribute("role", "banner");
    });
  });

  // Edge cases and error handling
  describe("Edge Cases", () => {
    it("handles empty children gracefully", () => {
      const { container } = render(() => <Hero />);
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toBeInTheDocument();
      expect(heroElement).toHaveClass("hero");
    });

    it("handles null children gracefully", () => {
      const { container } = render(() => <Hero>{null}</Hero>);
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toBeInTheDocument();
      expect(heroElement).toHaveClass("hero");
    });

    it("handles undefined background image gracefully", () => {
      const { container } = render(() => (
        <Hero backgroundImage={undefined}>
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).not.toHaveAttribute("style");
    });

    it("handles empty string background image gracefully", () => {
      const { container } = render(() => (
        <Hero backgroundImage="">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).not.toHaveAttribute("style");
    });
  });

  // DaisyUI integration tests
  describe("DaisyUI Integration", () => {
    it("uses official DaisyUI hero class", () => {
      const { container } = render(() => <Hero />);
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveClass("hero");
    });

    it("uses official DaisyUI hero-content class for content wrapper", () => {
      const { container } = render(() => (
        <Hero>
          <div>Content</div>
        </Hero>
      ));
      
      const contentElement = container.querySelector(".hero-content");
      expect(contentElement).toBeInTheDocument();
    });

    it("uses official DaisyUI hero-overlay class for overlay", () => {
      const { container } = render(() => (
        <Hero overlay>
          <div>Content</div>
        </Hero>
      ));
      
      const overlayElement = container.querySelector(".hero-overlay");
      expect(overlayElement).toBeInTheDocument();
      expect(overlayElement).toHaveClass("hero-overlay");
    });

    it("supports combining with other DaisyUI utility classes", () => {
      const { container } = render(() => (
        <Hero class="bg-base-200 text-base-content">
          <div>Content</div>
        </Hero>
      ));
      
      const heroElement = container.firstChild as HTMLElement;
      expect(heroElement).toHaveClass("hero");
      expect(heroElement).toHaveClass("bg-base-200");
      expect(heroElement).toHaveClass("text-base-content");
    });
  });

  // Component composition tests
  describe("Component Composition", () => {
    it("works with complex content structure", () => {
      const { getByText, getByRole } = render(() => (
        <Hero>
          <div class="hero-content text-center">
            <div class="max-w-md">
              <h1 class="text-5xl font-bold">Hello there</h1>
              <p class="py-6">Provident cupiditate voluptatem.</p>
              <button class="btn btn-primary">Get Started</button>
            </div>
          </div>
        </Hero>
      ));
      
      expect(getByText("Hello there")).toBeInTheDocument();
      expect(getByText("Provident cupiditate voluptatem.")).toBeInTheDocument();
      expect(getByRole("button", { name: "Get Started" })).toBeInTheDocument();
    });

    it("supports multiple content sections", () => {
      const { getByText } = render(() => (
        <Hero noContentWrapper>
          <div class="hero-content flex-col lg:flex-row">
            <img src="/hero.jpg" alt="Hero" class="max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 class="text-5xl font-bold">Box Office News!</h1>
              <p class="py-6">Provident cupiditate voluptatem.</p>
            </div>
          </div>
        </Hero>
      ));
      
      expect(getByText("Box Office News!")).toBeInTheDocument();
      expect(getByText("Provident cupiditate voluptatem.")).toBeInTheDocument();
    });
  });
});
