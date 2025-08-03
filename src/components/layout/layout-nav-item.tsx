import { JSX } from "solid-js";
import Link, { LinkProps } from "../link";
import { useLayoutContext } from "./layout";

/**
 * Props for the Layout.NavItem component.
 *
 * @property {JSX.Element} [children] - The navigation item content.
 * @property {string} [class] - Additional CSS classes to apply to the nav item.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {JSX.Element} [icon] - An optional icon to display before the nav item text.
 * @property {string} [href] - The URL that the nav item links to. Uses smart Link component for router awareness.
 * @property {boolean} [active] - If true, applies active styling to indicate current page/section.
 * @property {() => void} [onClick] - Click event handler for nav items without href (like logout actions).
 */
export interface LayoutNavItemProps extends Omit<LinkProps, 'variant'> {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  icon?: JSX.Element;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Layout.NavItem component for creating navigation items within Layout.Nav.
 * Uses the smart Link component for router-aware navigation and supports
 * both navigation links and action items (like logout).
 * 
 * Automatically adapts its styling based on the parent Layout's variant
 * and provides consistent navigation patterns across different layouts.
 *
 * @param {LayoutNavItemProps} props - The properties to configure the NavItem component.
 * @returns {JSX.Element} The rendered NavItem component.
 */
export default function LayoutNavItem(props: LayoutNavItemProps): JSX.Element {
  const context = useLayoutContext();
  
  // Build classes based on layout variant and state
  const classes = () => {
    const baseClasses: Record<string, boolean> = {};

    // Apply variant-specific classes
    if (context.variant === "left" || context.variant === "right") {
      baseClasses["flex"] = true;
      baseClasses["items-center"] = true;
      baseClasses["gap-3"] = true;
      baseClasses["px-4"] = true;
      baseClasses["py-2"] = true;
      baseClasses["rounded-lg"] = true;
      baseClasses["hover:bg-base-300"] = true;
      baseClasses["transition-colors"] = true;
    } else if (context.variant === "top" || context.variant === "bottom") {
      // For navbar, inherit menu item styling
      baseClasses["btn"] = true;
      baseClasses["btn-ghost"] = true;
      baseClasses["justify-start"] = true;
    }

    // Apply active state
    if (props.active) {
      if (context.variant === "left" || context.variant === "right") {
        baseClasses["bg-primary"] = true;
        baseClasses["text-primary-content"] = true;
      } else {
        baseClasses["btn-active"] = true;
      }
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle click events
  const handleClick = (event: MouseEvent | KeyboardEvent) => {
    if (props.onClick) {
      event.preventDefault();
      props.onClick();
    }
  };

  // Content with optional icon
  const content = () => (
    <>
      {props.icon && (
        <span class="w-5 h-5 flex-shrink-0">
          {props.icon}
        </span>
      )}
      <span class="flex-1">{props.children}</span>
    </>
  );

  // For drawer variants, wrap in li element
  if (context.variant === "left" || context.variant === "right") {
    return (
      <li>
        <Link
          {...props}
          class={undefined} // Don't pass class to Link, we handle it here
          classList={{
            ...classes(),
            ...props.classList,
          }}
          onClick={handleClick}
        >
          {content()}
        </Link>
      </li>
    );
  }

  // For navbar variants, use direct Link
  return (
    <Link
      {...props}
      class={undefined} // Don't pass class to Link, we handle it here
      classList={{
        ...classes(),
        ...props.classList,
      }}
      onClick={handleClick}
    >
      {content()}
    </Link>
  );
}