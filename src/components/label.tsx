import { JSX, Show } from "solid-js";

/**
 * Props for the Label component.
 *
 * @property {JSX.Element | string} [children] - The content to display inside the label.
 * @property {string} [class] - Additional CSS classes to apply to the label.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [for] - The ID of the form control this label is associated with.
 * @property {"basic" | "floating"} [variant] - The label variant - "basic" for standard label styling, "floating" for floating label behavior.
 * @property {string} [size] - Size hint for floating labels when associated with form controls (xs, sm, md, lg, xl).
 * @property {boolean} [required] - Whether to show a required indicator.
 * @property {boolean} [optional] - Whether to show an optional indicator (ignored if required is true).
 * @property {string} [aria-label] - Accessibility label for the label element.
 * @property {string} [aria-describedby] - ID of element that describes this label.
 * @property {string} [role] - ARIA role override for the label element.
 * @property {number} [tabIndex] - Tab index for keyboard navigation.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler.
 * @property {(event: FocusEvent) => void} [onFocus] - Focus event handler.
 * @property {(event: FocusEvent) => void} [onBlur] - Blur event handler.
 * @property {(event: KeyboardEvent) => void} [onKeyDown] - Keyboard event handler.
 */
export interface LabelProps {
  children?: JSX.Element | string;
  class?: string;
  classList?: Record<string, boolean>;
  for?: string;
  variant?: "basic" | "floating";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  required?: boolean;
  optional?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
  onClick?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

/**
 * Label component for providing context and accessibility for form controls.
 * Follows DaisyUI Label component patterns with support for basic and floating label variants.
 * Implements WCAG 2.1 AA accessibility standards with proper semantic structure and ARIA attributes.
 *
 * Supports both explicit association via `for` attribute and implicit association via nesting.
 * The floating variant provides modern Material Design-style floating label behavior.
 *
 * @param {LabelProps} props - The properties to configure the Label component.
 * @returns {JSX.Element} The rendered Label component.
 */
export default function Label(props: LabelProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {};

    // Apply variant-specific classes
    if (props.variant === "floating") {
      baseClasses["floating-label"] = true;
    } else {
      // Default to basic label variant
      baseClasses["label"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Build label attributes
  const labelAttributes = () => {
    const attributes: Record<string, any> = {};

    // Add htmlFor attribute if provided
    if (props.for) {
      attributes["for"] = props.for;
    }

    // Add ARIA attributes
    if (props["aria-label"]) {
      attributes["aria-label"] = props["aria-label"];
    }
    if (props["aria-describedby"]) {
      attributes["aria-describedby"] = props["aria-describedby"];
    }
    if (props.role) {
      attributes["role"] = props.role;
    }
    if (props.tabIndex !== undefined) {
      attributes["tabindex"] = props.tabIndex;
    }

    // Add event handlers
    if (props.onClick) {
      attributes["onClick"] = props.onClick;
    }
    if (props.onFocus) {
      attributes["onFocus"] = props.onFocus;
    }
    if (props.onBlur) {
      attributes["onBlur"] = props.onBlur;
    }
    if (props.onKeyDown) {
      attributes["onKeyDown"] = props.onKeyDown;
    }

    return attributes;
  };

  // Render required indicator
  const RequiredIndicator = () => (
    <span class="label-required" aria-label="required">
      *
    </span>
  );

  // Render optional indicator
  const OptionalIndicator = () => (
    <span class="label-optional" aria-label="optional">
      (optional)
    </span>
  );

  // For floating labels, wrap content in span
  if (props.variant === "floating") {
    return (
      <label
        classList={{
          ...classes(),
          ...props.classList,
        }}
        {...labelAttributes()}
      >
        <span>{props.children}</span>
        <Show when={props.required}>
          <RequiredIndicator />
        </Show>
        <Show when={props.optional && !props.required}>
          <OptionalIndicator />
        </Show>
      </label>
    );
  }

  // Basic label variant
  return (
    <label
      classList={{
        ...classes(),
        ...props.classList,
      }}
      {...labelAttributes()}
    >
      {props.children}
      <Show when={props.required}>
        <RequiredIndicator />
      </Show>
      <Show when={props.optional && !props.required}>
        <OptionalIndicator />
      </Show>
    </label>
  );
}

// Additional exports for convenience
export { Label };
