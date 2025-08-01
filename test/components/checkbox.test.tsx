import { fireEvent, render } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Checkbox from "@/components/checkbox";

describe("Checkbox Component", () => {
  // Basic Rendering Tests
  describe("Basic Rendering", () => {
    it("renders with base checkbox class", () => {
      const { container } = render(() => <Checkbox />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass("checkbox");
    });

    it("renders with proper semantic structure", () => {
      const { getByRole } = render(() => <Checkbox />);
      const checkbox = getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    it("applies custom class prop", () => {
      const { container } = render(() => <Checkbox class="custom-class" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox");
      expect(checkbox).toHaveClass("custom-class");
    });

    it("applies dynamic classList prop", () => {
      const { container } = render(() => 
        <Checkbox classList={{ "dynamic-class": true, "false-class": false }} />
      );
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("dynamic-class");
      expect(checkbox).not.toHaveClass("false-class");
    });

    it("supports controlled checked state", () => {
      const { getByRole } = render(() => <Checkbox checked={true} />);
      const checkbox = getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it("supports uncontrolled default checked state", () => {
      const { getByRole } = render(() => <Checkbox defaultChecked={true} />);
      const checkbox = getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  // DaisyUI Size Variants Tests
  describe("DaisyUI Size Variants", () => {
    it("applies checkbox-xs class for xs size", () => {
      const { container } = render(() => <Checkbox size="xs" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-xs");
    });

    it("applies checkbox-sm class for sm size", () => {
      const { container } = render(() => <Checkbox size="sm" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-sm");
    });

    it("applies checkbox-md class for md size", () => {
      const { container } = render(() => <Checkbox size="md" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-md");
    });

    it("applies checkbox-lg class for lg size", () => {
      const { container } = render(() => <Checkbox size="lg" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-lg");
    });

    it("does not apply size class when no size specified", () => {
      const { container } = render(() => <Checkbox />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox");
      expect(checkbox).not.toHaveClass("checkbox-xs");
      expect(checkbox).not.toHaveClass("checkbox-sm");
      expect(checkbox).not.toHaveClass("checkbox-md");
      expect(checkbox).not.toHaveClass("checkbox-lg");
    });
  });

  // DaisyUI Color Variants Tests
  describe("DaisyUI Color Variants", () => {
    it("applies checkbox-primary class for primary variant", () => {
      const { container } = render(() => <Checkbox color="primary" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-primary");
    });

    it("applies checkbox-secondary class for secondary variant", () => {
      const { container } = render(() => <Checkbox color="secondary" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-secondary");
    });

    it("applies checkbox-accent class for accent variant", () => {
      const { container } = render(() => <Checkbox color="accent" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-accent");
    });

    it("applies checkbox-info class for info variant", () => {
      const { container } = render(() => <Checkbox color="info" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-info");
    });

    it("applies checkbox-success class for success variant", () => {
      const { container } = render(() => <Checkbox color="success" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-success");
    });

    it("applies checkbox-warning class for warning variant", () => {
      const { container } = render(() => <Checkbox color="warning" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-warning");
    });

    it("applies checkbox-error class for error variant", () => {
      const { container } = render(() => <Checkbox color="error" />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox-error");
    });

    it("does not apply color class when no color specified", () => {
      const { container } = render(() => <Checkbox />);
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox");
      expect(checkbox).not.toHaveClass("checkbox-primary");
      expect(checkbox).not.toHaveClass("checkbox-secondary");
      expect(checkbox).not.toHaveClass("checkbox-accent");
    });
  });

  // Checkbox States Tests
  describe("Checkbox States", () => {
    it("supports disabled state", () => {
      const { getByRole } = render(() => <Checkbox disabled={true} />);
      const checkbox = getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
    });

    it("supports indeterminate state", () => {
      const { getByRole } = render(() => <Checkbox indeterminate={true} />);
      const checkbox = getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
    });

    it("can be both checked and indeterminate", () => {
      const { getByRole } = render(() => 
        <Checkbox checked={true} indeterminate={true} />
      );
      const checkbox = getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
      expect(checkbox.indeterminate).toBe(true);
    });

    it("handles readonly state", () => {
      const { getByRole } = render(() => <Checkbox readOnly={true} />);
      const checkbox = getByRole("checkbox") as HTMLInputElement;
      expect(checkbox.readOnly).toBe(true);
    });
  });

  // User Interactions Tests
  describe("User Interactions", () => {
    it("calls onChange when clicked", () => {
      const handleChange = vi.fn();
      const { getByRole } = render(() => <Checkbox onChange={handleChange} />);
      const checkbox = getByRole("checkbox");
      
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("passes event to onChange handler", () => {
      const handleChange = vi.fn();
      const { getByRole } = render(() => <Checkbox onChange={handleChange} />);
      const checkbox = getByRole("checkbox");
      
      fireEvent.click(checkbox);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
    });

    it("does not call onChange when disabled", () => {
      const handleChange = vi.fn();
      const { getByRole } = render(() => 
        <Checkbox onChange={handleChange} disabled={true} />
      );
      const checkbox = getByRole("checkbox");
      
      fireEvent.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("does not call onChange when readonly", () => {
      const handleChange = vi.fn();
      const { getByRole } = render(() => 
        <Checkbox onChange={handleChange} readOnly={true} />
      );
      const checkbox = getByRole("checkbox");
      
      fireEvent.click(checkbox);
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("supports keyboard navigation with Space key", () => {
      const handleChange = vi.fn();
      const { getByRole } = render(() => <Checkbox onChange={handleChange} />);
      const checkbox = getByRole("checkbox");
      
      fireEvent.keyDown(checkbox, { key: " ", code: "Space" });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("supports onFocus and onBlur events", () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const { getByRole } = render(() => 
        <Checkbox onFocus={handleFocus} onBlur={handleBlur} />
      );
      const checkbox = getByRole("checkbox");
      
      fireEvent.focus(checkbox);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      
      fireEvent.blur(checkbox);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  // Accessibility Tests
  describe("Accessibility", () => {
    it("supports aria-label", () => {
      const { getByRole } = render(() => 
        <Checkbox aria-label="Accept terms" />
      );
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-label", "Accept terms");
    });

    it("supports aria-labelledby", () => {
      const { getByRole } = render(() => 
        <Checkbox aria-labelledby="label-id" />
      );
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-labelledby", "label-id");
    });

    it("supports aria-describedby", () => {
      const { getByRole } = render(() => 
        <Checkbox aria-describedby="description-id" />
      );
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-describedby", "description-id");
    });

    it("supports aria-required", () => {
      const { getByRole } = render(() => 
        <Checkbox aria-required={true} />
      );
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-required", "true");
    });

    it("supports aria-invalid", () => {
      const { getByRole } = render(() => 
        <Checkbox aria-invalid={true} />
      );
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    });

    it("has proper tabIndex for keyboard navigation", () => {
      const { getByRole } = render(() => <Checkbox />);
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("tabIndex", "0");
    });

    it("supports custom tabIndex", () => {
      const { getByRole } = render(() => <Checkbox tabIndex={-1} />);
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("tabIndex", "-1");
    });
  });

  // Form Integration Tests
  describe("Form Integration", () => {
    it("supports name attribute for form submission", () => {
      const { getByRole } = render(() => <Checkbox name="terms" />);
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("name", "terms");
    });

    it("supports value attribute", () => {
      const { getByRole } = render(() => <Checkbox value="accepted" />);
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("value", "accepted");
    });

    it("supports form attribute", () => {
      const { getByRole } = render(() => <Checkbox form="my-form" />);
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("form", "my-form");
    });

    it("supports required attribute", () => {
      const { getByRole } = render(() => <Checkbox required={true} />);
      const checkbox = getByRole("checkbox");
      expect(checkbox).toHaveAttribute("required");
    });
  });

  // Edge Cases and Error Handling
  describe("Edge Cases", () => {
    it("handles missing props gracefully", () => {
      expect(() => render(() => <Checkbox />)).not.toThrow();
    });

    it("handles null onChange gracefully", () => {
      const { getByRole } = render(() => <Checkbox />);
      const checkbox = getByRole("checkbox");
      expect(() => fireEvent.click(checkbox)).not.toThrow();
    });

    it("handles undefined onChange gracefully", () => {
      const { getByRole } = render(() => <Checkbox onChange={undefined} />);
      const checkbox = getByRole("checkbox");
      expect(() => fireEvent.click(checkbox)).not.toThrow();
    });

    it("combines size and color variants correctly", () => {
      const { container } = render(() => 
        <Checkbox size="lg" color="primary" />
      );
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox");
      expect(checkbox).toHaveClass("checkbox-lg");
      expect(checkbox).toHaveClass("checkbox-primary");
    });

    it("applies multiple custom classes correctly", () => {
      const { container } = render(() => 
        <Checkbox 
          class="custom-1 custom-2" 
          classList={{ "dynamic-1": true, "dynamic-2": true }} 
        />
      );
      const checkbox = container.querySelector('input[type="checkbox"]');
      expect(checkbox).toHaveClass("checkbox");
      expect(checkbox).toHaveClass("custom-1");
      expect(checkbox).toHaveClass("custom-2");
      expect(checkbox).toHaveClass("dynamic-1");
      expect(checkbox).toHaveClass("dynamic-2");
    });
  });
});
