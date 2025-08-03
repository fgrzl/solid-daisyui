import { JSX, createSignal, createMemo } from "solid-js";

/**
 * Props for the Collapse component.
 *
 * @property {string} title - The title text displayed in the collapse header.
 * @property {JSX.Element} [children] - The content to display inside the collapse when expanded.
 * @property {boolean} [open] - Whether the collapse should be open by default.
 * @property {string} [class] - Additional CSS classes to apply to the collapse container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [id] - Custom ID for the collapse. If not provided, a random ID will be generated.
 * @property {"arrow" | "plus"} [variant] - The visual indicator variant - "arrow" (default) or "plus" icon.
 * @property {"checkbox" | "radio"} [type] - The input type for state management - "checkbox" (default) or "radio".
 * @property {string} [name] - Required when type is "radio" for grouping radio inputs.
 * @property {(open: boolean) => void} [onToggle] - Callback function called when the collapse state changes.
 */
export interface CollapseProps {
  title: string;
  children?: JSX.Element;
  open?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
  id?: string;
  variant?: "arrow" | "plus";
  type?: "checkbox" | "radio";
  name?: string;
  onToggle?: (open: boolean) => void;
}

/**
 * Collapse component for creating collapsible content sections with DaisyUI styling.
 * 
 * Follows DaisyUI Collapse component patterns with support for checkbox or radio input controls.
 * Radio type allows for mutual exclusion when multiple collapses share the same name.
 * Supports keyboard navigation and proper accessibility attributes.
 * 
 * @param {CollapseProps} props - The collapse component props
 * @returns {JSX.Element} JSX element representing the collapse
 */
export default function Collapse(props: CollapseProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(props.open ?? false);
  
  // Generate stable unique IDs (only once, not reactive)
  const baseId = props.id ?? `collapse-${Math.random().toString(36).slice(2)}`;
  const inputId = baseId;
  const contentId = `${baseId}-content`;
  const buttonId = `${baseId}-button`;
  
  // Determine variant class
  const variantClass = () => props.variant === "plus" ? "collapse-plus" : "collapse-arrow";
  
  // Determine input type
  const inputType = () => props.type ?? "checkbox";
  
  // Build classes following DaisyUI patterns
  const classes = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      collapse: true,
      [variantClass()]: true,
    };
    
    if (props.class) {
      baseClasses[props.class] = true;
    }
    
    return baseClasses;
  });
  
  // Handle toggle state
  const handleToggle = (newState: boolean) => {
    setIsOpen(newState);
    props.onToggle?.(newState);
  };
  
  // Handle keyboard events
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const input = document.getElementById(inputId) as HTMLInputElement;
      if (input) {
        if (inputType() === "checkbox") {
          input.checked = !input.checked;
        } else {
          input.checked = true;
        }
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };
  
  return (
    <div 
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      <input
        id={inputId}
        type={inputType()}
        name={props.name}
        checked={isOpen()}
        onInput={(e) => handleToggle(e.currentTarget.checked)}
        class="peer"
        aria-hidden="true"
      />
      <label
        for={inputId}
        id={buttonId}
        class="collapse-title text-xl font-medium cursor-pointer"
        role="button"
        tabindex="0"
        aria-expanded={isOpen()}
        aria-controls={contentId}
        onKeyDown={handleKeyDown}
      >
        {props.title}
      </label>
      <div
        id={contentId}
        class="collapse-content"
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen()}
      >
        {props.children}
      </div>
    </div>
  );
}
