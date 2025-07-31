import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Breadcrumb from "@/components/breadcrumbs/breadcrumb";

describe("Breadcrumb Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders as list item", () => {
      const { container } = render(() => <Breadcrumb>Home</Breadcrumb>);
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });

    it("renders children content", () => {
      const { getByText } = render(() => <Breadcrumb>Home</Breadcrumb>);
      expect(getByText("Home")).toBeInTheDocument();
    });

    it("renders with custom JSX children", () => {
      const { getByTestId } = render(() => (
        <Breadcrumb>
          <span data-testid="custom">Custom Content</span>
        </Breadcrumb>
      ));
      expect(getByTestId("custom")).toBeInTheDocument();
    });
  });

  // Link Rendering Tests
  describe("Link Rendering", () => {
    it("renders as link when href is provided", () => {
      const { getByRole } = render(() => (
        <Breadcrumb href="/home">Home</Breadcrumb>
      ));
      const link = getByRole("link");
      expect(link).toHaveAttribute("href", "/home");
      expect(link).toHaveTextContent("Home");
    });

    it("applies custom classes to link", () => {
      const { getByRole } = render(() => (
        <Breadcrumb href="/home" class="custom-link">Home</Breadcrumb>
      ));
      const link = getByRole("link");
      expect(link).toHaveClass("custom-link");
    });

    it("applies classList to link", () => {
      const { getByRole } = render(() => (
        <Breadcrumb 
          href="/home" 
          classList={{ active: true, inactive: false }}
        >
          Home
        </Breadcrumb>
      ));
      const link = getByRole("link");
      expect(link).toHaveClass("active");
      expect(link).not.toHaveClass("inactive");
    });
  });

  // Button Rendering Tests
  describe("Button Rendering", () => {
    it("renders as button when onClick is provided", () => {
      const handleClick = vi.fn();
      const { getByRole } = render(() => (
        <Breadcrumb onClick={handleClick}>Home</Breadcrumb>
      ));
      const button = getByRole("button");
      expect(button).toHaveTextContent("Home");
    });

    it("calls onClick handler when button is clicked", () => {
      const handleClick = vi.fn();
      const { getByRole } = render(() => (
        <Breadcrumb onClick={handleClick}>Home</Breadcrumb>
      ));
      const button = getByRole("button");
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports keyboard navigation for buttons", () => {
      const handleClick = vi.fn();
      const { getByRole } = render(() => (
        <Breadcrumb onClick={handleClick}>Home</Breadcrumb>
      ));
      const button = getByRole("button");
      
      // Test Enter key
      fireEvent.keyDown(button, { key: "Enter" });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test Space key
      fireEvent.keyDown(button, { key: " " });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it("applies custom classes to button", () => {
      const handleClick = vi.fn();
      const { getByRole } = render(() => (
        <Breadcrumb onClick={handleClick} class="custom-button">Home</Breadcrumb>
      ));
      const button = getByRole("button");
      expect(button).toHaveClass("custom-button");
    });
  });

  // Static Content Tests
  describe("Static Content", () => {
    it("renders as span when no href or onClick", () => {
      const { getByText } = render(() => <Breadcrumb>Current Page</Breadcrumb>);
      const span = getByText("Current Page");
      expect(span.tagName.toLowerCase()).toBe("span");
    });

    it("applies custom classes to span", () => {
      const { getByText } = render(() => (
        <Breadcrumb class="custom-span">Current Page</Breadcrumb>
      ));
      const span = getByText("Current Page");
      expect(span).toHaveClass("custom-span");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("marks current page with aria-current", () => {
      const { getByText } = render(() => (
        <Breadcrumb current>Current Page</Breadcrumb>
      ));
      const element = getByText("Current Page");
      expect(element).toHaveAttribute("aria-current", "page");
    });

    it("applies aria-current to links", () => {
      const { getByRole } = render(() => (
        <Breadcrumb href="/current" current>Current Page</Breadcrumb>
      ));
      const link = getByRole("link");
      expect(link).toHaveAttribute("aria-current", "page");
    });

    it("applies aria-current to buttons", () => {
      const handleClick = vi.fn();
      const { getByRole } = render(() => (
        <Breadcrumb onClick={handleClick} current>Current Page</Breadcrumb>
      ));
      const button = getByRole("button");
      expect(button).toHaveAttribute("aria-current", "page");
    });

    it("does not add aria-current when current is false", () => {
      const { getByText } = render(() => (
        <Breadcrumb current={false}>Regular Page</Breadcrumb>
      ));
      const element = getByText("Regular Page");
      expect(element).not.toHaveAttribute("aria-current");
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("renders list item even with no content", () => {
      const { container } = render(() => <Breadcrumb />);
      const listItem = container.querySelector('li');
      expect(listItem).toBeInTheDocument();
    });

    it("prefers href over onClick when both provided", () => {
      const handleClick = vi.fn();
      const { getByRole, queryByRole } = render(() => (
        <Breadcrumb href="/home" onClick={handleClick}>Home</Breadcrumb>
      ));
      
      // Should render as link, not button
      expect(getByRole("link")).toBeInTheDocument();
      expect(queryByRole("button")).not.toBeInTheDocument();
      
      // onClick should not be called when link is clicked
      fireEvent.click(getByRole("link"));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("handles empty children gracefully", () => {
      const { container } = render(() => <Breadcrumb href="/home"></Breadcrumb>);
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/home");
    });
  });

  // Props Validation Tests
  describe("Props Validation", () => {
    it("accepts all valid props without errors", () => {
      const handleClick = vi.fn();
      
      expect(() => {
        render(() => (
          <Breadcrumb
            href="/home"
            onClick={handleClick}
            current={true}
            class="custom-class"
            classList={{ active: true }}
          >
            Home
          </Breadcrumb>
        ));
      }).not.toThrow();
    });
  });
});