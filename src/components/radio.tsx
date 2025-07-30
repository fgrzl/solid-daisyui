import { JSX, mergeProps, splitProps } from "solid-js";

/**
 * Props for the Radio component.
 */
export interface RadioProps {
  /** The name attribute for the radio input (used for grouping) */
  name?: string;
  /** The value of the radio input */
  value?: string;
  /** Whether the radio is checked */
  checked?: boolean;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** The size of the radio */
  size?: "xs" | "sm" | "md" | "lg";
  /** The color variant of the radio */
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "info"
    | "error";
  /** Additional CSS classes */
  class?: string;
  /** Dynamic class list for conditional styling */
  classList?: Record<string, boolean>;
  /** Event handler for when the radio value changes */
  onChange?: (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => void;
  /** Event handler for when the radio receives focus */
  onFocus?: (
    event: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => void;
  /** Event handler for when the radio loses focus */
  onBlur?: (
    event: FocusEvent & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
  ) => void;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA described by for accessibility */
  "aria-describedby"?: string;
  /** ID attribute */
  id?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Whether the radio is required in a form */
  required?: boolean;
  /** Form attribute to associate with a form element */
  form?: string;
}

/**
 * The Radio component provides a customizable radio input element with DaisyUI styling.
 *
 * @param props - The properties to configure the Radio component
 * @returns JSX.Element - The rendered Radio component
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

  const classes = () => ({
    radio: true,
    [`radio-${local.size}`]: local.size !== "md",
    [`radio-${local.color}`]: !!local.color,
    ...(local.class ? { [local.class]: true } : {}),
  });

  return (
    <input
      type="radio"
      classList={{
        ...classes(),
        ...local.classList,
      }}
      {...inputProps}
    />
  );
}
