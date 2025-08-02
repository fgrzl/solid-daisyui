import { JSX } from "solid-js";

/**
 * Props for the DropdownContent component.
 *
 * @property {JSX.Element} [children] - The dropdown content elements (menu, list, custom content).
 * @property {string} [class] - Additional CSS classes to apply to the content wrapper.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [placement] - Deprecated: Use position prop on parent Dropdown instead.
 */
export interface DropdownContentProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  placement?: string; // For backward compatibility
}

/**
 * DropdownContent component for the dropdown content container.
 * 
 * This component wraps the dropdown content (menus, lists, custom content) and
 * automatically applies the required DaisyUI `dropdown-content` class. It provides
 * better composition and type safety when used within a Dropdown component.
 * 
 * The content is typically a menu, list, or any custom content that should be
 * displayed when the dropdown is open. It automatically receives proper ARIA
 * attributes and positioning from the parent Dropdown component.
 * 
 * **Usage:**
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger>
 *     <button class="btn">Open Menu</button>
 *   </DropdownTrigger>
 *   <DropdownContent>
 *     <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
 *       <DropdownItem><a>Item 1</a></DropdownItem>
 *       <DropdownItem><a>Item 2</a></DropdownItem>
 *     </ul>
 *   </DropdownContent>
 * </Dropdown>
 * ```
 * 
 * @param {DropdownContentProps} props - The content component props
 * @returns {JSX.Element} JSX element representing the dropdown content
 */
export default function DropdownContent(props: DropdownContentProps): JSX.Element {
  const classes = () => ({
    "dropdown-content": true,
    ...(props.class ? { [props.class]: true } : {}),
  });

  return (
    <div
      classList={{
        ...classes(),
        ...props.classList,
      }}
      data-dropdown-content="true"
    >
      {props.children}
    </div>
  );
}