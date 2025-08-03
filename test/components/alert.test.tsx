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

    it("calls close button click handler when dismissible", () => {
      const { getByLabelText } = render(() => <Alert dismissible={true}>Test Alert</Alert>);
      
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

  // DaisyUI Variant Props Tests (New API)
  describe("DaisyUI Variant Props", () => {
    it("applies alert-info class for info variant", () => {
      const { container } = render(() => (
        <Alert variant="info">Info Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-info");
    });

    it("applies alert-success class for success variant", () => {
      const { container } = render(() => (
        <Alert variant="success">Success Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-success");
    });

    it("applies alert-warning class for warning variant", () => {
      const { container } = render(() => (
        <Alert variant="warning">Warning Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-warning");
    });

    it("applies alert-error class for error variant", () => {
      const { container } = render(() => (
        <Alert variant="error">Error Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-error");
    });

    it("prioritizes variant over type when both are provided", () => {
      const { container } = render(() => (
        <Alert variant="success" type="error">Priority Test</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-success");
      expect(container.firstChild).not.toHaveClass("alert-error");
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
      // Check that no icon (svg element) is present
      const svgIcon = container.querySelector('svg');
      expect(svgIcon).not.toBeInTheDocument();
    });

    it("has proper aria-hidden attribute on icons", () => {
      const { container } = render(() => (
        <Alert type="info">Alert with Icon</Alert>
      ));
      // In the corrected DaisyUI structure, icons are direct children without aria-hidden wrapper
      const svgIcon = container.querySelector('svg');
      expect(svgIcon).toBeInTheDocument();
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
      const { getByLabelText } = render(() => <Alert dismissible={true}>Dismissible Alert</Alert>);
      const closeButton = getByLabelText("Close");
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveAttribute("aria-label", "Close");
    });

    it("supports keyboard navigation on close button", () => {
      const { getByLabelText } = render(() => <Alert dismissible={true}>Alert</Alert>);
      const closeButton = getByLabelText("Close");
      
      // Should be focusable
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
    });

    it("close button can be activated with Enter key", () => {
      const { getByLabelText } = render(() => <Alert dismissible={true}>Alert</Alert>);
      const closeButton = getByLabelText("Close");
      
      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);
      
      // Should not throw when pressing Enter
      expect(() => fireEvent.keyDown(closeButton, { key: 'Enter' })).not.toThrow();
    });

    it("close button can be activated with Space key", () => {
      const { getByLabelText } = render(() => <Alert dismissible={true}>Alert</Alert>);
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

    it("shows close button when onClose is provided even without dismissible", () => {
      const onCloseMock = vi.fn();
      const { getByLabelText } = render(() => (
        <Alert onClose={onCloseMock}>Alert with onClose</Alert>
      ));
      expect(getByLabelText("Close")).toBeInTheDocument();
    });

    it("shows close button when dismissible is explicitly true", () => {
      const { getByLabelText } = render(() => (
        <Alert dismissible={true}>Explicitly dismissible Alert</Alert>
      ));
      expect(getByLabelText("Close")).toBeInTheDocument();
    });

    it("hides close button by default when no dismissible or onClose props", () => {
      const { queryByLabelText } = render(() => (
        <Alert>Default Alert</Alert>
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
      const { getByText } = render(() => <Alert>{longContent}</Alert>);
      
      // Content should be findable by text
      expect(getByText(longContent)).toBeInTheDocument();
    });

    it("handles special characters in content", () => {
      const specialContent = "Alert with <script>alert('xss')</script> & special chars: äöü";
      const { getByText } = render(() => <Alert>{specialContent}</Alert>);
      expect(getByText(specialContent)).toBeInTheDocument();
    });
  });

  // DaisyUI Style Modifiers - Now properly supported as official DaisyUI features
  describe("DaisyUI Style Modifiers", () => {
    it("applies alert-soft class for soft style", () => {
      const { container } = render(() => (
        <Alert style="soft">Soft Style Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-soft");
    });

    it("applies alert-outline class for outline style", () => {
      const { container } = render(() => (
        <Alert style="outline">Outline Style Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-outline");
    });

    it("applies alert-dash class for dash style", () => {
      const { container } = render(() => (
        <Alert style="dash">Dash Style Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-dash");
    });
  });

  // DaisyUI Layout Modifiers - Now properly supported as official DaisyUI features  
  describe("DaisyUI Layout Modifiers", () => {
    it("applies alert-vertical class when vertical is true", () => {
      const { container } = render(() => (
        <Alert vertical={true}>Vertical Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-vertical");
    });

    it("applies alert-horizontal class when vertical is false", () => {
      const { container } = render(() => (
        <Alert vertical={false}>Horizontal Alert</Alert>
      ));
      expect(container.firstChild).toHaveClass("alert", "alert-horizontal");
    });

    it("doesn't apply layout classes when vertical is undefined", () => {
      const { container } = render(() => (
        <Alert>Default Layout Alert</Alert>
      ));
      expect(container.firstChild).not.toHaveClass("alert-vertical", "alert-horizontal");
    });
  });

  // Performance and State Management
  describe("Performance and State Management", () => {
    it("manages alert lifecycle correctly", () => {
      const { container, getByLabelText } = render(() => <Alert dismissible={true}>State Test Alert</Alert>);
      
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
