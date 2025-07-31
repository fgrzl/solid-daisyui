import { JSX, Show, For } from "solid-js";

/**
 * Props for individual breadcrumb items.
 *
 * @property {string} [label] - The text label to display for the breadcrumb item.
 * @property {string} [href] - The URL to link to when the breadcrumb item is clicked.
 * @property {() => void} [onClick] - Click handler for the breadcrumb item.
 * @property {boolean} [current] - Whether this item represents the current page (adds aria-current="page").
 * @property {JSX.Element} [element] - Custom JSX element to render instead of default label/link.
 */
export interface BreadcrumbItem {
  label?: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
  element?: JSX.Element;
}

/**
 * Props for the Breadcrumbs component.
 *
 * @property {BreadcrumbItem[]} [items] - Array of breadcrumb items to display.
 * @property {JSX.Element} [children] - Custom breadcrumb content as JSX children. Items prop takes precedence if both are provided.
 * @property {string | JSX.Element} [separator] - Custom separator between breadcrumb items. Defaults to "/" character.
 * @property {string} [class] - Additional CSS classes to apply to the breadcrumbs navigation.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [ariaLabel] - Custom aria-label for the navigation element. Defaults to "Breadcrumb".
 */
export interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  children?: JSX.Element;
  separator?: string | JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  ariaLabel?: string;
}

/**
 * Breadcrumbs component for displaying hierarchical navigation paths.
 * 
 * Follows DaisyUI Breadcrumbs component patterns with support for custom separators,
 * clickable items, and current page indicators. Implements WCAG 2.1 AA accessibility
 * standards with proper ARIA attributes and semantic HTML structure.
 * 
 * Supports both items-based configuration and custom JSX children for maximum flexibility.
 * When both items and children are provided, items take precedence.
 * 
 * @param {BreadcrumbsProps} props - The breadcrumbs component props
 * @returns {JSX.Element} JSX element representing the breadcrumbs navigation
 */
export default function Breadcrumbs(props: BreadcrumbsProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      breadcrumbs: true,
    };

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle keyboard events for clickable items
  const handleKeyDown = (event: KeyboardEvent, onClick?: () => void) => {
    if ((event.key === 'Enter' || event.key === ' ') && onClick) {
      event.preventDefault();
      onClick();
    }
  };

  // Render individual breadcrumb item
  const renderItem = (item: BreadcrumbItem) => {
    // If custom element is provided, use it
    if (item.element) {
      return item.element;
    }

    // Determine the item content based on props
    const itemProps: any = {};
    
    if (item.current) {
      itemProps["aria-current"] = "page";
    }

    // Render as link if href is provided
    if (item.href) {
      return (
        <a href={item.href} {...itemProps}>
          {item.label || ""}
        </a>
      );
    }
    
    // Render as button if onClick is provided
    if (item.onClick) {
      return (
        <button
          type="button"
          onClick={item.onClick}
          onKeyDown={(e) => handleKeyDown(e, item.onClick)}
          {...itemProps}
        >
          {item.label || ""}
        </button>
      );
    }
    
    // Render as span for current/static items
    return (
      <span {...itemProps}>
        {item.label || ""}
      </span>
    );
  };

  // Render separator between items
  const renderSeparator = () => {
    if (typeof props.separator === "string") {
      return props.separator;
    }
    if (props.separator) {
      return props.separator;
    }
    return "/";
  };

  return (
    <nav
      role="navigation"
      aria-label={props.ariaLabel || "Breadcrumb"}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      <ol role="list">
        <Show when={props.items && props.items.length > 0} fallback={props.children}>
          <For each={props.items}>
            {(item, index) => (
              <li>
                {renderItem(item)}
                <Show when={index() < (props.items?.length || 0) - 1}>
                  <span aria-hidden="true">{renderSeparator()}</span>
                </Show>
              </li>
            )}
          </For>
        </Show>
      </ol>
    </nav>
  );
}
