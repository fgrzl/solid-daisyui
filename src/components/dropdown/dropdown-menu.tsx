import { JSX } from "solid-js";

/**
 * Props for the DropdownMenu component.
 *
 * @property {JSX.Element} [children] - The menu items (typically DropdownMenuItem components).
 * @property {string} [class] - Additional CSS classes to apply to the menu.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [role] - ARIA role for the menu element.
 */
export interface DropdownMenuProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  role?: string;
}

/**
 * DropdownMenu component for dropdown menu lists.
 * 
 * This component renders a ul element specifically designed for dropdown menus.
 * It automatically applies both DaisyUI dropdown-content and menu classes,
 * making it interchangeable with DropdownContent for dropdown purposes while
 * providing proper semantic structure for dropdown menu items.
 * 
 * **Usage:**
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger tabindex={0}>
 *     <span>Open Menu</span>
 *   </DropdownTrigger>
 *   <DropdownMenu class="bg-base-100 rounded-box w-52 p-2 shadow">
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem active>Item 2</DropdownMenuItem>
 *     <DropdownMenuItem disabled>Item 3</DropdownMenuItem>
 *   </DropdownMenu>
 * </Dropdown>
 * ```
 * 
 * @param {DropdownMenuProps} props - The menu component props
 * @returns {JSX.Element} JSX element representing the dropdown menu
 */
export default function DropdownMenu(props: DropdownMenuProps): JSX.Element {
  const classes = () => ({
    "dropdown-content": true,
    menu: true,
    ...(props.class ? { [props.class]: true } : {}),
  });

  return (
    <ul
      classList={{
        ...classes(),
        ...props.classList,
      }}
      role={(props.role ?? "menu") as any}
      data-dropdown-menu="true"
    >
      {props.children}
    </ul>
  );
}