import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import Hero from "@/components/hero/hero";
import HeroContent from "@/components/hero/hero-content";
import HeroOverlay from "@/components/hero/hero-overlay";

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

describe("HeroContent Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default hero-content class", () => {
      const { container } = render(() => <HeroContent />);
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toBeInTheDocument();
      expect(contentElement).toHaveClass("hero-content");
      expect(contentElement.tagName).toBe("DIV");
    });

    it("renders children content", () => {
      const { getByText } = render(() => (
        <HeroContent>
          <div>Content inside hero</div>
        </HeroContent>
      ));
      
      expect(getByText("Content inside hero")).toBeInTheDocument();
    });

    it("applies custom class prop", () => {
      const { container } = render(() => (
        <HeroContent class="custom-hero-class" />
      ));
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toHaveClass("hero-content");
      expect(contentElement).toHaveClass("custom-hero-class");
    });

    it("applies dynamic classList prop", () => {
      const { container } = render(() => (
        <HeroContent classList={{ "dynamic-class": true, "false-class": false }} />
      ));
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toHaveClass("dynamic-class");
      expect(contentElement).not.toHaveClass("false-class");
    });
  });

  describe("Alignment Options", () => {
    it("applies text-center by default", () => {
      const { container } = render(() => <HeroContent />);
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toHaveClass("text-center");
    });

    it("applies text-left when align is start", () => {
      const { container } = render(() => <HeroContent align="start" />);
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toHaveClass("text-left");
      expect(contentElement).not.toHaveClass("text-center");
    });

    it("applies text-right when align is end", () => {
      const { container } = render(() => <HeroContent align="end" />);
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toHaveClass("text-right");
      expect(contentElement).not.toHaveClass("text-center");
    });

    it("applies items-center by default for vertical alignment", () => {
      const { container } = render(() => <HeroContent />);
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toHaveClass("items-center");
    });

    it("applies items-start when verticalAlign is top", () => {
      const { container } = render(() => <HeroContent verticalAlign="top" />);
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toHaveClass("items-start");
      expect(contentElement).not.toHaveClass("items-center");
    });

    it("applies items-end when verticalAlign is bottom", () => {
      const { container } = render(() => <HeroContent verticalAlign="bottom" />);
      const contentElement = container.firstChild as HTMLElement;
      
      expect(contentElement).toHaveClass("items-end");
      expect(contentElement).not.toHaveClass("items-center");
    });
  });

  describe("Combined Usage", () => {
    it("works well inside Hero component", () => {
      const { getByText, container } = render(() => (
        <Hero>
          <HeroContent>
            <h1>Hero Title</h1>
          </HeroContent>
        </Hero>
      ));
      
      expect(getByText("Hero Title")).toBeInTheDocument();
      const heroElement = container.querySelector(".hero");
      const contentElement = container.querySelector(".hero-content");
      
      expect(heroElement).toBeInTheDocument();
      expect(contentElement).toBeInTheDocument();
      expect(heroElement?.contains(contentElement)).toBe(true);
    });
  });
});

describe("HeroOverlay Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default hero-overlay class", () => {
      const { container } = render(() => <HeroOverlay />);
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toBeInTheDocument();
      expect(overlayElement).toHaveClass("hero-overlay");
      expect(overlayElement.tagName).toBe("DIV");
    });

    it("applies default background color and opacity", () => {
      const { container } = render(() => <HeroOverlay />);
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toHaveClass("bg-black");
      expect(overlayElement).toHaveClass("bg-opacity-60");
    });

    it("applies custom class prop", () => {
      const { container } = render(() => (
        <HeroOverlay class="custom-overlay-class" />
      ));
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toHaveClass("hero-overlay");
      expect(overlayElement).toHaveClass("custom-overlay-class");
    });

    it("applies dynamic classList prop", () => {
      const { container } = render(() => (
        <HeroOverlay classList={{ "dynamic-class": true, "false-class": false }} />
      ));
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toHaveClass("dynamic-class");
      expect(overlayElement).not.toHaveClass("false-class");
    });
  });

  describe("Customization Options", () => {
    it("applies custom opacity value", () => {
      const { container } = render(() => <HeroOverlay opacity={40} />);
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toHaveClass("bg-opacity-40");
      expect(overlayElement).not.toHaveClass("bg-opacity-60");
    });

    it("applies custom color class", () => {
      const { container } = render(() => <HeroOverlay color="bg-neutral" />);
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toHaveClass("bg-neutral");
      expect(overlayElement).not.toHaveClass("bg-black");
    });

    it("applies both custom color and opacity", () => {
      const { container } = render(() => (
        <HeroOverlay color="bg-primary" opacity={30} />
      ));
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toHaveClass("bg-primary");
      expect(overlayElement).toHaveClass("bg-opacity-30");
    });

    it("handles edge case of 0 opacity", () => {
      const { container } = render(() => <HeroOverlay opacity={0} />);
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toHaveClass("bg-opacity-0");
    });

    it("handles edge case of 100 opacity", () => {
      const { container } = render(() => <HeroOverlay opacity={100} />);
      const overlayElement = container.firstChild as HTMLElement;
      
      expect(overlayElement).toHaveClass("bg-opacity-100");
    });
  });

  describe("Combined Usage", () => {
    it("works well inside Hero component", () => {
      const { container } = render(() => (
        <Hero backgroundImage="/test-bg.jpg">
          <HeroOverlay />
          <HeroContent>
            <h1>Hero with Overlay</h1>
          </HeroContent>
        </Hero>
      ));
      
      const heroElement = container.querySelector(".hero");
      const overlayElement = container.querySelector(".hero-overlay");
      const contentElement = container.querySelector(".hero-content");
      
      expect(heroElement).toBeInTheDocument();
      expect(overlayElement).toBeInTheDocument();
      expect(contentElement).toBeInTheDocument();
      expect(heroElement?.contains(overlayElement)).toBe(true);
      expect(heroElement?.contains(contentElement)).toBe(true);
    });

    it("multiple overlays can be used for layering effects", () => {
      const { container } = render(() => (
        <Hero>
          <HeroOverlay color="bg-black" opacity={20} />
          <HeroOverlay color="bg-primary" opacity={10} />
          <HeroContent>
            <h1>Layered Overlays</h1>
          </HeroContent>
        </Hero>
      ));
      
      const overlayElements = container.querySelectorAll(".hero-overlay");
      expect(overlayElements).toHaveLength(2);
      
      expect(overlayElements[0]).toHaveClass("bg-black", "bg-opacity-20");
      expect(overlayElements[1]).toHaveClass("bg-primary", "bg-opacity-10");
    });
  });
});

describe("Hero Component Integration with Child Components", () => {
  describe("Component Composition", () => {
    it("works with HeroContent and HeroOverlay together", () => {
      const { getByText, container } = render(() => (
        <Hero backgroundImage="/hero-bg.jpg">
          <HeroOverlay opacity={50} />
          <HeroContent align="center">
            <div>
              <h1>Welcome</h1>
              <p>Hero section with custom components</p>
            </div>
          </HeroContent>
        </Hero>
      ));
      
      expect(getByText("Welcome")).toBeInTheDocument();
      expect(getByText("Hero section with custom components")).toBeInTheDocument();
      
      const heroElement = container.querySelector(".hero");
      const overlayElement = container.querySelector(".hero-overlay");
      const contentElement = container.querySelector(".hero-content");
      
      expect(heroElement).toBeInTheDocument();
      expect(overlayElement).toBeInTheDocument();
      expect(contentElement).toBeInTheDocument();
      
      // Verify proper nesting
      expect(heroElement?.contains(overlayElement)).toBe(true);
      expect(heroElement?.contains(contentElement)).toBe(true);
      
      // Verify overlay customization
      expect(overlayElement).toHaveClass("bg-opacity-50");
      
      // Verify content element exists and has proper structure
      expect(contentElement).toHaveClass("hero-content");
    });

    it("maintains backward compatibility with legacy overlay prop", () => {
      const { container } = render(() => (
        <Hero overlay backgroundImage="/bg.jpg">
          <div>Legacy Content</div>
        </Hero>
      ));
      
      const heroElement = container.querySelector(".hero");
      const overlayElement = container.querySelector(".hero-overlay");
      const contentElement = container.querySelector(".hero-content");
      
      expect(heroElement).toBeInTheDocument();
      expect(overlayElement).toBeInTheDocument();
      expect(contentElement).toBeInTheDocument();
      
      // Legacy overlay should have default values
      expect(overlayElement).toHaveClass("bg-opacity-60");
    });

    it("supports complex nested content in HeroContent", () => {
      const { getByText, getByRole } = render(() => (
        <Hero>
          <HeroContent>
            <div class="max-w-md">
              <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
              <p class="mb-5">Provident cupiditate voluptatem.</p>
              <button class="btn btn-primary">Get Started</button>
            </div>
          </HeroContent>
        </Hero>
      ));
      
      expect(getByText("Hello there")).toBeInTheDocument();
      expect(getByText("Provident cupiditate voluptatem.")).toBeInTheDocument();
      expect(getByRole("button", { name: "Get Started" })).toBeInTheDocument();
    });

    it("supports multiple HeroContent sections", () => {
      const { getByText } = render(() => (
        <Hero>
          <HeroContent align="start">
            <h1>Left Content</h1>
          </HeroContent>
          <HeroContent align="end">
            <h1>Right Content</h1>
          </HeroContent>
        </Hero>
      ));
      
      expect(getByText("Left Content")).toBeInTheDocument();
      expect(getByText("Right Content")).toBeInTheDocument();
    });
  });
});
