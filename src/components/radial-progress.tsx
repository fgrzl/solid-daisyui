import { JSX, mergeProps } from "solid-js";

/**
 * Props for the RadialProgress component.
 */
export interface RadialProgressProps {
  /** The progress value (0-100) */
  value: number;
  /** Content to display inside the progress circle (typically percentage text) */
  children?: JSX.Element;
  /** Additional CSS classes */
  class?: string;
  /** Dynamic class list for conditional styling */
  classList?: Record<string, boolean>;
  /** Size of the radial progress */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Color variant */
  color?: "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
  /** Custom thickness of the progress ring */
  thickness?: string;
  /** Custom size (overrides size prop) */
  customSize?: string;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ID attribute */
  id?: string;
}

/**
 * The RadialProgress component displays a circular progress indicator with DaisyUI styling.
 * 
 * @param {RadialProgressProps} props - The properties to configure the RadialProgress component.
 * @returns {JSX.Element} The rendered RadialProgress component.
 */
export default function RadialProgress(props: RadialProgressProps): JSX.Element {
  const defaultProps = {
    value: 0,
    size: "md" as const,
  };

  const mergedProps = mergeProps(defaultProps, props);

  // Clamp value between 0 and 100
  const clampedValue = () => Math.max(0, Math.min(100, mergedProps.value));

  const sizeClasses: Record<string, string> = {
    xs: "text-xs",
    sm: "text-sm", 
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const colorClasses: Record<string, string> = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-error",
  };

  const classes = () => ({
    "radial-progress": true,
    [sizeClasses[mergedProps.size]]: true,
    [colorClasses[mergedProps.color || ""]]: !!mergedProps.color,
    ...(mergedProps.class ? { [mergedProps.class]: true } : {}),
  });

  const styles = () => {
    const baseStyles: Record<string, string | number> = {
      "--value": clampedValue(),
    };

    if (mergedProps.thickness) {
      baseStyles["--thickness"] = mergedProps.thickness;
    }

    if (mergedProps.customSize) {
      baseStyles["--size"] = mergedProps.customSize;
    }

    return baseStyles;
  };

  return (
    <div
      id={mergedProps.id}
      role="progressbar"
      aria-valuenow={clampedValue()}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={mergedProps["aria-label"] || `${clampedValue()}% complete`}
      style={styles()}
      classList={{
        ...classes(),
        ...mergedProps.classList,
      }}
    >
      {mergedProps.children}
    </div>
  );
}
