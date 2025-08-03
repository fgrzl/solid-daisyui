import { JSX } from "solid-js";

/**
 * Props for the DropdownMenuItem component.
 *
 * @property {JSX.Element} [children] - The item content (link, button, text, etc.).
 * @property {string} [class] - Additional CSS classes to apply to the item.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {boolean} [disabled] - Whether the item is disabled.
 * @property {boolean} [active] - Whether the item is active/selected.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler for the item.
 * @property {string} [role] - ARIA role for the menu item.
 */
export interface DropdownMenuItemProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  disabled?: boolean;
  active?: boolean;
  onClick?: (event: MouseEvent) => void;
  role?: string;
}

/**
 * DropdownMenuItem component for individual dropdown menu items.
 * 
 * This component renders a li element specifically designed for dropdown menu items.
 * It provides consistent styling and behavior for menu items, with support for active
 * and disabled states. This follows the CSS flavor implementation from DaisyUI.
 * 
 * **Usage:**
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger tabindex={0}>
 *     <span>Open Menu</span>
 *   </DropdownTrigger>
 *   <DropdownContent>
 *     <DropdownMenu class="bg-base-100 rounded-box w-52 p-2 shadow">
 *       <DropdownMenuItem><a>Normal Item</a></DropdownMenuItem>
 *       <DropdownMenuItem active><a>Active Item</a></DropdownMenuItem>
 *       <DropdownMenuItem disabled><a>Disabled Item</a></DropdownMenuItem>
 *     </DropdownMenu>
 *   </DropdownContent>
 * </Dropdown>
 * ```
 * 
 * @param {DropdownMenuItemProps} props - The menu item component props
 * @returns {JSX.Element} JSX element representing the dropdown menu item
 */
export default function DropdownMenuItem(props: DropdownMenuItemProps): JSX.Element {
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
      role={(props.role ?? "menuitem") as any}
      aria-disabled={props.disabled ? "true" : "false"}
      data-dropdown-menu-item="true"
    >
      {props.children}
    </li>
  );
}