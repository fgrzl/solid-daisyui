import { JSX } from "solid-js";
import { useLayoutContext } from "./layout";

/**
 * Props for the Layout.ToggleButton component.
 *
 * @property {string} [class] - Additional CSS classes to apply to the toggle button.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [aria-label] - Accessible label for the toggle button. Defaults to "Toggle navigation".
 */
export interface LayoutToggleButtonProps {
  class?: string;
  classList?: Record<string, boolean>;
  "aria-label"?: string;
}

/**
 * Layout.ToggleButton component for controlling the collapsible state of navigation.
 * Provides a button to show/hide navigation in collapsible layouts with proper
 * accessibility attributes and keyboard support.
 * 
 * Automatically adapts its styling and behavior based on the parent Layout's
 * variant and collapsible state.
 *
 * @param {LayoutToggleButtonProps} props - The properties to configure the ToggleButton component.
 * @returns {JSX.Element} The rendered ToggleButton component.
 */
export default function LayoutToggleButton(props: LayoutToggleButtonProps): JSX.Element {
  const context = useLayoutContext();
  
  // Build classes based on layout variant
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      btn: true,
      "btn-ghost": true,
      "btn-square": true,
    };

    // Add size classes based on variant
    if (context.variant === "left" || context.variant === "right") {
      baseClasses["btn-sm"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle toggle action
  const handleToggle = () => {
    context.setNavCollapsed(!context.isNavCollapsed());
    
    // Also toggle the drawer input if it exists
    const drawerInput = document.getElementById('layout-drawer-toggle') as HTMLInputElement;
    if (drawerInput) {
      drawerInput.checked = context.isNavCollapsed();
    }
  };

  // Handle keyboard events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  // Icon based on collapsed state
  const icon = () => {
    if (context.isNavCollapsed()) {
      // Menu icon (show navigation)
      return (
        <svg 
          class="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      );
    } else {
      // X icon (hide navigation)
      return (
        <svg 
          class="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      );
    }
  };

  return (
    <button
      type="button"
      classList={{
        ...classes(),
        ...props.classList,
      }}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-label={props["aria-label"] ?? "Toggle navigation"}
      aria-expanded={!context.isNavCollapsed()}
      aria-controls="navigation"
    >
      {icon()}
    </button>
  );
}