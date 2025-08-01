import { JSX, createSignal, createEffect, splitProps } from "solid-js";

/**
 * Props for the Checkbox component.
 *
 * @property {boolean} [checked] - Controls the checked state of the checkbox (controlled component).
 * @property {boolean} [defaultChecked] - Sets the initial checked state for uncontrolled component.
 * @property {boolean} [indeterminate] - Sets the checkbox to indeterminate state (partially checked).
 * @property {boolean} [disabled] - Whether the checkbox is disabled.
 * @property {boolean} [readOnly] - Whether the checkbox is read-only.
 * @property {boolean} [required] - Whether the checkbox is required for form validation.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - DaisyUI size variant for the checkbox.
 * @property {"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"} [color] - DaisyUI color variant for the checkbox.
 * @property {string} [name] - Name attribute for form submission.
 * @property {string} [value] - Value attribute for form submission.
 * @property {string} [form] - Associates the checkbox with a form element.
 * @property {string} [class] - Additional CSS classes to apply to the checkbox.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [id] - Custom ID for the checkbox element.
 * @property {number} [tabIndex] - Tab order for keyboard navigation. Defaults to 0.
 * @property {string} ["aria-label"] - Accessible label for screen readers.
 * @property {string} ["aria-labelledby"] - ID of element that labels this checkbox.
 * @property {string} ["aria-describedby"] - ID of element that describes this checkbox.
 * @property {boolean} ["aria-required"] - Indicates if the checkbox is required.
 * @property {boolean} ["aria-invalid"] - Indicates if the checkbox has validation errors.
 * @property {(event: Event) => void} [onChange] - Callback fired when the checked state changes.
 * @property {(event: FocusEvent) => void} [onFocus] - Callback fired when the checkbox receives focus.
 * @property {(event: FocusEvent) => void} [onBlur] - Callback fired when the checkbox loses focus.
 */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  name?: string;
  value?: string;
  form?: string;
  class?: string;
  classList?: Record<string, boolean>;
  id?: string;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  "aria-invalid"?: boolean;
  onChange?: (event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

/**
 * Checkbox component for creating styled checkboxes with DaisyUI design system.
 * 
 * Follows official DaisyUI Checkbox component patterns with support for sizes, colors,
 * and various states (checked, indeterminate, disabled). Implements WCAG 2.1 AA
 * accessibility standards with proper ARIA attributes and keyboard navigation.
 * 
 * Supports both controlled and uncontrolled usage patterns:
 * - Controlled: Pass `checked` prop to control state externally
 * - Uncontrolled: Pass `defaultChecked` for initial state, component manages state internally
 * 
 * @param {CheckboxProps} props - The properties to configure the Checkbox component.
 * @returns {JSX.Element} The rendered Checkbox component.
 */
export default function Checkbox(props: CheckboxProps): JSX.Element {
  // Split props to separate DOM props from custom props
  const [local, others] = splitProps(props, [
    "checked", "defaultChecked", "indeterminate", "disabled", "readOnly", "required",
    "size", "color", "class", "classList", "onChange", "onFocus", "onBlur"
  ]);

  // Internal state for uncontrolled mode
  const [internalChecked, setInternalChecked] = createSignal(local.defaultChecked ?? false);
  
  // Determine if this is controlled or uncontrolled
  const isControlled = () => local.checked !== undefined;
  const checkedValue = () => isControlled() ? local.checked : internalChecked();

  let checkboxRef: HTMLInputElement | undefined;

  // Handle indeterminate state changes
  createEffect(() => {
    if (checkboxRef) {
      checkboxRef.indeterminate = local.indeterminate ?? false;
    }
  });

  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      checkbox: true,
    };

    // Add DaisyUI size classes
    if (local.size) {
      baseClasses[`checkbox-${local.size}`] = true;
    }

    // Add DaisyUI color classes
    if (local.color) {
      baseClasses[`checkbox-${local.color}`] = true;
    }

    // Add custom class if provided
    if (local.class) {
      // Handle multiple classes in a single string
      local.class.split(' ').forEach(cls => {
        if (cls.trim()) {
          baseClasses[cls.trim()] = true;
        }
      });
    }

    return baseClasses;
  };

  // Handle change events
  const handleChange = (event: Event) => {
    // Don't handle change if disabled or readonly
    if (local.disabled || local.readOnly) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLInputElement;
    
    // Update internal state for uncontrolled mode
    if (!isControlled()) {
      setInternalChecked(target.checked);
    }

    // Call user-provided onChange handler
    local.onChange?.(event);
  };

  // Handle keyboard events
  const handleKeyDown = (event: KeyboardEvent) => {
    // Space key should toggle checkbox (preventDefault to avoid page scroll)
    if (event.key === " ") {
      event.preventDefault();
      // Trigger change event when Space is pressed
      if (!local.disabled && !local.readOnly) {
        const changeEvent = new Event("change", { bubbles: true });
        Object.defineProperty(changeEvent, "target", {
          value: checkboxRef,
          enumerable: true
        });
        handleChange(changeEvent);
      }
    }
  };

  // Handle focus events
  const handleFocus = (event: FocusEvent) => {
    local.onFocus?.(event);
  };

  // Handle blur events
  const handleBlur = (event: FocusEvent) => {
    local.onBlur?.(event);
  };

  return (
    <input
      ref={checkboxRef}
      type="checkbox"
      checked={checkedValue()}
      disabled={local.disabled}
      readOnly={local.readOnly}
      required={local.required}
      tabIndex={others.tabIndex ?? 0}
      classList={{
        ...classes(),
        ...local.classList,
      }}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...others}
    />
  );
}
