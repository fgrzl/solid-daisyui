import { JSX } from "solid-js";
import { useLayoutContext } from "./layout";

/**
 * Props for the Layout.Content component.
 *
 * @property {JSX.Element} [children] - The main content (Header and Body components).
 * @property {string} [class] - Additional CSS classes to apply to the content area.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface LayoutContentProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Layout.Content component for creating the main content area within a Layout.
 * Automatically adapts its structure and spacing based on the parent Layout's
 * variant and navigation state.
 * 
 * Provides the container for Layout.Header and Layout.Body components with
 * proper responsive behavior and DaisyUI styling.
 *
 * @param {LayoutContentProps} props - The properties to configure the Content component.
 * @returns {JSX.Element} The rendered Content component.
 */
export default function LayoutContent(props: LayoutContentProps): JSX.Element {
  const context = useLayoutContext();
  
  // Build classes based on layout variant
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      "flex-1": true,
      "flex": true,
      "flex-col": true,
    };

    // Apply variant-specific classes
    if (context.variant === "left" || context.variant === "right") {
      baseClasses["drawer-content"] = true;
    } else if (context.variant === "top") {
      baseClasses["pt-16"] = true; // Account for fixed navbar
    } else if (context.variant === "bottom") {
      baseClasses["pb-16"] = true; // Account for fixed navbar
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <main
      classList={{
        ...classes(),
        ...props.classList,
      }}
      role="main"
    >
      {props.children}
    </main>
  );
}