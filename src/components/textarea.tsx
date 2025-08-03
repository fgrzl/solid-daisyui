import { JSX, createSignal, createMemo, createUniqueId, mergeProps, splitProps } from "solid-js";

/**
 * Props for the Textarea component.
 *
 * @property {string} [value] - The current value of the textarea (controlled mode).
 * @property {string} [defaultValue] - The default value of the textarea (uncontrolled mode).
 * @property {(value: string, event: Event) => void} [onChange] - Callback fired when the textarea value changes.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the textarea using official DaisyUI classes (textarea-xs, textarea-sm, textarea-md, textarea-lg).
 * @property {"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"} [variant] - The color variant using official DaisyUI classes (textarea-primary, textarea-secondary, etc.).
 * @property {boolean} [bordered] - Whether to apply the textarea-bordered class for bordered styling. Defaults to true.
 * @property {boolean} [ghost] - Whether to apply the textarea-ghost class for ghost styling.
 * @property {boolean} [disabled] - Whether the textarea is disabled.
 * @property {boolean} [required] - Whether the textarea is required.
 * @property {boolean} [readonly] - Whether the textarea is readonly.
 * @property {string} [placeholder] - Placeholder text for the textarea.
 * @property {string} [class] - Additional CSS classes to apply to the textarea.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [name] - The name attribute for the textarea.
 * @property {string} [id] - The id attribute for the textarea.
 * @property {number} [rows] - The rows attribute for the textarea height.
 * @property {number} [cols] - The cols attribute for the textarea width.
 * @property {number} [maxlength] - The maximum length of the textarea value.
 * @property {number} [minlength] - The minimum length of the textarea value.
 * @property {string} [aria-label] - Accessible label for the textarea.
 * @property {string} [aria-describedby] - ID of element that describes the textarea.
 * @property {(event: FocusEvent) => void} [onFocus] - Callback fired when the textarea gains focus.
 * @property {(event: FocusEvent) => void} [onBlur] - Callback fired when the textarea loses focus.
 * @property {(event: KeyboardEvent) => void} [onKeyDown] - Callback fired when a key is pressed down.
 * @property {(event: KeyboardEvent) => void} [onKeyUp] - Callback fired when a key is released.
 * @property {HTMLTextAreaElement | ((el: HTMLTextAreaElement) => void)} [ref] - Reference to the textarea element.
 * @property {string | JSX.Element} [hint] - Validation or help message to display below the textarea.
 * @property {"error" | "success" | "warning" | "info"} [state] - Validation state that determines textarea styling and hint appearance.
 * @property {string | JSX.Element} [label] - Main label to display above the textarea.
 * @property {string | JSX.Element} [altLabel] - Alternative label to display in the top-right.
 */
export interface TextareaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: Event) => void;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  bordered?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  class?: string;
  classList?: Record<string, boolean>;
  name?: string;
  id?: string;
  rows?: number;
  cols?: number;
  maxlength?: number;
  minlength?: number;
  "aria-label"?: string;
  "aria-describedby"?: string;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  ref?: HTMLTextAreaElement | ((el: HTMLTextAreaElement) => void);
  hint?: string | JSX.Element;
  state?: "error" | "success" | "warning" | "info";
  label?: string | JSX.Element;
  altLabel?: string | JSX.Element;
}

/**
 * Textarea component for capturing multi-line user text input with full DaisyUI styling support and integrated validation.
 * 
 * Follows official DaisyUI Textarea component patterns with support for all variants, sizes,
 * and state modifiers. Implements WCAG 2.1 AA accessibility standards with proper ARIA 
 * attributes and keyboard navigation support.
 * 
 * Supports both controlled and uncontrolled modes:
 * - Controlled: Use `value` prop with `onChange` callback
 * - Uncontrolled: Use `defaultValue` prop and access value via ref
 * 
 * When validation props (hint, state, label, altLabel) are provided, automatically creates
 * proper DaisyUI form-control markup with labels and hint messages.
 * 
 * @param {TextareaProps} props - The properties to configure the Textarea component.
 * @returns {JSX.Element} The rendered Textarea component.
 */
export default function Textarea(props: TextareaProps): JSX.Element {
  const merged = mergeProps({ bordered: true }, props);
  
  // Generate unique ID for hint message association
  const hintId = createUniqueId();
  
  // Split props into textarea-specific and our custom props
  const [local, textareaProps] = splitProps(merged, [
    "value",
    "defaultValue", 
    "onChange",
    "size",
    "variant",
    "bordered",
    "ghost",
    "class",
    "classList",
    "ref",
    "hint",
    "state",
    "label",
    "altLabel"
  ]);

  // Handle controlled vs uncontrolled mode
  const [internalValue, setInternalValue] = createSignal(local.defaultValue || "");
  const isControlled = () => local.value !== undefined;
  
  // Memoize current value calculation for performance
  const currentValue = createMemo(() => 
    isControlled() ? (local.value || "") : internalValue()
  );

  // Determine the effective variant based on state or variant prop
  const effectiveVariant = createMemo(() => local.state || local.variant);

  // Determine if we should show hint message
  const shouldShowHint = createMemo(() => 
    local.hint && local.hint !== ""
  );

  // Determine if we should show labels
  const shouldShowLabels = createMemo(() => 
    local.label || local.altLabel
  );

  // Determine if we need form-control wrapper
  const needsWrapper = createMemo(() => 
    shouldShowLabels() || shouldShowHint()
  );

  // Memoize class calculation to avoid recreating object on every render
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      textarea: true,
    };

    // Add official DaisyUI size classes
    if (local.size) {
      baseClasses[`textarea-${local.size}`] = true;
    }

    // Add official DaisyUI color variant classes (use effective variant)
    if (effectiveVariant()) {
      baseClasses[`textarea-${effectiveVariant()}`] = true;
    }

    // Add official DaisyUI state modifier classes
    if (local.bordered) {
      baseClasses["textarea-bordered"] = true;
    }

    if (local.ghost) {
      baseClasses["textarea-ghost"] = true;
    }

    // Add custom class if provided
    if (local.class) {
      baseClasses[local.class] = true;
    }

    return baseClasses;
  });

  // Handle textarea change events
  const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    const newValue = target.value;

    // Update internal state for uncontrolled mode
    if (!isControlled()) {
      setInternalValue(newValue);
    }

    // Call onChange callback if provided
    local.onChange?.(newValue, event);
  };

  // Simplified ref handling
  const handleRef = (el: HTMLTextAreaElement) => {
    if (typeof local.ref === "function") {
      local.ref(el);
    }
  };

  // Determine aria-describedby for accessibility
  const ariaDescribedBy = createMemo(() => {
    const existingDescribedBy = (textareaProps as any)["aria-describedby"];
    if (shouldShowHint()) {
      return existingDescribedBy ? `${existingDescribedBy} ${hintId}` : hintId;
    }
    return existingDescribedBy;
  });

  // Create the textarea element
  const textareaElement = (
    <textarea
      {...textareaProps}
      ref={handleRef}
      value={currentValue()}
      onInput={handleInput}
      classList={{
        ...classes(),
        ...local.classList,
      }}
      aria-invalid={effectiveVariant() === "error" ? "true" : undefined}
      aria-describedby={ariaDescribedBy()}
    />
  );

  // If no wrapper is needed, return just the textarea
  if (!needsWrapper()) {
    return textareaElement;
  }

  // Return textarea wrapped in form-control with labels and hint
  return (
    <div class="form-control">
      {/* Labels */}
      {shouldShowLabels() && (
        <div class="label">
          {local.label && (
            <span class="label-text">{local.label}</span>
          )}
          {local.altLabel && (
            <span class="label-text-alt">{local.altLabel}</span>
          )}
        </div>
      )}
      
      {/* Textarea */}
      {textareaElement}
      
      {/* Hint message */}
      {shouldShowHint() && (
        <div class="label">
          <span 
            class="label-text-alt"
            id={hintId}
          >
            {local.hint}
          </span>
        </div>
      )}
    </div>
  );
}
