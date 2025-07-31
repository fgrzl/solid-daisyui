import { JSX, mergeProps } from "solid-js";

/**
 * Props for the Button component.
 *
 * @property {JSX.Element} [children] - The content to display inside the button.
 * @property {string} [class] - Additional CSS classes to apply to the button.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"button" | "submit" | "reset"} [type] - The type of button for form interaction.
 * @property {"primary" | "secondary" | "accent" | "ghost" | "link" | "info" | "success" | "warning" | "error"} [variant] - The visual variant of the button that determines its color scheme.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the button, with "md" being the default.
 * @property {"circle" | "square"} [shape] - The shape of the button for icon-only buttons.
 * @property {boolean} [outline] - If true, applies outline styling to the button.
 * @property {boolean} [wide] - If true, makes the button wider than normal.
 * @property {boolean} [block] - If true, makes the button take full width of its container.
 * @property {boolean} [active] - If true, applies active state styling to the button.
 * @property {boolean} [disabled] - If true, disables the button and prevents user interaction.
 * @property {boolean} [loading] - If true, shows a loading spinner and disables the button.
 * @property {JSX.Element} [startIcon] - Icon to display at the start of the button content.
 * @property {JSX.Element} [endIcon] - Icon to display at the end of the button content.
 * @property {(event: MouseEvent) => void} [onClick] - Event handler for button click events.
 * @property {(event: FocusEvent) => void} [onFocus] - Event handler for button focus events.
 * @property {(event: FocusEvent) => void} [onBlur] - Event handler for button blur events.
 * @property {string} [aria-label] - Accessible label for the button when text content is not descriptive enough.
 * @property {string} [aria-describedby] - ID of element that describes the button for screen readers.
 * @property {string} [id] - Unique identifier for the button element.
 * @property {number} [tabIndex] - Tab order of the button for keyboard navigation.
 */
export interface ButtonProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "ghost"
    | "link"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "xs" | "sm" | "md" | "lg";
  shape?: "circle" | "square";
  outline?: boolean;
  wide?: boolean;
  block?: boolean;
  active?: boolean;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
  onClick?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
  id?: string;
  tabIndex?: number;
}

/**
 * The Button component provides a customizable button element following DaisyUI design standards.
 * 
 * Supports all DaisyUI button variants, sizes, and modifiers including outline, wide, block, and shape options.
 * Includes accessibility features with proper ARIA attributes, keyboard navigation support, and screen reader compatibility.
 * Handles loading states with spinner indication and provides icon support at start and end positions.
 * 
 * @param {ButtonProps} props - The properties to configure the Button component.
 * @returns {JSX.Element} The rendered Button component.
 */
export default function Button(props: ButtonProps): JSX.Element {
  const defaultProps = {
    type: "button" as const,
    size: "md" as const,
    tabIndex: 0,
  };

  const mergedProps = mergeProps(defaultProps, props);

  const classes = () => ({
    btn: true,
    [`btn-${mergedProps.variant}`]: !!mergedProps.variant,
    [`btn-${mergedProps.size}`]: mergedProps.size !== "md",
    [`btn-${mergedProps.shape}`]: !!mergedProps.shape,
    "btn-outline": mergedProps.outline,
    "btn-wide": mergedProps.wide,
    "btn-block": mergedProps.block,
    "btn-active": mergedProps.active,
    "btn-disabled": mergedProps.disabled,
    loading: mergedProps.loading,
    ...(mergedProps.class ? { [mergedProps.class]: true } : {}),
  });

  const loadingSpinner = () => (
    <span class="loading loading-spinner loading-xs" aria-hidden="true"></span>
  );

  return (
    <button
      type={mergedProps.type}
      disabled={mergedProps.disabled || mergedProps.loading}
      onClick={mergedProps.onClick}
      onFocus={mergedProps.onFocus}
      onBlur={mergedProps.onBlur}
      aria-label={mergedProps["aria-label"]}
      aria-describedby={mergedProps["aria-describedby"]}
      aria-disabled={mergedProps.disabled || mergedProps.loading}
      aria-busy={mergedProps.loading}
      id={mergedProps.id}
      tabIndex={mergedProps.disabled ? -1 : mergedProps.tabIndex}
      classList={{
        ...classes(),
        ...mergedProps.classList,
      }}
    >
      {mergedProps.loading && loadingSpinner()}
      {mergedProps.startIcon && !mergedProps.loading && (
        <span class="btn-icon btn-icon-start" aria-hidden="true">
          {mergedProps.startIcon}
        </span>
      )}
      {mergedProps.children}
      {mergedProps.endIcon && !mergedProps.loading && (
        <span class="btn-icon btn-icon-end" aria-hidden="true">
          {mergedProps.endIcon}
        </span>
      )}
    </button>
  );
}
