import { JSX } from "solid-js";
import { useLayoutContext } from "./layout";

/**
 * Props for the Layout.NavHeader component.
 *
 * @property {JSX.Element} [children] - The header content (logo, branding, toggle button).
 * @property {string} [class] - Additional CSS classes to apply to the nav header.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface LayoutNavHeaderProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Layout.NavHeader component for creating the header area within navigation.
 * Typically contains branding, logo, and navigation toggle controls.
 * 
 * Adapts its layout based on the parent Layout's variant and provides
 * consistent styling across different navigation patterns.
 *
 * @param {LayoutNavHeaderProps} props - The properties to configure the NavHeader component.
 * @returns {JSX.Element} The rendered NavHeader component.
 */
export default function LayoutNavHeader(props: LayoutNavHeaderProps): JSX.Element {
  const context = useLayoutContext();
  
  // Build classes based on layout variant
  const classes = () => {
    const baseClasses: Record<string, boolean> = {};

    // Apply variant-specific classes
    if (context.variant === "left" || context.variant === "right") {
      baseClasses["flex"] = true;
      baseClasses["items-center"] = true;
      baseClasses["justify-between"] = true;
      baseClasses["p-4"] = true;
      baseClasses["border-b"] = true;
      baseClasses["border-base-300"] = true;
    } else if (context.variant === "top" || context.variant === "bottom") {
      baseClasses["navbar-start"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <div
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </div>
  );
}