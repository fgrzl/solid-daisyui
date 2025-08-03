import { JSX } from "solid-js";

/**
 * Props for the Layout.Header component.
 *
 * @property {JSX.Element} [children] - The header content (breadcrumbs, page title, actions).
 * @property {string} [class] - Additional CSS classes to apply to the header.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface LayoutHeaderProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Layout.Header component for creating the header area within Layout.Content.
 * Typically contains page titles, breadcrumbs, search bars, or other header content.
 * 
 * Provides consistent styling and spacing for content headers across different
 * layout variants while maintaining flexibility for custom content.
 *
 * @param {LayoutHeaderProps} props - The properties to configure the Header component.
 * @returns {JSX.Element} The rendered Header component.
 */
export default function LayoutHeader(props: LayoutHeaderProps): JSX.Element {
  // Build classes for header styling
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      "bg-base-100": true,
      "border-b": true,
      "border-base-300": true,
      "px-6": true,
      "py-4": true,
      "flex": true,
      "items-center": true,
      "justify-between": true,
      "min-h-16": true,
    };

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <header
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </header>
  );
}