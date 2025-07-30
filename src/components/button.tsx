import { JSX, mergeProps } from "solid-js";

/**
 * Props for the Button component.
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
 * The Button component provides a customizable button element with DaisyUI styling.
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
