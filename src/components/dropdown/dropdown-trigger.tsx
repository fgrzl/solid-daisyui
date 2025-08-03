import { JSX } from "solid-js";

/**
 * Props for the DropdownTrigger component.
 *
 * @property {JSX.Element} [children] - The trigger element content (button, link, etc.).
 * @property {string} [class] - Additional CSS classes to apply to the trigger div.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {number} [tabindex] - Tab index for keyboard navigation support.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler for the trigger.
 * @property {(event: KeyboardEvent) => void} [onKeyDown] - Keyboard event handler for the trigger.
 * @property {string} [role] - ARIA role for the trigger element.
 * @property {string} [ariaLabel] - ARIA label for accessibility.
 */
export interface DropdownTriggerProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  tabindex?: number;
  onClick?: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  role?: string;
  ariaLabel?: string;
}

/**
 * DropdownTrigger component for the dropdown trigger element.
 * 
 * This component renders a div element that acts as the trigger for the dropdown.
 * It supports tabindex for keyboard navigation and can contain any trigger content.
 * The div element provides better structure and accessibility support.
 * 
 * **Usage:**
 * ```tsx
 * <Dropdown>
 *   <DropdownTrigger tabindex={0} role="button">
 *     <span>Open Menu</span>
 *   </DropdownTrigger>
 *   <DropdownContent>
 *     <DropdownMenu>
 *       <DropdownMenuItem>Item 1</DropdownMenuItem>
 *       <DropdownMenuItem>Item 2</DropdownMenuItem>
 *     </DropdownMenu>
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
      tabindex={props.tabindex ?? 0}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
      role={(props.role ?? "button") as any}
      aria-label={props.ariaLabel}
      data-dropdown-trigger="true"
    >
      {props.children}
    </div>
  );
}