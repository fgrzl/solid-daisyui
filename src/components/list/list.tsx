import { JSX, createMemo } from "solid-js";

/**
 * Props for the List component.
 *
 * @property {JSX.Element} [children] - The list items to display inside the list.
 * @property {string} [class] - Additional CSS classes to apply to the list.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"numbered" | "disc" | "none"} [variant] - The visual style of the list - numbered, disc, or none.
 * @property {"xs" | "sm" | "lg" | "xl"} [size] - The size variant of the list items.
 * @property {boolean} [hover] - If true, applies hover effects to the list.
 * @property {string} [style] - Inline styles to apply to the list.
 * @property {string} [aria-label] - Accessibility label for the list.
 * @property {string} [aria-labelledby] - ID of element that labels this list.
 * @property {string} [id] - Unique identifier for the list element.
 */
export interface ListProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  variant?: "numbered" | "disc" | "none";
  size?: "xs" | "sm" | "lg" | "xl";
  hover?: boolean;
  style?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
}

/**
 * List component for displaying styled lists with various DaisyUI variants and configurations.
 * Follows official DaisyUI List component patterns for consistent styling and behavior.
 * 
 * Supports different list styles (numbered, disc, none), size variants, and hover effects.
 * Implements proper semantic HTML structure with accessibility features.
 * 
 * @param {ListProps} props - The properties to configure the List component.
 * @returns {JSX.Element} The rendered List component.
 */
export default function List(props: ListProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      list: true,
    };

    // Add official DaisyUI variant classes
    if (props.variant) {
      baseClasses[`list-${props.variant}`] = true;
    }

    // Add official DaisyUI size classes
    if (props.size) {
      baseClasses[`list-${props.size}`] = true;
    }

    // Add hover effects
    if (props.hover) {
      baseClasses["hover:list-disc"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  return (
    <ul
      id={props.id}
      style={props.style}
      aria-label={props["aria-label"]}
      aria-labelledby={props["aria-labelledby"]}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </ul>
  );
}
