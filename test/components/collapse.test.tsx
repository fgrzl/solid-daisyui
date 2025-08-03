import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Collapse from "@/components/collapse";

describe("Collapse Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with title and children", () => {
      const { getByText } = render(() => (
        <Collapse title="Test Title">
          <div>Test Content</div>
        </Collapse>
      ));
      
      expect(getByText("Test Title")).toBeInTheDocument();
      expect(getByText("Test Content")).toBeInTheDocument();
    });

    it("renders with base collapse class", () => {
      const { container } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      expect(container.firstChild).toHaveClass("collapse");
    });

    it("applies additional custom classes", () => {
      const { container } = render(() => (
        <Collapse title="Test" class="custom-class">
          <div>Content</div>
        </Collapse>
      ));
      
      expect(container.firstChild).toHaveClass("collapse", "custom-class");
    });

    it("applies classList prop correctly", () => {
      const { container } = render(() => (
        <Collapse 
          title="Test" 
          classList={{ "dynamic-class": true, "false-class": false }}
        >
          <div>Content</div>
        </Collapse>
      ));
      
      expect(container.firstChild).toHaveClass("collapse", "dynamic-class");
      expect(container.firstChild).not.toHaveClass("false-class");
    });
  });

  // DaisyUI Variant Tests
  describe("DaisyUI Variants", () => {
    it("applies collapse-arrow variant by default", () => {
      const { container } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      expect(container.firstChild).toHaveClass("collapse-arrow");
    });

    it("applies collapse-plus variant when specified", () => {
      const { container } = render(() => (
        <Collapse title="Test" variant="plus">
          <div>Content</div>
        </Collapse>
      ));
      
      expect(container.firstChild).toHaveClass("collapse-plus");
    });

    it("applies collapse-arrow variant when specified", () => {
      const { container } = render(() => (
        <Collapse title="Test" variant="arrow">
          <div>Content</div>
        </Collapse>
      ));
      
      expect(container.firstChild).toHaveClass("collapse-arrow");
    });
  });

  // Input Type Tests
  describe("Input Types", () => {
    it("uses checkbox input by default", () => {
      const { container } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      const input = container.querySelector('input[type="checkbox"]');
      expect(input).toBeInTheDocument();
    });

    it("uses radio input when type is radio", () => {
      const { container } = render(() => (
        <Collapse title="Test" type="radio" name="test-group">
          <div>Content</div>
        </Collapse>
      ));
      
      const input = container.querySelector('input[type="radio"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", "test-group");
    });

    it("requires name prop when type is radio", () => {
      // This should be tested via TypeScript, but we can test runtime behavior
      const { container } = render(() => (
        <Collapse title="Test" type="radio" name="required-name">
          <div>Content</div>
        </Collapse>
      ));
      
      const input = container.querySelector('input[type="radio"]');
      expect(input).toHaveAttribute("name", "required-name");
    });
  });

  // State Management Tests
  describe("State Management", () => {
    it("starts closed by default", () => {
      const { container } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.checked).toBe(false);
    });

    it("starts open when open prop is true", () => {
      const { container } = render(() => (
        <Collapse title="Test" open>
          <div>Content</div>
        </Collapse>
      ));
      
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it("toggles state when clicked", () => {
      const { container, getByRole } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      const button = getByRole("button");
      const input = container.querySelector('input') as HTMLInputElement;
      
      expect(input.checked).toBe(false);
      
      fireEvent.click(button);
      expect(input.checked).toBe(true);
      
      fireEvent.click(button);
      expect(input.checked).toBe(false);
    });

    it("calls onToggle callback when state changes", () => {
      const onToggleMock = vi.fn();
      const { getByRole } = render(() => (
        <Collapse title="Test" onToggle={onToggleMock}>
          <div>Content</div>
        </Collapse>
      ));
      
      const button = getByRole("button");
      
      fireEvent.click(button);
      expect(onToggleMock).toHaveBeenCalledWith(true);
      
      fireEvent.click(button);
      expect(onToggleMock).toHaveBeenCalledWith(false);
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { getByRole, container } = render(() => (
        <Collapse title="Test Title">
          <div>Test Content</div>
        </Collapse>
      ));
      
      const button = getByRole("button");
      const content = container.querySelector('[role="region"]');
      
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(button).toHaveAttribute("aria-controls");
      expect(content).toHaveAttribute("aria-labelledby");
      expect(content).toHaveAttribute("aria-hidden", "true");
    });

    it("updates aria-expanded when toggled", () => {
      const { getByRole } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      const button = getByRole("button");
      
      expect(button).toHaveAttribute("aria-expanded", "false");
      
      fireEvent.click(button);
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    it("supports keyboard navigation with Enter key", () => {
      const { getByRole, container } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      const button = getByRole("button");
      const input = container.querySelector('input') as HTMLInputElement;
      
      expect(input.checked).toBe(false);
      
      fireEvent.keyDown(button, { key: "Enter" });
      expect(input.checked).toBe(true);
    });

    it("supports keyboard navigation with Space key", () => {
      const { getByRole, container } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      const button = getByRole("button");
      const input = container.querySelector('input') as HTMLInputElement;
      
      expect(input.checked).toBe(false);
      
      fireEvent.keyDown(button, { key: " " });
      expect(input.checked).toBe(true);
    });

    it("has proper tabindex for keyboard navigation", () => {
      const { getByRole } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      const button = getByRole("button");
      expect(button).toHaveAttribute("tabindex", "0");
    });

    it("hides input from screen readers", () => {
      const { container } = render(() => (
        <Collapse title="Test">
          <div>Content</div>
        </Collapse>
      ));
      
      const input = container.querySelector('input');
      expect(input).toHaveAttribute("aria-hidden", "true");
    });
  });

  // Content Structure Tests
  describe("Content Structure", () => {
    it("renders title with collapse-title class", () => {
      const { getByText } = render(() => (
        <Collapse title="Test Title">
          <div>Content</div>
        </Collapse>
      ));
      
      const titleElement = getByText("Test Title");
      expect(titleElement).toHaveClass("collapse-title");
    });

    it("renders content with collapse-content class", () => {
      const { container } = render(() => (
        <Collapse title="Test">
          <div>Test Content</div>
        </Collapse>
      ));
      
      const contentWrapper = container.querySelector('.collapse-content');
      expect(contentWrapper).toBeInTheDocument();
      expect(contentWrapper).toContainHTML('<div>Test Content</div>');
    });

    it("generates unique IDs for multiple components", () => {
      const { container } = render(() => (
        <div>
          <Collapse title="First">
            <div>Content 1</div>
          </Collapse>
          <Collapse title="Second">
            <div>Content 2</div>
          </Collapse>
        </div>
      ));
      
      const inputs = container.querySelectorAll('input');
      const firstId = inputs[0].id;
      const secondId = inputs[1].id;
      
      expect(firstId).toBeTruthy();
      expect(secondId).toBeTruthy();
      expect(firstId).not.toBe(secondId);
    });

    it("uses custom ID when provided", () => {
      const { container } = render(() => (
        <Collapse title="Test" id="custom-collapse">
          <div>Content</div>
        </Collapse>
      ));
      
      const input = container.querySelector('input');
      expect(input).toHaveAttribute("id", "custom-collapse");
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("handles empty title gracefully", () => {
      const { container } = render(() => (
        <Collapse title="">
          <div>Content</div>
        </Collapse>
      ));
      
      expect(container.querySelector('.collapse-title')).toBeInTheDocument();
    });

    it("handles missing children gracefully", () => {
      const { container } = render(() => (
        <Collapse title="Test" />
      ));
      
      expect(container.querySelector('.collapse-content')).toBeInTheDocument();
    });

    it("handles multiple children correctly", () => {
      const { getByText } = render(() => (
        <Collapse title="Test">
          <div>First Content</div>
          <div>Second Content</div>
        </Collapse>
      ));
      
      expect(getByText("First Content")).toBeInTheDocument();
      expect(getByText("Second Content")).toBeInTheDocument();
    });
  });
});
