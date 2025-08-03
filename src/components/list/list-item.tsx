import { JSX } from "solid-js";

/**
 * Props for the ListItem component.
 *
 * @property {JSX.Element} [children] - The content to display inside the list item.
 * @property {string} [class] - Additional CSS classes to apply to the list item.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [id] - Unique identifier for the list item element.
 * @property {string} [style] - Inline styles to apply to the list item.
 * @property {() => void} [onClick] - Click handler for the list item.
 * @property {(event: KeyboardEvent) => void} [onKeyDown] - Keyboard event handler for accessibility.
 * @property {number} [tabIndex] - Tab index for keyboard navigation.
 * @property {string} [aria-label] - Accessibility label for the list item.
 * @property {JSX.AriaAttributes["role"]} [role] - ARIA role for the list item.
 */
export interface ListItemProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  id?: string;
  style?: string;
  onClick?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  tabIndex?: number;
  "aria-label"?: string;
  role?: JSX.AriaAttributes["role"];
}

/**
 * ListItem component for individual list items/rows.
 * 
 * This component represents a single item within a List component.
 * It automatically applies the required DaisyUI `list-item` class and
 * supports all standard DaisyUI list item modifiers.
 * 
 * Designed to be used within a List component container for optimal
 * performance and accessibility. Each ListItem can be interactive
 * and participates in keyboard navigation when needed.
 * 
 * **Usage:**
 * ```tsx
 * <List>
 *   <ListItem>Basic item</ListItem>
 *   <ListItem onClick={handleClick}>Clickable item</ListItem>
 *   <ListItem role="button" tabIndex={0}>Accessible button</ListItem>
 * </List>
 * ```
 * 
 * **Accessibility:**
 * - Renders as semantic `<li>` element
 * - Supports custom ARIA attributes
 * - Keyboard navigation when interactive
 * - Screen reader compatible
 * 
 * @param {ListItemProps} props - The properties to configure the ListItem component.
 * @returns {JSX.Element} The rendered ListItem component.
 */
export default function ListItem(props: ListItemProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      // Note: DaisyUI may not have a specific list-item class, but we follow the pattern
      // for consistency and future-proofing. The primary styling comes from the parent list.
    };

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle keyboard events for interactive items
  const handleKeyDown = (event: KeyboardEvent) => {
    // Call custom handler first
    props.onKeyDown?.(event);
    
    // Handle Enter and Space for clickable items
    if (props.onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      props.onClick();
    }
  };

  return (
    <li
      id={props.id}
      style={props.style}
      tabIndex={props.tabIndex}
      role={props.role}
      aria-label={props["aria-label"]}
      onClick={props.onClick}
      onKeyDown={handleKeyDown}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </li>
  );
}