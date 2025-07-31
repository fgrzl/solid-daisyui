import { JSX, Show, For, createMemo } from "solid-js";

/**
 * Props for individual breadcrumb items.
 * @deprecated Use CrumbLink component instead for better composability.
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
 * @property {BreadcrumbItem[]} [items] - Array of breadcrumb items to display. Deprecated: use CrumbLink children instead.
 * @property {JSX.Element} [children] - Breadcrumb content as CrumbLink components or custom JSX children.
 * @property {string | JSX.Element} [separator] - Custom separator between breadcrumb items. Defaults to "/" character. Only used with items prop.
 * @property {string} [class] - Additional CSS classes to apply to the breadcrumbs container.
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
 * **Recommended Usage**: Use with CrumbLink children for better composability:
 * ```tsx
 * <Breadcrumbs>
 *   <CrumbLink href="/">Home</CrumbLink>
 *   <CrumbLink href="/products">Products</CrumbLink>
 *   <CrumbLink current>Current Page</CrumbLink>
 * </Breadcrumbs>
 * ```
 * 
 * **Legacy Usage**: Items prop is deprecated but still supported for backward compatibility:
 * ```tsx
 * <Breadcrumbs items={[
 *   { label: "Home", href: "/" },
 *   { label: "Products", href: "/products" },
 *   { label: "Current Page", current: true }
 * ]} />
 * ```
 * 
 * @param {BreadcrumbsProps} props - The breadcrumbs component props
 * @returns {JSX.Element} JSX element representing the breadcrumbs navigation
 */
export default function Breadcrumbs(props: BreadcrumbsProps): JSX.Element {
  // Memoize classes calculation for better performance
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      breadcrumbs: true,
    };

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  // For backward compatibility with items prop - render with separators
  const renderLegacyItems = () => {
    // Memoize separator to avoid recreating on each render
    const separator = createMemo(() => {
      if (typeof props.separator === "string") {
        return props.separator;
      }
      if (props.separator) {
        return props.separator;
      }
      return "/";
    });

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

      // Common props for aria-current
      const commonProps = item.current ? { "aria-current": "page" as const } : {};

      // Render as link if href is provided
      if (item.href) {
        return (
          <a href={item.href} {...commonProps}>
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
            {...commonProps}
          >
            {item.label || ""}
          </button>
        );
      }
      
      // Render as span for current/static items
      return (
        <span {...commonProps}>
          {item.label || ""}
        </span>
      );
    };

    return (
      <For each={props.items}>
        {(item, index) => (
          <li>
            {renderItem(item)}
            <Show when={index() < (props.items?.length || 0) - 1}>
              <span aria-hidden="true">{separator()}</span>
            </Show>
          </li>
        )}
      </For>
    );
  };

  return (
    <div
      role="navigation"
      aria-label={props.ariaLabel || "Breadcrumb"}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      <ul>
        <Show when={props.items && props.items.length > 0} fallback={props.children}>
          {renderLegacyItems()}
        </Show>
      </ul>
    </div>
  );
}
