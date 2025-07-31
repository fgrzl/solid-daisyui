import { JSX } from "solid-js";

/**
 * Props for the Breadcrumb component.
 *
 * @property {JSX.Element} [children] - The content to display inside the breadcrumb link.
 * @property {string} [href] - The URL to link to when the breadcrumb item is clicked.
 * @property {() => void} [onClick] - Click handler for the breadcrumb item.
 * @property {boolean} [current] - Whether this item represents the current page (adds aria-current="page").
 * @property {string} [class] - Additional CSS classes to apply to the link element.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface BreadcrumbProps {
  children?: JSX.Element;
  href?: string;
  onClick?: () => void;
  current?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Breadcrumb component for individual breadcrumb items.
 * 
 * Renders as a list item (`<li>`) containing the appropriate navigation element.
 * Automatically uses solid-router's A component when inside a router context,
 * and falls back to regular anchor tags when no router is available.
 * Supports buttons with onClick, or static text for current page.
 * 
 * Designed to be used within a Breadcrumbs component container.
 * Provides seamless integration with solid-router while maintaining compatibility
 * outside of router contexts (useful for testing and standalone usage).
 * 
 * @param {BreadcrumbProps} props - The breadcrumb component props
 * @returns {JSX.Element} JSX element representing a breadcrumb list item
 */
export default function Breadcrumb(props: BreadcrumbProps): JSX.Element {

  // Handle keyboard events for clickable items
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && props.onClick) {
      // Call preventDefault only if onClick will be executed
      event.preventDefault();
      props.onClick();
    }
  };

  // Common props for aria-current
  const commonProps = props.current ? { "aria-current": "page" as const } : {};

  // Render the inner content based on props
  const renderContent = () => {
    // Render as link if href is provided
    if (props.href) {
      // Use regular anchor tag since router is peer dependency
      return (
        <a 
          href={props.href} 
          class={props.class}
          classList={props.classList}
          {...commonProps}
        >
          {props.children}
        </a>
      );
    }
    
    // Render as button if onClick is provided
    if (props.onClick) {
      return (
        <button
          type="button"
          onClick={props.onClick}
          onKeyDown={handleKeyDown}
          class={props.class}
          classList={props.classList}
          {...commonProps}
        >
          {props.children}
        </button>
      );
    }
    
    // Render as span for current/static items
    return (
      <span 
        class={props.class}
        classList={props.classList}
        {...commonProps}
      >
        {props.children}
      </span>
    );
  };

  return (
    <li>
      {renderContent()}
    </li>
  );
}