import { JSX, createSignal, createMemo, mergeProps, splitProps } from "solid-js";

/**
 * Props for the Input component.
 *
 * @property {string} [value] - The current value of the input (controlled mode).
 * @property {string} [defaultValue] - The default value of the input (uncontrolled mode).
 * @property {(value: string, event: Event) => void} [onChange] - Callback fired when the input value changes.
 * @property {"text" | "password" | "email" | "number" | "search" | "tel" | "url" | "date" | "datetime-local" | "month" | "time" | "week"} [type] - The type of input. Defaults to "text".
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the input using official DaisyUI classes (input-xs, input-sm, input-md, input-lg).
 * @property {"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"} [variant] - The color variant using official DaisyUI classes (input-primary, input-secondary, etc.).
 * @property {boolean} [bordered] - Whether to apply the input-bordered class for bordered styling.
 * @property {boolean} [ghost] - Whether to apply the input-ghost class for ghost styling.
 * @property {boolean} [disabled] - Whether the input is disabled.
 * @property {boolean} [required] - Whether the input is required.
 * @property {string} [placeholder] - Placeholder text for the input.
 * @property {string} [class] - Additional CSS classes to apply to the input.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [name] - The name attribute for the input.
 * @property {string} [id] - The id attribute for the input.
 * @property {string} [autocomplete] - The autocomplete attribute for the input.
 * @property {number} [maxlength] - The maximum length of the input value.
 * @property {number} [minlength] - The minimum length of the input value.
 * @property {string} [pattern] - The pattern attribute for input validation.
 * @property {string} [aria-label] - Accessible label for the input.
 * @property {string} [aria-describedby] - ID of element that describes the input.
 * @property {(event: FocusEvent) => void} [onFocus] - Callback fired when the input gains focus.
 * @property {(event: FocusEvent) => void} [onBlur] - Callback fired when the input loses focus.
 * @property {(event: KeyboardEvent) => void} [onKeyDown] - Callback fired when a key is pressed down.
 * @property {(event: KeyboardEvent) => void} [onKeyUp] - Callback fired when a key is released.
 * @property {HTMLInputElement} [ref] - Reference to the input element.
 */
export interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: Event) => void;
  type?: "text" | "password" | "email" | "number" | "search" | "tel" | "url" | "date" | "datetime-local" | "month" | "time" | "week";
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  bordered?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  class?: string;
  classList?: Record<string, boolean>;
  name?: string;
  id?: string;
  autocomplete?: string;
  maxlength?: number;
  minlength?: number;
  pattern?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void);
}

/**
 * Input component for capturing user text input with full DaisyUI styling support.
 * 
 * Follows official DaisyUI Input component patterns with support for all variants, sizes,
 * and state modifiers. Implements WCAG 2.1 AA accessibility standards with proper ARIA 
 * attributes and keyboard navigation support.
 * 
 * Supports both controlled and uncontrolled modes:
 * - Controlled: Use `value` prop with `onChange` callback
 * - Uncontrolled: Use `defaultValue` prop and access value via ref
 * 
 * @param {InputProps} props - The properties to configure the Input component.
 * @returns {JSX.Element} The rendered Input component.
 */
export default function Input(props: InputProps): JSX.Element {
  const merged = mergeProps({ type: "text" }, props);
  
  // Split props into input-specific and our custom props
  const [local, inputProps] = splitProps(merged, [
    "value",
    "defaultValue", 
    "onChange",
    "size",
    "variant",
    "bordered",
    "ghost",
    "class",
    "classList",
    "ref"
  ]);

  // Handle controlled vs uncontrolled mode
  const [internalValue, setInternalValue] = createSignal(local.defaultValue || "");
  const isControlled = () => local.value !== undefined;
  
  // Memoize current value calculation for performance
  const currentValue = createMemo(() => 
    isControlled() ? (local.value || "") : internalValue()
  );

  // Memoize class calculation to avoid recreating object on every render
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      input: true,
    };

    // Add official DaisyUI size classes
    if (local.size) {
      baseClasses[`input-${local.size}`] = true;
    }

    // Add official DaisyUI color variant classes
    if (local.variant) {
      baseClasses[`input-${local.variant}`] = true;
    }

    // Add official DaisyUI state modifier classes
    if (local.bordered) {
      baseClasses["input-bordered"] = true;
    }

    if (local.ghost) {
      baseClasses["input-ghost"] = true;
    }

    // Add custom class if provided
    if (local.class) {
      baseClasses[local.class] = true;
    }

    return baseClasses;
  });

  // Handle input change events
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;

    // Update internal state for uncontrolled mode
    if (!isControlled()) {
      setInternalValue(newValue);
    }

    // Call onChange callback if provided
    local.onChange?.(newValue, event);
  };

  // Simplified ref handling
  const handleRef = (el: HTMLInputElement) => {
    if (typeof local.ref === "function") {
      local.ref(el);
    }
  };

  return (
    <input
      {...inputProps}
      ref={handleRef}
      value={currentValue()}
      onInput={handleInput}
      classList={{
        ...classes(),
        ...local.classList,
      }}
      aria-invalid={local.variant === "error" ? "true" : undefined}
    />
  );
}
