import { JSX, mergeProps } from "solid-js";

/**
 * Props for the Loading component.
 *
 * @property {string} [class] - Additional CSS classes to apply to the loading component.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size of the loading indicator.
 * @property {'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'} [type] - The type of loading animation.
 * @property {string} [color] - The color of the loading indicator (DaisyUI color classes).
 */
export interface LoadingProps {
  class?: string;
  classList?: Record<string, boolean>;
  size?: "xs" | "sm" | "md" | "lg";
  type?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
  color?: string;
}

/**
 * The Loading component displays an animated loading indicator with various styles and sizes.
 *
 * @param {LoadingProps} props - The properties to configure the Loading component.
 * @returns {JSX.Element} The rendered Loading component.
 */
export default function Loading(inputProps: LoadingProps = {}): JSX.Element {
  const props = mergeProps({ type: "spinner", size: "md" }, inputProps);

  const sizeClasses: Record<string, string> = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
  };

  const typeClasses: Record<string, string> = {
    spinner: "loading-spinner",
    dots: "loading-dots",
    ring: "loading-ring",
    ball: "loading-ball",
    bars: "loading-bars",
    infinity: "loading-infinity",
  };

  const classes = () => ({
    loading: true,
    [typeClasses[props.type]]: true,
    [sizeClasses[props.size]]: true,
    [props.color || ""]: !!props.color,
    ...(props.class ? { [props.class]: true } : {}),
  });

  return (
    <span
      role="status"
      aria-label="Loading"
      classList={{
        ...classes(),
        ...props.classList,
      }}
    />
  );
}
