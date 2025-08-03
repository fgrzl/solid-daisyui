import { JSX, createSignal, createMemo } from "solid-js";

/**
 * Props for the Swap component.
 *
 * @property {boolean} [active] - Controls the active state of the swap. When true, shows the "on" content and applies swap-active class.
 * @property {"rotate" | "flip"} [variant] - Animation variant for the swap transition. "rotate" applies swap-rotate, "flip" applies swap-flip.
 * @property {JSX.Element} [on] - Content to display when the swap is in the active/on state. Placed in swap-on container.
 * @property {JSX.Element} [off] - Content to display when the swap is in the inactive/off state. Placed in swap-off container.
 * @property {(active: boolean) => void} [onToggle] - Callback fired when the swap state changes. Receives the new active state as parameter.
 * @property {string} [class] - Additional CSS classes to apply to the swap container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling using SolidJS classList.
 * @property {string} [aria-label] - Accessible label for the swap component. Defaults to "Toggle switch" if not provided.
 * 
 * @example
 * ```tsx
 * // Basic swap with icon toggle
 * <Swap 
 *   on={<HamburgerIcon />} 
 *   off={<CloseIcon />}
 *   onToggle={(active) => setMenuOpen(active)}
 * />
 * 
 * // Controlled swap with animation
 * <Swap 
 *   active={darkMode}
 *   variant="rotate"
 *   on={<MoonIcon />} 
 *   off={<SunIcon />}
 *   onToggle={setDarkMode}
 *   aria-label="Toggle dark mode"
 * />
 * 
 * // Uncontrolled swap with custom styling
 * <Swap 
 *   variant="flip"
 *   class="text-primary"
 *   on={<span>❤️</span>} 
 *   off={<span>🤍</span>}
 * />
 * ```
 */
export interface SwapProps {
  active?: boolean;
  variant?: "rotate" | "flip";
  on?: JSX.Element;
  off?: JSX.Element;
  onToggle?: (active: boolean) => void;
  class?: string;
  classList?: Record<string, boolean>;
  "aria-label"?: string;
}

/**
 * Swap component for creating animated toggle switches between two states.
 * 
 * Follows DaisyUI Swap component patterns with support for rotate and flip animations.
 * Uses a hidden checkbox for state management and provides keyboard accessibility.
 * Supports both controlled and uncontrolled state management.
 * 
 * The component displays different content based on its active state:
 * - When inactive (default): shows "off" content
 * - When active: shows "on" content and applies swap-active class
 * 
 * Implements WCAG 2.1 AA accessibility standards with proper ARIA attributes,
 * keyboard navigation (Enter/Space), and semantic switch role.
 * 
 * **DaisyUI Classes Used:**
 * - `swap`: Base component class
 * - `swap-active`: Applied when component is in active state
 * - `swap-rotate`: Rotation animation variant
 * - `swap-flip`: Flip animation variant
 * - `swap-on`: Container for active state content
 * - `swap-off`: Container for inactive state content
 *
 * @param {SwapProps} props - The swap component props
 * @returns {JSX.Element} JSX element representing the swap component
 * 
 * @example
 * ```tsx
 * // Theme toggle example
 * function ThemeToggle() {
 *   const [isDark, setIsDark] = createSignal(false);
 *   
 *   return (
 *     <Swap
 *       active={isDark()}
 *       variant="rotate"
 *       on={<MoonIcon />}
 *       off={<SunIcon />}
 *       onToggle={setIsDark}
 *       aria-label="Toggle dark mode"
 *     />
 *   );
 * }
 * ```
 */
export default function Swap(props: SwapProps): JSX.Element {
  // Internal state for uncontrolled mode
  const [internalActive, setInternalActive] = createSignal(false);
  
  // Memoized computed values for performance optimization
  const isControlled = createMemo(() => props.active !== undefined);
  const isActive = createMemo(() => isControlled() ? props.active! : internalActive());
  
  // Memoized class construction to prevent unnecessary re-computations
  const swapClasses = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      swap: true,
      "swap-active": isActive(),
    };

    // Add variant animation classes
    if (props.variant === "rotate") {
      baseClasses["swap-rotate"] = true;
    } else if (props.variant === "flip") {
      baseClasses["swap-flip"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  // Memoized accessibility label
  const ariaLabel = createMemo(() => props["aria-label"] || "Toggle switch");

  // Extract toggle logic into a separate function for better organization
  const toggleState = (newActive: boolean) => {
    // Update internal state for uncontrolled mode
    if (!isControlled()) {
      setInternalActive(newActive);
    }
    
    // Call onToggle callback if provided
    props.onToggle?.(newActive);
  };

  // Handle toggle action with proper event handling
  const handleToggle = (event?: Event) => {
    event?.preventDefault();
    toggleState(!isActive());
  };

  // Handle keyboard events for accessibility
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle(event);
    }
  };

  // Handle click events
  const handleClick = (event: MouseEvent) => {
    handleToggle(event);
  };

  return (
    <label
      role="switch"
      aria-checked={isActive()}
      aria-label={ariaLabel()}
      tabindex="0"
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      classList={{
        ...swapClasses(),
        ...props.classList,
      }}
    >
      {/* Hidden checkbox for state management - following DaisyUI patterns */}
      <input
        type="checkbox"
        checked={isActive()}
        aria-hidden="true"
        style={{ display: "none" }}
        readOnly
      />
      
      {/* On state content - visible when swap is active */}
      <div class="swap-on">
        {props.on}
      </div>
      
      {/* Off state content - visible when swap is inactive */}
      <div class="swap-off">
        {props.off}
      </div>
    </label>
  );
}
