import { JSX } from "solid-js";

/**
 * Props for the Layout.Body component.
 *
 * @property {JSX.Element} [children] - The main body content (page content, components).
 * @property {string} [class] - Additional CSS classes to apply to the body.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface LayoutBodyProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Layout.Body component for creating the main body area within Layout.Content.
 * Contains the primary page content and provides consistent styling and spacing.
 * 
 * Automatically grows to fill available space and provides proper scrolling
 * behavior when content overflows.
 *
 * @param {LayoutBodyProps} props - The properties to configure the Body component.
 * @returns {JSX.Element} The rendered Body component.
 */
export default function LayoutBody(props: LayoutBodyProps): JSX.Element {
  // Build classes for body styling
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      "flex-1": true,
      "overflow-auto": true,
      "bg-base-50": true,
      "p-6": true,
    };

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