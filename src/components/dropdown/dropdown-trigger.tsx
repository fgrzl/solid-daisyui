import { JSX } from "solid-js";

/**
 * Props for the DropdownTrigger component.
 *
 * @property {JSX.Element} [children] - The trigger element content (button, link, etc.).
 * @property {string} [class] - Additional CSS classes to apply to the trigger wrapper.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface DropdownTriggerProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * DropdownTrigger component for the dropdown trigger element.
 * 
 * This component wraps the trigger element (button, link, etc.) that opens/closes
 * the dropdown. It provides better type safety and composition when used within
 * a Dropdown component.
 * 
 * The trigger element should be an interactive element like a button or link
 * that can receive focus and respond to click/keyboard events.
 * 
 * **Usage:**
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger>
 *     <button class="btn">Open Menu</button>
 *   </DropdownTrigger>
 *   <DropdownContent>
 *     <ul class="menu">
 *       <li><a>Item 1</a></li>
 *       <li><a>Item 2</a></li>
 *     </ul>
 *   </DropdownContent>
 * </Dropdown>
 * ```
 * 
 * @param {DropdownTriggerProps} props - The trigger component props
 * @returns {JSX.Element} JSX element representing the dropdown trigger
 */
export default function DropdownTrigger(props: DropdownTriggerProps): JSX.Element {
  return (
    <div
      class={props.class}
      classList={props.classList}
      style="display: contents;"
      data-dropdown-trigger="true"
    >
      {props.children}
    </div>
  );
}