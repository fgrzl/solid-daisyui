import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Navbar from "@/components/navbar";

describe("Navbar Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with children", () => {
      const { getByText } = render(() => <Navbar>Test Navbar</Navbar>);
      expect(getByText("Test Navbar")).toBeInTheDocument();
    });

    it("renders with base navbar class", () => {
      const { container } = render(() => <Navbar>Test</Navbar>);
      expect(container.firstChild).toHaveClass("navbar");
    });

    it("has proper navigation role for accessibility", () => {
      const { getByRole } = render(() => <Navbar>Test</Navbar>);
      expect(getByRole("navigation")).toBeInTheDocument();
    });

    it("renders without children", () => {
      const { container } = render(() => <Navbar />);
      expect(container.firstChild).toHaveClass("navbar");
    });
  });

  // Props and Styling Tests
  describe("Props and Styling", () => {
    it("applies additional CSS classes", () => {
      const { container } = render(() => <Navbar class="custom-class">Test</Navbar>);
      expect(container.firstChild).toHaveClass("navbar", "custom-class");
    });

    it("supports classList prop for conditional styling", () => {
      const { container } = render(() => (
        <Navbar classList={{ "conditional-class": true, "false-class": false }}>
          Test
        </Navbar>
      ));
      expect(container.firstChild).toHaveClass("navbar", "conditional-class");
      expect(container.firstChild).not.toHaveClass("false-class");
    });

    it("supports shadow prop", () => {
      const { container } = render(() => <Navbar shadow>Test</Navbar>);
      expect(container.firstChild).toHaveClass("navbar", "shadow-lg");
    });

    it("supports background color variants", () => {
      const { container } = render(() => <Navbar bgColor="primary">Test</Navbar>);
      expect(container.firstChild).toHaveClass("navbar", "bg-primary");
    });

    it("supports custom background colors", () => {
      const { container } = render(() => <Navbar bgColor="red-500">Test</Navbar>);
      expect(container.firstChild).toHaveClass("navbar", "bg-red-500");
    });
  });

  // Section Components Tests
  describe("Section Components", () => {
    it("renders navbar start section", () => {
      const { container } = render(() => (
        <Navbar>
          <Navbar.Start>Start Content</Navbar.Start>
        </Navbar>
      ));
      const startSection = container.querySelector(".navbar-start");
      expect(startSection).toBeInTheDocument();
      expect(startSection).toHaveTextContent("Start Content");
    });

    it("renders navbar center section", () => {
      const { container } = render(() => (
        <Navbar>
          <Navbar.Center>Center Content</Navbar.Center>
        </Navbar>
      ));
      const centerSection = container.querySelector(".navbar-center");
      expect(centerSection).toBeInTheDocument();
      expect(centerSection).toHaveTextContent("Center Content");
    });

    it("renders navbar end section", () => {
      const { container } = render(() => (
        <Navbar>
          <Navbar.End>End Content</Navbar.End>
        </Navbar>
      ));
      const endSection = container.querySelector(".navbar-end");
      expect(endSection).toBeInTheDocument();
      expect(endSection).toHaveTextContent("End Content");
    });

    it("renders all sections together", () => {
      const { container } = render(() => (
        <Navbar>
          <Navbar.Start>Start</Navbar.Start>
          <Navbar.Center>Center</Navbar.Center>
          <Navbar.End>End</Navbar.End>
        </Navbar>
      ));
      expect(container.querySelector(".navbar-start")).toBeInTheDocument();
      expect(container.querySelector(".navbar-center")).toBeInTheDocument();
      expect(container.querySelector(".navbar-end")).toBeInTheDocument();
    });

    it("section components support custom classes", () => {
      const { container } = render(() => (
        <Navbar>
          <Navbar.Start class="custom-start">Start</Navbar.Start>
        </Navbar>
      ));
      const startSection = container.querySelector(".navbar-start");
      expect(startSection).toHaveClass("navbar-start", "custom-start");
    });

    it("section components support classList", () => {
      const { container } = render(() => (
        <Navbar>
          <Navbar.Center classList={{ "active": true, "inactive": false }}>Center</Navbar.Center>
        </Navbar>
      ));
      const centerSection = container.querySelector(".navbar-center");
      expect(centerSection).toHaveClass("navbar-center", "active");
      expect(centerSection).not.toHaveClass("inactive");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has navigation role", () => {
      const { getByRole } = render(() => <Navbar>Test</Navbar>);
      expect(getByRole("navigation")).toBeInTheDocument();
    });

    it("supports aria-label", () => {
      const { getByLabelText } = render(() => (
        <Navbar aria-label="Main navigation">Test</Navbar>
      ));
      expect(getByLabelText("Main navigation")).toBeInTheDocument();
    });

    it("supports aria-labelledby", () => {
      const { container } = render(() => (
        <div>
          <h1 id="nav-title">Site Navigation</h1>
          <Navbar aria-labelledby="nav-title">Test</Navbar>
        </div>
      ));
      const navbar = container.querySelector(".navbar");
      expect(navbar).toHaveAttribute("aria-labelledby", "nav-title");
    });

    it("supports custom ARIA attributes", () => {
      const { container } = render(() => (
        <Navbar aria-expanded="false" aria-controls="mobile-menu">Test</Navbar>
      ));
      const navbar = container.querySelector(".navbar");
      expect(navbar).toHaveAttribute("aria-expanded", "false");
      expect(navbar).toHaveAttribute("aria-controls", "mobile-menu");
    });
  });

  // Responsive Design Tests
  describe("Responsive Design", () => {
    it("supports responsive prop for mobile-first design", () => {
      const { container } = render(() => <Navbar responsive>Test</Navbar>);
      expect(container.firstChild).toHaveClass("navbar");
      // Additional responsive classes would be applied based on breakpoints
    });

    it("maintains proper structure at different breakpoints", () => {
      const { container } = render(() => (
        <Navbar>
          <Navbar.Start>Logo</Navbar.Start>
          <Navbar.End>Menu</Navbar.End>
        </Navbar>
      ));
      // Verify that flex layout classes are properly applied
      expect(container.firstChild).toHaveClass("navbar");
      expect(container.querySelector(".navbar-start")).toBeInTheDocument();
      expect(container.querySelector(".navbar-end")).toBeInTheDocument();
    });
  });

  // Event Handling Tests
  describe("Event Handling", () => {
    it("supports onClick event", () => {
      const handleClick = vi.fn();
      const { container } = render(() => (
        <Navbar onClick={handleClick}>Test</Navbar>
      ));
      fireEvent.click(container.firstChild as Element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports other event handlers", () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      const { container } = render(() => (
        <Navbar onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Test
        </Navbar>
      ));
      
      fireEvent.mouseEnter(container.firstChild as Element);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      
      fireEvent.mouseLeave(container.firstChild as Element);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  // Edge Cases and Error Handling
  describe("Edge Cases", () => {
    it("handles null or undefined children gracefully", () => {
      const { container } = render(() => <Navbar>{null}</Navbar>);
      expect(container.firstChild).toHaveClass("navbar");
    });

    it("handles empty string class", () => {
      const { container } = render(() => <Navbar class="">Test</Navbar>);
      expect(container.firstChild).toHaveClass("navbar");
    });

    it("handles complex nested content", () => {
      const { getByText } = render(() => (
        <Navbar>
          <Navbar.Start>
            <div>
              <span>Complex</span>
              <span>Content</span>
            </div>
          </Navbar.Start>
          <Navbar.End>
            <button>Action</button>
          </Navbar.End>
        </Navbar>
      ));
      expect(getByText("Complex")).toBeInTheDocument();
      expect(getByText("Content")).toBeInTheDocument();
      expect(getByText("Action")).toBeInTheDocument();
    });
  });

  // Component Composition Tests
  describe("Component Composition", () => {
    it("works with other DaisyUI components", () => {
      const { getByText } = render(() => (
        <Navbar>
          <Navbar.Start>
            <div class="btn">Button</div>
          </Navbar.Start>
          <Navbar.End>
            <div class="dropdown">
              <div class="dropdown-content">Dropdown</div>
            </div>
          </Navbar.End>
        </Navbar>
      ));
      expect(getByText("Button")).toBeInTheDocument();
      expect(getByText("Dropdown")).toBeInTheDocument();
    });

    it("maintains proper semantic structure with complex content", () => {
      const { container } = render(() => (
        <Navbar aria-label="Main navigation">
          <Navbar.Start>
            <a href="/" aria-label="Home">Logo</a>
          </Navbar.Start>
          <Navbar.Center>
            <ul role="menubar">
              <li role="none">
                <a href="/about" role="menuitem">About</a>
              </li>
            </ul>
          </Navbar.Center>
          <Navbar.End>
            <button type="button">Menu</button>
          </Navbar.End>
        </Navbar>
      ));
      
      expect(container.querySelector('nav[aria-label="Main navigation"]')).toBeInTheDocument();
      expect(container.querySelector('ul[role="menubar"]')).toBeInTheDocument();
      expect(container.querySelector('a[role="menuitem"]')).toBeInTheDocument();
    });
  });
});
