import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, screen } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import Dropdown from "@/components/dropdown";

describe("Dropdown Component", () => {
  beforeEach(() => {
    // Mock global document methods
    document.addEventListener = vi.fn();
    document.removeEventListener = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with required props", () => {
      const { container } = render(() => (
        <Dropdown>
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown");
    });

    it("renders with base dropdown class", () => {
      const { container } = render(() => (
        <Dropdown>
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown");
    });

    it("renders children content", () => {
      const { getByText } = render(() => (
        <Dropdown>
          <div>Trigger Content</div>
          <div>Dropdown Content</div>
        </Dropdown>
      ));
      
      expect(getByText("Trigger Content")).toBeInTheDocument();
      expect(getByText("Dropdown Content")).toBeInTheDocument();
    });

    it("applies custom class prop", () => {
      const { container } = render(() => (
        <Dropdown class="custom-class">
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "custom-class");
    });

    it("applies classList prop conditionally", () => {
      const { container } = render(() => (
        <Dropdown classList={{ "active": true, "inactive": false }}>
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "active");
      expect(container.firstChild).not.toHaveClass("inactive");
    });
  });

  // DaisyUI Position Variants Tests
  describe("DaisyUI Position Variants", () => {
    it("applies dropdown-top class for top position", () => {
      const { container } = render(() => (
        <Dropdown position="top">
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "dropdown-top");
    });

    it("applies dropdown-bottom class for bottom position", () => {
      const { container } = render(() => (
        <Dropdown position="bottom">
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "dropdown-bottom");
    });

    it("applies dropdown-left class for left position", () => {
      const { container } = render(() => (
        <Dropdown position="left">
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "dropdown-left");
    });

    it("applies dropdown-right class for right position", () => {
      const { container } = render(() => (
        <Dropdown position="right">
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "dropdown-right");
    });

    it("applies dropdown-end class for end alignment", () => {
      const { container } = render(() => (
        <Dropdown align="end">
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "dropdown-end");
    });

    it("does not apply position classes when position is not specified", () => {
      const { container } = render(() => (
        <Dropdown>
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).not.toHaveClass("dropdown-top");
      expect(container.firstChild).not.toHaveClass("dropdown-bottom");
      expect(container.firstChild).not.toHaveClass("dropdown-left");
      expect(container.firstChild).not.toHaveClass("dropdown-right");
    });
  });

  // DaisyUI Trigger Variants Tests
  describe("DaisyUI Trigger Variants", () => {
    it("applies dropdown-hover class when hover trigger is enabled", () => {
      const { container } = render(() => (
        <Dropdown hover>
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "dropdown-hover");
    });

    it("applies dropdown-open class when open prop is true", () => {
      const { container } = render(() => (
        <Dropdown open>
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).toHaveClass("dropdown", "dropdown-open");
    });

    it("does not apply dropdown-open class when open prop is false", () => {
      const { container } = render(() => (
        <Dropdown open={false}>
          <div>Trigger</div>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(container.firstChild).not.toHaveClass("dropdown-open");
    });
  });

  // User Interaction Tests
  describe("User Interactions", () => {
    it("toggles dropdown state when trigger is clicked", () => {
      const { container, getByText } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      
      // Initially closed
      expect(container.firstChild).not.toHaveClass("dropdown-open");
      
      // Click to open
      fireEvent.click(trigger);
      expect(container.firstChild).toHaveClass("dropdown-open");
      
      // Click to close
      fireEvent.click(trigger);
      expect(container.firstChild).not.toHaveClass("dropdown-open");
    });

    it("calls onToggle callback when dropdown state changes", () => {
      const onToggle = vi.fn();
      const { getByText } = render(() => (
        <Dropdown onToggle={onToggle}>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      fireEvent.click(trigger);
      
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("closes dropdown when clicking outside", () => {
      const { container, getByText } = render(() => (
        <div>
          <Dropdown>
            <button>Toggle</button>
            <div>Content</div>
          </Dropdown>
          <div>Outside</div>
        </div>
      ));
      
      const trigger = getByText("Toggle");
      const outside = getByText("Outside");
      
      // Open dropdown
      fireEvent.click(trigger);
      expect(container.querySelector(".dropdown")).toHaveClass("dropdown-open");
      
      // Click outside
      fireEvent.click(outside);
      expect(container.querySelector(".dropdown")).not.toHaveClass("dropdown-open");
    });

    it("closes dropdown when Escape key is pressed", () => {
      const { container, getByText } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      
      // Open dropdown
      fireEvent.click(trigger);
      expect(container.firstChild).toHaveClass("dropdown-open");
      
      // Press Escape
      fireEvent.keyDown(document, { key: "Escape" });
      expect(container.firstChild).not.toHaveClass("dropdown-open");
    });

    it("toggles dropdown with Enter key on trigger", () => {
      const { container, getByText } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      trigger.focus();
      
      // Press Enter to open
      fireEvent.keyDown(trigger, { key: "Enter" });
      expect(container.firstChild).toHaveClass("dropdown-open");
      
      // Press Enter to close
      fireEvent.keyDown(trigger, { key: "Enter" });
      expect(container.firstChild).not.toHaveClass("dropdown-open");
    });

    it("toggles dropdown with Space key on trigger", () => {
      const { container, getByText } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      trigger.focus();
      
      // Press Space to open
      fireEvent.keyDown(trigger, { key: " " });
      expect(container.firstChild).toHaveClass("dropdown-open");
      
      // Press Space to close
      fireEvent.keyDown(trigger, { key: " " });
      expect(container.firstChild).not.toHaveClass("dropdown-open");
    });

    it("does not toggle when hover is enabled and clicked", () => {
      const { container, getByText } = render(() => (
        <Dropdown hover>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      
      // Click should not toggle when hover is enabled
      fireEvent.click(trigger);
      expect(container.firstChild).not.toHaveClass("dropdown-open");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper ARIA attributes on trigger", () => {
      const { getByText } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-haspopup", "true");
      expect(trigger).toHaveAttribute("aria-controls");
    });

    it("updates aria-expanded when dropdown state changes", () => {
      const { getByText } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      
      // Initially collapsed
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      
      // Open dropdown
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("has proper role on dropdown content", () => {
      const { container } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const content = container.querySelector(".dropdown-content");
      expect(content).toHaveAttribute("role", "menu");
    });

    it("has proper id relationship between trigger and content", () => {
      const { getByText, container } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      const content = container.querySelector(".dropdown-content");
      
      const controlsId = trigger.getAttribute("aria-controls");
      expect(content).toHaveAttribute("id", controlsId);
    });

    it("supports custom ARIA label", () => {
      const { getByLabelText } = render(() => (
        <Dropdown ariaLabel="Custom Menu">
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      expect(getByLabelText("Custom Menu")).toBeInTheDocument();
    });

    it("supports keyboard navigation for focus management", () => {
      const { getByText } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>
            <a href="#1">Item 1</a>
            <a href="#2">Item 2</a>
          </div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      trigger.focus();
      
      // Open dropdown
      fireEvent.keyDown(trigger, { key: "Enter" });
      
      // Focus should move to first item
      const firstItem = getByText("Item 1");
      expect(firstItem).toHaveFocus();
    });
  });

  // Edge Cases and Error Handling Tests
  describe("Edge Cases and Error Handling", () => {
    it("handles missing children gracefully", () => {
      expect(() => render(() => <Dropdown />)).not.toThrow();
    });

    it("handles single child gracefully", () => {
      const { getByText } = render(() => (
        <Dropdown>
          <button>Only Child</button>
        </Dropdown>
      ));
      
      expect(getByText("Only Child")).toBeInTheDocument();
    });

    it("preserves dropdown state when props change", () => {
      let setProps: (props: any) => void;
      const TestComponent = () => {
        const [props, setP] = createSignal({ position: "bottom" });
        setProps = setP;
        
        return (
          <Dropdown {...props()}>
            <button>Toggle</button>
            <div>Content</div>
          </Dropdown>
        );
      };
      
      const { container, getByText } = render(() => <TestComponent />);
      const trigger = getByText("Toggle");
      
      // Open dropdown
      fireEvent.click(trigger);
      expect(container.firstChild).toHaveClass("dropdown-open");
      
      // Change props
      setProps({ position: "top" });
      
      // Should still be open
      expect(container.firstChild).toHaveClass("dropdown-open");
    });

    it("handles rapid toggle clicks without breaking", () => {
      const { container, getByText } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      
      // Rapidly toggle
      for (let i = 0; i < 10; i++) {
        fireEvent.click(trigger);
      }
      
      // Should be closed (odd number of clicks)
      expect(container.firstChild).not.toHaveClass("dropdown-open");
    });

    it("cleans up event listeners on unmount", () => {
      const { unmount } = render(() => (
        <Dropdown>
          <button>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      unmount();
      
      // Should call removeEventListener for cleanup
      expect(document.removeEventListener).toHaveBeenCalled();
    });

    it("handles disabled trigger", () => {
      const { container, getByText } = render(() => (
        <Dropdown>
          <button disabled>Toggle</button>
          <div>Content</div>
        </Dropdown>
      ));
      
      const trigger = getByText("Toggle");
      
      // Click on disabled trigger should not open dropdown
      fireEvent.click(trigger);
      expect(container.firstChild).not.toHaveClass("dropdown-open");
    });
  });
});
