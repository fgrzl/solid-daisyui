import { JSX } from "solid-js";

/**
 * Props for the DropdownItem component.
 *
 * @property {JSX.Element} [children] - The item content (link, button, text, etc.).
 * @property {string} [class] - Additional CSS classes to apply to the item.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {boolean} [disabled] - Whether the item is disabled.
 * @property {boolean} [active] - Whether the item is active/selected.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler for the item.
 */
export interface DropdownItemProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  disabled?: boolean;
  active?: boolean;
  onClick?: (event: MouseEvent) => void;
}

/**
 * DropdownItem component for individual dropdown menu items.
 * 
 * This component represents a single item within a dropdown menu. It provides
 * consistent styling and behavior for menu items, with support for active
 * and disabled states.
 * 
 * Typically used within DropdownContent to create structured menu items
 * with better type safety and composition.
 * 
 * **Usage:**
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger>
 *     <button class="btn">Open Menu</button>
 *   </DropdownTrigger>
 *   <DropdownContent>
 *     <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
 *       <DropdownItem><a>Normal Item</a></DropdownItem>
 *       <DropdownItem active><a>Active Item</a></DropdownItem>
 *       <DropdownItem disabled><a>Disabled Item</a></DropdownItem>
 *     </ul>
 *   </DropdownContent>
 * </Dropdown>
 * ```
 * 
 * @param {DropdownItemProps} props - The item component props
 * @returns {JSX.Element} JSX element representing the dropdown item
 */
export default function DropdownItem(props: DropdownItemProps): JSX.Element {
  const handleClick = (event: MouseEvent) => {
    if (props.disabled) {
      event.preventDefault();
      return;
    }
    props.onClick?.(event);
  };

  const classes = () => ({
    active: !!props.active,
    disabled: !!props.disabled,
    ...(props.class ? { [props.class]: true } : {}),
  });

  return (
    <li
      classList={{
        ...classes(),
        ...props.classList,
      }}
      onClick={handleClick}
      data-dropdown-item="true"
    >
      {props.children}
    </li>
  );
}