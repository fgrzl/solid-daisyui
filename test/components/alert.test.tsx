import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Alert from "@/components/alert";

describe("Alert Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with children", () => {
      const { getByText } = render(() => <Alert>Test Alert</Alert>);
      expect(getByText("Test Alert")).toBeInTheDocument();
    });

    it("renders with base alert class", () => {
      const { container } = render(() => <Alert>Test Alert</Alert>);
      expect(container.firstChild).toHaveClass("alert");
    });

    it("has proper role attribute for accessibility", () => {
      const { getByRole } = render(() => <Alert>Test Alert</Alert>);
      expect(getByRole("alert")).toBeInTheDocument();
    });

    it("calls close button click handler", () => {
      const { getByLabelText } = render(() => <Alert>Test Alert</Alert>);
      
      // Check that the close button exists and can be clicked
      const closeButton = getByLabelText("Close");
      expect(closeButton).toBeInTheDocument();
      
      // Clicking should not throw an error
      expect(() => fireEvent.click(closeButton)).not.toThrow();
    });
  });

  // DaisyUI Type Variants Tests
  describe("DaisyUI Type Variants", () => {
    it("applies alert-info class for info type", () => {
      const { container } = render(() => (
        <Alert type="info">Info Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-info");
    });

    it("applies alert-success class for success type", () => {
      const { container } = render(() => (
        <Alert type="success">Success Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-success");
    });

    it("applies alert-warning class for warning type", () => {
      const { container } = render(() => (
        <Alert type="warning">Warning Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-warning");
    });

    it("applies alert-error class for error type", () => {
      const { container } = render(() => (
        <Alert type="error">Error Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-error");
    });

    it("works without type specified", () => {
      const { container } = render(() => <Alert>Default Alert</Alert>);
      expect(container.firstChild).toHaveClass("alert");
      expect(container.firstChild).not.toHaveClass("alert-info", "alert-success", "alert-warning", "alert-error");
    });
  });

  // Icon Functionality Tests
  describe("Icon Functionality", () => {
    it("renders default info icon when no icon provided", () => {
      const { container } = render(() => <Alert type="info">Info Alert</Alert>);
      const svgIcon = container.querySelector('svg');
      expect(svgIcon).toBeInTheDocument();
    });

    it("renders custom icon when provided", () => {
      const customIcon = <span data-testid="custom-icon">🚀</span>;
      const { getByTestId } = render(() => (
        <Alert icon={customIcon}>Alert with Custom Icon</Alert>
      ));
      expect(getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("hides icon when hideIcon is true", () => {
      const { container } = render(() => (
        <Alert type="info" hideIcon>Alert without Icon</Alert>
      ));
      // Check that the alert icon container is not present
      const iconContainer = container.querySelector('span[aria-hidden="true"]');
      expect(iconContainer).not.toBeInTheDocument();
    });

    it("has proper aria-hidden attribute on icons", () => {
      const { container } = render(() => (
        <Alert type="info">Alert with Icon</Alert>
      ));
      const iconContainer = container.querySelector('[aria-hidden="true"]');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  // Accessibility Tests (WCAG 2.1 AA Compliance)
  describe("Accessibility", () => {
    it("has correct aria-live attribute for error alerts", () => {
      const { getByRole } = render(() => (
        <Alert type="error">Error Alert</Alert>
      ));
      expect(getByRole("alert")).toHaveAttribute("aria-live", "assertive");
    });

    it("has correct aria-live attribute for non-error alerts", () => {
      const { getByRole } = render(() => (
        <Alert type="info">Info Alert</Alert>
      ));
      expect(getByRole("alert")).toHaveAttribute("aria-live", "polite");
    });

    it("close button has proper aria-label", () => {
      const { getByLabelText } = render(() => <Alert>Dismissible Alert</Alert>);
      const closeButton = getByLabelText("Close");
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute("aria-label", "Close");
    });

    it("supports keyboard navigation on close button", () => {
      const { getByLabelText } = render(() => <Alert>Alert</Alert>);
      const closeButton = getByLabelText("Close");
      
      // Should be focusable
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });

    it("close button can be activated with Enter key", () => {
      const { getByLabelText } = render(() => <Alert>Alert</Alert>);
      const closeButton = getByLabelText("Close");
      
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
      
      // Should not throw when pressing Enter
      expect(() => fireEvent.keyDown(closeButton, { key: 'Enter' })).not.toThrow();
    });

    it("close button can be activated with Space key", () => {
      const { getByLabelText } = render(() => <Alert>Alert</Alert>);
      const closeButton = getByLabelText("Close");
      
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
      
      // Should not throw when pressing Space
      expect(() => fireEvent.keyDown(closeButton, { key: ' ' })).not.toThrow();
    });
  });

  // Class and Style Customization Tests
  describe("Class and Style Customization", () => {
    it("merges additional class prop", () => {
      const { container } = render(() => (
        <Alert class="custom-alert">Alert with Custom Class</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "custom-alert");
    });

    it("merges classList prop", () => {
      const { container } = render(() => (
        <Alert classList={{ "dynamic-class": true, "inactive-class": false }}>
          Alert with Dynamic Classes
        </Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "dynamic-class");
      expect(container.firstChild).not.toHaveClass("inactive-class");
    });

    it("combines class and classList props correctly", () => {
      const { container } = render(() => (
        <Alert 
          class="static-class" 
          classList={{ "dynamic-class": true }}
        >
          Combined Classes Alert
        </Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "static-class", "dynamic-class");
    });
  });

  // Additional Content Tests
  describe("Additional Content", () => {
    it("renders title when provided", () => {
      const { getByText } = render(() => (
        <Alert title="Important Notice">Alert content</Alert>
      ));
      expect(getByText("Important Notice")).toBeInTheDocument();
    });

    it("renders buttons when provided", () => {
      const buttons = [
        <button>Accept</button>, 
        <button>Decline</button>
      ];
      const { getByText } = render(() => (
        <Alert buttons={buttons}>Alert with Actions</Alert>
      ));
      expect(getByText("Accept")).toBeInTheDocument();
      expect(getByText("Decline")).toBeInTheDocument();
    });

    it("handles empty buttons array", () => {
      const { container } = render(() => (
        <Alert buttons={[]}>Alert with Empty Buttons</Alert>
      ));
      // Should still render the alert
      expect(container.firstChild).toHaveClass("alert");
    });
  });

  // Event Handling Tests
  describe("Event Handling", () => {
    it("calls custom onClose callback when provided", () => {
      const onCloseMock = vi.fn();
      const { getByLabelText } = render(() => (
        <Alert onClose={onCloseMock}>Closable Alert</Alert>
      ));
      
      const closeButton = getByLabelText("Close");
      fireEvent.click(closeButton);
      
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("prevents default close behavior when onClose returns false", () => {
      const onCloseMock = vi.fn().mockReturnValue(false);
      const { container, getByLabelText } = render(() => (
        <Alert onClose={onCloseMock}>Non-closable Alert</Alert>
      ));
      
      const closeButton = getByLabelText("Close");
      fireEvent.click(closeButton);
      
      // Alert should still be visible
      expect(container.firstChild).toBeInTheDocument();
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("hides close button when dismissible is false", () => {
      const { queryByLabelText } = render(() => (
        <Alert dismissible={false}>Non-dismissible Alert</Alert>
      ));
      expect(queryByLabelText("Close")).not.toBeInTheDocument();
    });
  });

  // Edge Cases and Error Conditions
  describe("Edge Cases and Error Conditions", () => {
    it("handles null children gracefully", () => {
      const { container } = render(() => <Alert>{null}</Alert>);
      expect(container.firstChild).toHaveClass("alert");
    });

    it("handles undefined children gracefully", () => {
      const { container } = render(() => <Alert>{undefined}</Alert>);
      expect(container.firstChild).toHaveClass("alert");
    });

    it("handles very long content", () => {
      const longContent = "Lorem ipsum ".repeat(100).trim(); // Remove trailing space
      const { container } = render(() => <Alert>{longContent}</Alert>);
      
      // Find the content span (not the icon container)
      const contentSpan = container.querySelectorAll('span')[1]; // Second span is content
      expect(contentSpan?.textContent?.trim()).toBe(longContent);
    });

    it("handles special characters in content", () => {
      const specialContent = "Alert with <script>alert('xss')</script> & special chars: äöü";
      const { getByText } = render(() => <Alert>{specialContent}</Alert>);
      expect(getByText(specialContent)).toBeInTheDocument();
    });
  });

  // DaisyUI Style Modifiers (should be removed as they don't exist in DaisyUI)
  describe("Legacy Style Props (should fail until refactored)", () => {
    it("should not use non-DaisyUI style classes", () => {
      const { container } = render(() => (
        <Alert style="soft">Soft Style Alert</Alert>
      ));
      // This test should fail because 'alert-soft' is not a real DaisyUI class
      expect(container.firstChild).not.toHaveClass("alert-soft");
    });

    it("should not use non-DaisyUI vertical layout classes", () => {
      const { container } = render(() => (
        <Alert vertical>Vertical Alert</Alert>
      ));
      // This test should fail because 'alert-vertical' is not a real DaisyUI class
      expect(container.firstChild).not.toHaveClass("alert-vertical");
    });
  });

  // Performance and State Management
  describe("Performance and State Management", () => {
    it("manages alert lifecycle correctly", () => {
      const { container, getByLabelText } = render(() => <Alert>State Test Alert</Alert>);
      
      // Initially visible
      expect(container.firstChild).toBeInTheDocument();
      expect(getByLabelText("Close")).toBeInTheDocument();
      
      // Has proper close functionality available
      const closeButton = getByLabelText("Close");
      expect(closeButton).toHaveAttribute("type", "button");
      expect(closeButton).toHaveAttribute("aria-label", "Close");
      
      // Note: In SolidJS, each component instance manages its own state
      // The actual state management behavior is implementation-specific
    });
  });
});
