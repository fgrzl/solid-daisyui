import { JSX, createMemo } from "solid-js";

/**
 * Props for the Link component.
 *
 * @property {JSX.Element} [children] - The content to display inside the link.
 * @property {string} [class] - Additional CSS classes to apply to the link.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error' | 'info'} [variant] - The color variant of the link, which determines its styling using official DaisyUI classes.
 * @property {boolean} [hover] - If true, applies link-hover class for enhanced hover effects.
 * @property {boolean} [underline] - If false, applies no-underline class to remove text decoration.
 * @property {string} [href] - The URL that the link points to. When provided, renders as a navigation link.
 * @property {string} [target] - Where to display the linked URL (e.g., '_blank' for new window).
 * @property {string} [rel] - Relationship between current document and linked document.
 * @property {boolean} [disabled] - If true, disables the link and prevents interactions.
 * @property {number} [tabIndex] - Tab order for keyboard navigation. Defaults to 0.
 * @property {string} [aria-label] - Accessible label for screen readers.
 * @property {string} [aria-describedby] - ID of element that describes the link.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler.
 */
export interface LinkProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  variant?: "primary" | "secondary" | "accent" | "neutral" | "success" | "warning" | "error" | "info";
  hover?: boolean;
  underline?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  tabIndex?: number;
  "aria-label"?: string;
  "aria-describedby"?: string;
  onClick?: (event: MouseEvent) => void;
}

/**
 * Link component for creating styled navigation and button-like links.
 * Follows official DaisyUI Link component patterns for consistent styling and behavior.
 * 
 * Supports all official DaisyUI link features including color variants, hover effects,
 * accessibility features, and both navigation links (with href) and button-like links.
 * 
 * The component automatically handles security attributes for external links and
 * provides comprehensive keyboard navigation support.
 *
 * @param {LinkProps} props - The properties to configure the Link component.
 * @returns {JSX.Element} The rendered Link component.
 */
export default function Link(props: LinkProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      link: true,
    };

    // Add official DaisyUI color variant classes
    if (props.variant) {
      baseClasses[`link-${props.variant}`] = true;
    }

    // Add official DaisyUI hover class
    if (props.hover) {
      baseClasses["link-hover"] = true;
    }

    // Add no-underline class when underline is explicitly false
    if (props.underline === false) {
      baseClasses["no-underline"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle security for external links
  const computedRel = createMemo(() => {
    if (props.target === "_blank") {
      const securityRel = "noopener noreferrer";
      if (props.rel) {
        return `${props.rel} ${securityRel}`;
      }
      return securityRel;
    }
    return props.rel;
  });

  // Handle click events with proper event handling and keyboard support
  const handleClick = (event: MouseEvent) => {
    if (props.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    props.onClick?.(event);
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.disabled) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Create a synthetic mouse event for onClick handler
      const syntheticEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      props.onClick?.(syntheticEvent);
    }
  };

  // Determine accessibility attributes
  const role = props.href ? "link" : "button";
  const tabIndex = props.disabled ? -1 : (props.tabIndex ?? 0);

  return (
    <a
      href={props.href}
      target={props.target}
      rel={computedRel()}
      role={role}
      tabindex={tabIndex}
      aria-disabled={props.disabled ? "true" : undefined}
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </a>
  );
}

// Named export for compatibility with star exports
export { Link };
