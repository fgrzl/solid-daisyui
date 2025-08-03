import { JSX, createSignal, createEffect, For, Show } from "solid-js";

/**
 * Option type for individual select options.
 * 
 * @property {string} value - The value of the option.
 * @property {string} label - The display text for the option.
 * @property {boolean} [disabled] - Whether the option is disabled.
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Option group type for grouped select options.
 * 
 * @property {string} label - The group label.
 * @property {SelectOption[]} options - The options in the group.
 */
export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

/**
 * Props for the Select component.
 *
 * @property {(SelectOption | SelectOptionGroup)[]} options - The options to display in the select.
 * @property {string} [value] - The current selected value (controlled mode).
 * @property {string} [defaultValue] - The default selected value (uncontrolled mode).
 * @property {string} [placeholder] - Placeholder text to display when no option is selected.
 * @property {string} [class] - Additional CSS classes to apply to the select.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size variant using official DaisyUI classes.
 * @property {"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error"} [variant] - The color variant using official DaisyUI classes.
 * @property {boolean} [bordered] - Whether to apply bordered styling (select-bordered).
 * @property {boolean} [ghost] - Whether to apply ghost styling (select-ghost).
 * @property {boolean} [disabled] - Whether the select is disabled.
 * @property {boolean} [required] - Whether the select is required for form validation.
 * @property {string} [name] - The name attribute for form submission.
 * @property {string} [aria-label] - ARIA label for accessibility.
 * @property {string} [aria-describedby] - ARIA describedby attribute for accessibility.
 * @property {(value: string) => void} [onChange] - Callback fired when the selection changes.
 */
export interface SelectProps {
  options?: (SelectOption | SelectOptionGroup)[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  class?: string;
  classList?: Record<string, boolean>;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  bordered?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  onChange?: (value: string) => void;
}

/**
 * Select component for creating dropdown selection controls with DaisyUI styling.
 * 
 * Follows DaisyUI Select component patterns with support for all official variants,
 * sizes, and styling options. Implements WCAG 2.1 AA accessibility standards with
 * proper ARIA attributes, keyboard navigation, and semantic structure.
 * 
 * Supports both controlled and uncontrolled modes, option groups, disabled options,
 * and comprehensive error handling for edge cases.
 *
 * @param {SelectProps} props - The properties to configure the Select component.
 * @returns {JSX.Element} The rendered Select component.
 */
export default function Select(props: SelectProps): JSX.Element {
  // Handle both controlled and uncontrolled modes
  const [internalValue, setInternalValue] = createSignal(props.defaultValue || "");
  const isControlled = () => props.value !== undefined;
  const currentValue = () => isControlled() ? props.value! : internalValue();

  // Update internal value when defaultValue changes
  createEffect(() => {
    if (!isControlled() && props.defaultValue !== undefined) {
      setInternalValue(props.defaultValue);
    }
  });

  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      select: true,
    };

    // Add DaisyUI size classes
    if (props.size) {
      baseClasses[`select-${props.size}`] = true;
    }

    // Add DaisyUI color variant classes
    if (props.variant) {
      baseClasses[`select-${props.variant}`] = true;
    }

    // Add DaisyUI style modifier classes
    if (props.bordered) {
      baseClasses["select-bordered"] = true;
    }

    if (props.ghost) {
      baseClasses["select-ghost"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle change event
  const handleChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const newValue = target.value;

    // Update internal state if not controlled
    if (!isControlled()) {
      setInternalValue(newValue);
    }

    // Call onChange callback if provided
    props.onChange?.(newValue);
  };

  // Helper function to check if an item is an option group
  const isOptionGroup = (item: SelectOption | SelectOptionGroup): item is SelectOptionGroup => {
    return 'options' in item;
  };

  // Render option element
  const renderOption = (option: SelectOption) => (
    <option 
      value={option.value} 
      disabled={option.disabled}
    >
      {option.label}
    </option>
  );

  // Render option group
  const renderOptionGroup = (group: SelectOptionGroup) => (
    <optgroup label={group.label} role="group">
      <For each={group.options}>
        {renderOption}
      </For>
    </optgroup>
  );

  // Ensure options is always an array
  const safeOptions = () => props.options || [];

  return (
    <select
      role="combobox"
      value={currentValue()}
      onChange={handleChange}
      disabled={props.disabled}
      required={props.required}
      name={props.name}
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
      tabIndex={0}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {/* Placeholder option */}
      <Show when={props.placeholder}>
        <option value="" disabled selected={currentValue() === ""}>
          {props.placeholder}
        </option>
      </Show>

      {/* Render options */}
      <For each={safeOptions()}>
        {(item) => (
          <Show 
            when={isOptionGroup(item)}
            fallback={renderOption(item as SelectOption)}
          >
            {renderOptionGroup(item as SelectOptionGroup)}
          </Show>
        )}
      </For>
    </select>
  );
}
