import { JSX } from "solid-js";

/**
 * Props for the Badge component.
 *
 * @property {JSX.Element} [children] - The content to display inside the badge.
 * @property {string} [class] - Additional CSS classes to apply to the badge.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error" | "ghost" | "neutral"} [variant] - The color variant of the badge.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the badge.
 * @property {boolean} [outline] - Whether to use outline style.
 * @property {string} [aria-label] - Aria label for accessibility.
 * @property {string} [aria-describedby] - Aria describedby for accessibility.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler.
 */
export interface BadgeProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "ghost"
    | "neutral";
  size?: "xs" | "sm" | "md" | "lg";
  outline?: boolean;
  "aria-label"?: string;
  "aria-describedby"?: string;
  onClick?: (event: MouseEvent) => void;
}

/**
 * Badge component for displaying status indicators, labels, or short informational text.
 * Follows DaisyUI Badge component patterns with support for variants, sizes, and outline style.
 *
 * @param {BadgeProps} props - The properties to configure the Badge component.
 * @returns {JSX.Element} The rendered Badge component.
 */
export default function Badge(props: BadgeProps): JSX.Element {
  // Build badge classes - following Alert component pattern
  const classes = () => ({
    badge: true,
    [`badge-${props.variant}`]: !!props.variant,
    [`badge-${props.size}`]: !!props.size,
    "badge-outline": !!props.outline,
    ...(props.class ? { [props.class]: true } : {}),
  });

  return (
    <span
      role="status"
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
      classList={{
        ...classes(),
        ...props.classList,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </span>
  );
}
