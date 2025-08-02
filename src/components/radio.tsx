import { JSX, mergeProps, splitProps, createMemo } from "solid-js";

/**
 * Props for the Radio component.
 *
 * @property {string} [name] - The name attribute for the radio input (used for grouping radios together).
 * @property {string} [value] - The value of the radio input that will be submitted with the form.
 * @property {boolean} [checked] - Whether the radio is currently selected/checked state.
 * @property {boolean} [disabled] - Whether the radio is disabled and non-interactive.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size variant using official DaisyUI radio size classes (radio-xs, radio-sm, radio-lg).
 * @property {'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'} [color] - The color variant using official DaisyUI radio color classes.
 * @property {string} [class] - Additional CSS classes to apply to the radio input.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {(event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => void} [onChange] - Event handler called when the radio selection changes.
 * @property {(event: FocusEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => void} [onFocus] - Event handler called when the radio receives focus.
 * @property {(event: FocusEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => void} [onBlur] - Event handler called when the radio loses focus.
 * @property {string} [aria-label] - ARIA label for accessibility when no visible label is present.
 * @property {string} [aria-describedby] - References to elements that describe the radio for accessibility.
 * @property {string} [id] - Unique identifier for the radio input element.
 * @property {number} [tabIndex] - Tab order for keyboard navigation (defaults to 0).
 * @property {boolean} [required] - Whether the radio selection is required for form validation.
 * @property {string} [form] - Associates the radio with a form element by form ID.
 */
export interface RadioProps {
  name?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "info"
    | "error";
  class?: string;
  classList?: Record<string, boolean>;
  onChange?: (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => void;
  onFocus?: (
    event: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => void;
  onBlur?: (
    event: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
  id?: string;
  tabIndex?: number;
  required?: boolean;
  form?: string;
}

/**
 * Radio component provides a customizable radio input element with DaisyUI styling.
 * 
 * Follows official DaisyUI Radio component patterns for consistent styling and behavior.
 * Supports all official DaisyUI radio features including color variants, sizes, and accessibility.
 * 
 * **Usage Example:**
 * ```tsx
 * // Basic radio group
 * <Radio name="option" value="1" />
 * <Radio name="option" value="2" checked />
 * 
 * // With colors and sizes
 * <Radio name="colors" value="primary" color="primary" size="lg" />
 * <Radio name="colors" value="success" color="success" size="sm" />
 * 
 * // With event handling
 * <Radio 
 *   name="interactive" 
 *   value="option1" 
 *   onChange={(e) => console.log('Selected:', e.target.value)}
 *   aria-label="Choose option 1"
 * />
 * ```
 * 
 * **Accessibility Features:**
 * - Full keyboard navigation support (Tab, Space, Arrow keys)
 * - ARIA attributes for screen readers
 * - Semantic HTML structure with proper radio input behavior
 * - Focus management and keyboard event handling
 * - Form integration with proper name grouping
 * 
 * **DaisyUI Integration:**
 * - Uses official DaisyUI radio classes (radio, radio-{size}, radio-{color})
 * - Supports all DaisyUI color variants (primary, secondary, accent, success, warning, info, error)  
 * - Supports all DaisyUI size variants (xs, sm, md, lg)
 * - Compatible with DaisyUI themes and customization
 *
 * @param {RadioProps} props - The properties to configure the Radio component
 * @returns {JSX.Element} The rendered Radio component
 */
export default function Radio(props: RadioProps): JSX.Element {
  const defaultProps = {
    size: "md" as const,
    tabIndex: 0,
    disabled: false,
    checked: false,
  };

  const mergedProps = mergeProps(defaultProps, props);

  // Split props to separate native input props from custom ones
  const [local, inputProps] = splitProps(mergedProps, [
    "size",
    "color",
    "class",
    "classList",
  ]);

  // Build DaisyUI classes with memoization for performance
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      radio: true,
    };

    // Add official DaisyUI size classes (skip md as it's default)
    if (local.size && local.size !== "md") {
      baseClasses[`radio-${local.size}`] = true;
    }

    // Add official DaisyUI color classes
    if (local.color) {
      baseClasses[`radio-${local.color}`] = true;
    }

    // Add custom class if provided
    if (local.class) {
      baseClasses[local.class] = true;
    }

    return baseClasses;
  });

  return (
    <input
      type="radio"
      role="radio"
      aria-checked={inputProps.checked}
      classList={{
        ...classes(),
        ...local.classList,
      }}
      {...inputProps}
    />
  );
}
