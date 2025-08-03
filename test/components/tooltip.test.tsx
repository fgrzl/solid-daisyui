import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import Tooltip from "@/components/tooltip";

describe("Tooltip Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with children and tooltip text", () => {
      const { getByText, container } = render(() => (
        <Tooltip tip="This is a tooltip">
          <button>Hover me</button>
        </Tooltip>
      ));
      expect(getByText("Hover me")).toBeInTheDocument();
      expect(container.querySelector('[data-tip="This is a tooltip"]')).toBeInTheDocument();
    });

    it("renders with base tooltip class", () => {
      const { container } = render(() => (
        <Tooltip tip="Test tip">
          <span>Target</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip");
    });

    it("applies tip text to data-tip attribute", () => {
      const { container } = render(() => (
        <Tooltip tip="Custom tooltip text">
          <div>Content</div>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveAttribute("data-tip", "Custom tooltip text");
    });
  });

  // Position Variants Tests
  describe("Position Variants", () => {
    it("applies tooltip-top class by default", () => {
      const { container } = render(() => (
        <Tooltip tip="Test">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-top");
    });

    it("applies tooltip-bottom class when position is bottom", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" position="bottom">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-bottom");
    });

    it("applies tooltip-left class when position is left", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" position="left">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-left");
    });

    it("applies tooltip-right class when position is right", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" position="right">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-right");
    });
  });

  // Color Variants Tests
  describe("Color Variants", () => {
    it("applies tooltip-primary class when color is primary", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" color="primary">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-primary");
    });

    it("applies tooltip-secondary class when color is secondary", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" color="secondary">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-secondary");
    });

    it("applies tooltip-accent class when color is accent", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" color="accent">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-accent");
    });

    it("applies tooltip-neutral class when color is neutral", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" color="neutral">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-neutral");
    });

    it("applies tooltip-success class when color is success", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" color="success">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-success");
    });

    it("applies tooltip-warning class when color is warning", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" color="warning">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-warning");
    });

    it("applies tooltip-error class when color is error", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" color="error">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-error");
    });

    it("applies tooltip-info class when color is info", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" color="info">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-info");
    });
  });

  // Open State Tests
  describe("Open State", () => {
    it("applies tooltip-open class when open is true", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" open={true}>
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip-open");
    });

    it("does not apply tooltip-open class when open is false", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" open={false}>
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).not.toHaveClass("tooltip-open");
    });

    it("does not apply tooltip-open class when open is undefined", () => {
      const { container } = render(() => (
        <Tooltip tip="Test">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).not.toHaveClass("tooltip-open");
    });
  });

  // Custom Classes Tests
  describe("Custom Classes", () => {
    it("applies custom class when provided", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" class="custom-class">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("custom-class");
      expect(container.firstChild).toHaveClass("tooltip");
    });

    it("applies multiple classes when classList is provided", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" classList={{ "class-1": true, "class-2": false, "class-3": true }}>
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("class-1");
      expect(container.firstChild).not.toHaveClass("class-2");
      expect(container.firstChild).toHaveClass("class-3");
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper aria-describedby attribute", () => {
      const { container } = render(() => (
        <Tooltip tip="Accessible tooltip">
          <button>Accessible button</button>
        </Tooltip>
      ));
      const tooltip = container.firstChild as Element;
      const button = tooltip.querySelector("button");
      expect(button).toHaveAttribute("aria-describedby");
      
      const describedById = button?.getAttribute("aria-describedby");
      expect(describedById).toBeTruthy();
    });

    it("tooltip has role=tooltip when open", () => {
      const { container } = render(() => (
        <Tooltip tip="Test tooltip" open={true}>
          <span>Test</span>
        </Tooltip>
      ));
      // The tooltip text should be accessible
      expect(container.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });

    it("tooltip text is accessible via aria-describedby", () => {
      const { container } = render(() => (
        <Tooltip tip="Accessible tooltip text" open={true}>
          <button>Button</button>
        </Tooltip>
      ));
      const button = container.querySelector("button");
      const describedById = button?.getAttribute("aria-describedby");
      const tooltipElement = container.querySelector(`#${describedById}`);
      
      expect(tooltipElement).toBeInTheDocument();
      expect(tooltipElement).toHaveTextContent("Accessible tooltip text");
    });
  });

  // Interaction Tests
  describe("Interactions", () => {
    it("shows tooltip on mouse enter", () => {
      const { container } = render(() => (
        <Tooltip tip="Hover tooltip">
          <button>Hover me</button>
        </Tooltip>
      ));
      
      const tooltip = container.firstChild as Element;
      expect(tooltip).not.toHaveClass("tooltip-open");
      
      fireEvent.mouseEnter(tooltip);
      expect(tooltip).toHaveClass("tooltip-open");
    });

    it("hides tooltip on mouse leave", () => {
      const { container } = render(() => (
        <Tooltip tip="Hover tooltip">
          <button>Hover me</button>
        </Tooltip>
      ));
      
      const tooltip = container.firstChild as Element;
      
      // Show tooltip first
      fireEvent.mouseEnter(tooltip);
      expect(tooltip).toHaveClass("tooltip-open");
      
      // Hide on mouse leave
      fireEvent.mouseLeave(tooltip);
      expect(tooltip).not.toHaveClass("tooltip-open");
    });

    it("shows tooltip on focus", () => {
      const { container } = render(() => (
        <Tooltip tip="Focus tooltip">
          <button>Focus me</button>
        </Tooltip>
      ));
      
      const tooltip = container.firstChild as Element;
      const button = tooltip.querySelector("button");
      
      expect(tooltip).not.toHaveClass("tooltip-open");
      
      fireEvent.focus(button!);
      expect(tooltip).toHaveClass("tooltip-open");
    });

    it("hides tooltip on blur", () => {
      const { container } = render(() => (
        <Tooltip tip="Focus tooltip">
          <button>Focus me</button>
        </Tooltip>
      ));
      
      const tooltip = container.firstChild as Element;
      const button = tooltip.querySelector("button");
      
      // Show tooltip first
      fireEvent.focus(button!);
      expect(tooltip).toHaveClass("tooltip-open");
      
      // Hide on blur
      fireEvent.blur(button!);
      expect(tooltip).not.toHaveClass("tooltip-open");
    });
  });

  // Edge Cases Tests
  describe("Edge Cases", () => {
    it("handles empty tip text gracefully", () => {
      const { container } = render(() => (
        <Tooltip tip="">
          <span>Test</span>
        </Tooltip>
      ));
      expect(container.firstChild).toHaveAttribute("data-tip", "");
    });

    it("handles null children gracefully", () => {
      const { container } = render(() => (
        <Tooltip tip="Test">
          {null}
        </Tooltip>
      ));
      expect(container.firstChild).toHaveClass("tooltip");
    });

    it("works with complex children", () => {
      const { container, getByText } = render(() => (
        <Tooltip tip="Complex tooltip">
          <div>
            <span>Complex</span>
            <button>Child</button>
          </div>
        </Tooltip>
      ));
      
      expect(getByText("Complex")).toBeInTheDocument();
      expect(getByText("Child")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("tooltip");
    });

    it("combines multiple modifiers correctly", () => {
      const { container } = render(() => (
        <Tooltip tip="Test" position="bottom" color="primary" open={true}>
          <span>Test</span>
        </Tooltip>
      ));
      
      expect(container.firstChild).toHaveClass("tooltip");
      expect(container.firstChild).toHaveClass("tooltip-bottom");
      expect(container.firstChild).toHaveClass("tooltip-primary");
      expect(container.firstChild).toHaveClass("tooltip-open");
    });
  });
});
