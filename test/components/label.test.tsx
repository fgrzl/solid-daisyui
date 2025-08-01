import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Label from "@/components/label";

describe("Label Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders a label element with text content", () => {
      const { getByText } = render(() => <Label>Test Label</Label>);
      const labelElement = getByText("Test Label");
      expect(labelElement).toBeInTheDocument();
      expect(labelElement.tagName).toBe("LABEL");
    });

    it("renders with base label class by default", () => {
      const { container } = render(() => <Label>Test Label</Label>);
      expect(container.firstChild).toHaveClass("label");
    });

    it("applies htmlFor attribute when for prop is provided", () => {
      const { container } = render(() => (
        <Label for="test-input">Test Label</Label>
      ));
      expect(container.firstChild).toHaveAttribute("for", "test-input");
    });

    it("renders without content when no children provided", () => {
      const { container } = render(() => <Label for="test-input" />);
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("label");
    });
  });

  // DaisyUI Class Variants Tests
  describe("DaisyUI Class Variants", () => {
    it("applies label class by default", () => {
      const { container } = render(() => <Label>Default Label</Label>);
      expect(container.firstChild).toHaveClass("label");
    });

    it("applies floating-label class when variant is floating", () => {
      const { container } = render(() => (
        <Label variant="floating">Floating Label</Label>
      ));
      expect(container.firstChild).toHaveClass("floating-label");
      expect(container.firstChild).not.toHaveClass("label");
    });

    it("maintains basic label variant by default", () => {
      const { container } = render(() => (
        <Label variant="basic">Basic Label</Label>
      ));
      expect(container.firstChild).toHaveClass("label");
      expect(container.firstChild).not.toHaveClass("floating-label");
    });
  });

  // Custom Classes and Styling Tests
  describe("Custom Classes and Styling", () => {
    it("applies custom class when class prop is provided", () => {
      const { container } = render(() => (
        <Label class="custom-class">Custom Label</Label>
      ));
      expect(container.firstChild).toHaveClass("label", "custom-class");
    });

    it("applies classList when provided", () => {
      const { container } = render(() => (
        <Label classList={{ active: true, inactive: false }}>
          Dynamic Label
        </Label>
      ));
      expect(container.firstChild).toHaveClass("label", "active");
      expect(container.firstChild).not.toHaveClass("inactive");
    });

    it("combines class and classList properly", () => {
      const { container } = render(() => (
        <Label class="base-class" classList={{ dynamic: true }}>
          Combined Label
        </Label>
      ));
      expect(container.firstChild).toHaveClass(
        "label",
        "base-class",
        "dynamic",
      );
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("has proper semantic structure with label element", () => {
      const { container } = render(() => <Label>Accessible Label</Label>);
      expect((container.firstChild as HTMLElement)?.tagName).toBe("LABEL");
    });

    it("supports aria-label attribute", () => {
      const { container } = render(() => (
        <Label aria-label="Custom aria label">Label Text</Label>
      ));
      expect(container.firstChild).toHaveAttribute(
        "aria-label",
        "Custom aria label",
      );
    });

    it("supports aria-describedby attribute", () => {
      const { container } = render(() => (
        <Label aria-describedby="description-id">Label with description</Label>
      ));
      expect(container.firstChild).toHaveAttribute(
        "aria-describedby",
        "description-id",
      );
    });

    it("supports role attribute override", () => {
      const { container } = render(() => (
        <Label role="button">Button-like label</Label>
      ));
      expect(container.firstChild).toHaveAttribute("role", "button");
    });

    it("supports tabindex for keyboard navigation", () => {
      const { container } = render(() => (
        <Label tabIndex={0}>Focusable Label</Label>
      ));
      expect(container.firstChild).toHaveAttribute("tabindex", "0");
    });
  });

  // Event Handling Tests
  describe("Event Handling", () => {
    it("handles onClick events", () => {
      const handleClick = vi.fn();
      const { getByText } = render(() => (
        <Label onClick={handleClick}>Clickable Label</Label>
      ));

      fireEvent.click(getByText("Clickable Label"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles onFocus events", () => {
      const handleFocus = vi.fn();
      const { container } = render(() => (
        <Label onFocus={handleFocus} tabIndex={0}>
          Focusable Label
        </Label>
      ));

      fireEvent.focus(container.firstChild!);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("handles onBlur events", () => {
      const handleBlur = vi.fn();
      const { container } = render(() => (
        <Label onBlur={handleBlur} tabIndex={0}>
          Blurable Label
        </Label>
      ));

      fireEvent.blur(container.firstChild!);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard events", () => {
      const handleKeyDown = vi.fn();
      const { container } = render(() => (
        <Label onKeyDown={handleKeyDown} tabIndex={0}>
          Keyboard Label
        </Label>
      ));

      fireEvent.keyDown(container.firstChild!, { key: "Enter" });
      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });

  // Text Content and Children Tests
  describe("Text Content and Children", () => {
    it("renders plain text children", () => {
      const { getByText } = render(() => <Label>Plain text label</Label>);
      expect(getByText("Plain text label")).toBeInTheDocument();
    });

    it("renders JSX element children", () => {
      const { getByText, container } = render(() => (
        <Label>
          <span class="emphasized">Emphasized text</span>
        </Label>
      ));
      expect(getByText("Emphasized text")).toBeInTheDocument();
      expect(container.querySelector(".emphasized")).toBeInTheDocument();
    });

    it("renders multiple children", () => {
      const { getByText } = render(() => (
        <Label>
          <span>First part</span>
          <span>Second part</span>
        </Label>
      ));
      expect(getByText("First part")).toBeInTheDocument();
      expect(getByText("Second part")).toBeInTheDocument();
    });
  });

  // Required and Optional Indicators Tests
  describe("Required and Optional Indicators", () => {
    it("shows required indicator when required prop is true", () => {
      const { container } = render(() => (
        <Label required>Required Label</Label>
      ));
      expect(container.querySelector(".label-required")).toBeInTheDocument();
    });

    it("shows optional indicator when optional prop is true", () => {
      const { container } = render(() => (
        <Label optional>Optional Label</Label>
      ));
      expect(container.querySelector(".label-optional")).toBeInTheDocument();
    });

    it("does not show indicators by default", () => {
      const { container } = render(() => <Label>Default Label</Label>);
      expect(
        container.querySelector(".label-required"),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector(".label-optional"),
      ).not.toBeInTheDocument();
    });

    it("required takes precedence over optional", () => {
      const { container } = render(() => (
        <Label required optional>
          Conflicting Label
        </Label>
      ));
      expect(container.querySelector(".label-required")).toBeInTheDocument();
      expect(
        container.querySelector(".label-optional"),
      ).not.toBeInTheDocument();
    });
  });

  // Error Handling and Edge Cases Tests
  describe("Error Handling and Edge Cases", () => {
    it("handles empty string children gracefully", () => {
      const { container } = render(() => <Label>{""}</Label>);
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("label");
    });

    it("handles null children gracefully", () => {
      const { container } = render(() => <Label>{null}</Label>);
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("label");
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(() => <Label>{undefined}</Label>);
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("label");
    });

    it("maintains functionality with minimal props", () => {
      const { container } = render(() => <Label />);
      expect(container.firstChild).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("label");
      expect((container.firstChild as HTMLElement)?.tagName).toBe("LABEL");
    });
  });

  // Form Association Tests
  describe("Form Association", () => {
    it("can be associated with form controls via for attribute", () => {
      const { container } = render(() => (
        <div>
          <Label for="username">Username</Label>
          <input id="username" type="text" />
        </div>
      ));
      const label = container.querySelector("label");
      expect(label).toHaveAttribute("for", "username");
    });

    it("can be associated via nesting (implicit association)", () => {
      const { container, getByText } = render(() => (
        <Label>
          Username
          <input type="text" />
        </Label>
      ));
      expect(getByText("Username")).toBeInTheDocument();
      expect(container.querySelector("input")).toBeInTheDocument();
      expect(container.querySelector("label")).toContainElement(
        container.querySelector("input"),
      );
    });
  });

  // Floating Label Specific Tests
  describe("Floating Label Variant", () => {
    it("wraps content in span when using floating variant", () => {
      const { container } = render(() => (
        <Label variant="floating">Floating Label Text</Label>
      ));
      expect(container.firstChild).toHaveClass("floating-label");
      expect(container.querySelector("span")).toBeInTheDocument();
    });

    it("supports input sizing classes for floating labels", () => {
      const { container } = render(() => (
        <Label variant="floating" size="lg">
          Large Floating Label
        </Label>
      ));
      expect(container.firstChild).toHaveClass("floating-label");
      // Size classes would be applied to contained inputs, not the label itself
    });
  });
});
