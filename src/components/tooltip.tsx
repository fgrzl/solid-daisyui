import { JSX, createSignal, createUniqueId, onMount, createEffect, children } from "solid-js";

/**
 * Props for the Tooltip component.
 *
 * @property {JSX.Element} children - The element that will trigger the tooltip on hover/focus.
 * @property {string} tip - The text content to display in the tooltip.
 * @property {"top" | "bottom" | "left" | "right"} [position="top"] - The position of the tooltip relative to the target element.
 * @property {"primary" | "secondary" | "accent" | "neutral" | "success" | "warning" | "error" | "info"} [color] - The color variant of the tooltip.
 * @property {boolean} [open] - Whether the tooltip should be forced open (useful for testing).
 * @property {string} [class] - Additional CSS classes to apply to the tooltip container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface TooltipProps {
  children: JSX.Element;
  tip: string;
  position?: "top" | "bottom" | "left" | "right";
  color?: "primary" | "secondary" | "accent" | "neutral" | "success" | "warning" | "error" | "info";
  open?: boolean;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * Tooltip component for displaying contextual information on hover or focus.
 * 
 * Follows DaisyUI Tooltip component patterns with support for all official position and color variants.
 * Provides proper accessibility with ARIA attributes and keyboard navigation support.
 * The tooltip wraps the target element and shows/hides on mouse hover and keyboard focus.
 * 
 * @param {TooltipProps} props - The tooltip component props
 * @returns {JSX.Element} JSX element representing the tooltip wrapper and content
 */
export default function Tooltip(props: TooltipProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(props.open ?? false);
  const tooltipId = createUniqueId();
  let containerRef: HTMLDivElement | undefined;

  // React to changes in props.open
  createEffect(() => {
    if (props.open !== undefined) {
      setIsOpen(props.open);
    }
  });

  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      tooltip: true,
    };

    // Add position class (default to top)
    const position = props.position ?? "top";
    baseClasses[`tooltip-${position}`] = true;

    // Add color class if provided
    if (props.color) {
      baseClasses[`tooltip-${props.color}`] = true;
    }

    // Add open class when tooltip should be visible
    if (isOpen() || props.open) {
      baseClasses["tooltip-open"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle mouse interactions
  const handleMouseEnter = () => {
    if (props.open === undefined) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (props.open === undefined) {
      setIsOpen(false);
    }
  };

  // Handle focus interactions on child elements
  const handleFocusIn = () => {
    if (props.open === undefined) {
      setIsOpen(true);
    }
  };

  const handleFocusOut = () => {
    if (props.open === undefined) {
      setIsOpen(false);
    }
  };

  // Setup event listeners for child elements
  onMount(() => {
    if (containerRef) {
      // Find all elements within the container
      const allElements = containerRef.querySelectorAll('*');
      
      // Add accessibility attributes and event listeners
      allElements.forEach((element) => {
        // Add aria-describedby to focusable elements
        if (element.matches('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')) {
          element.setAttribute('aria-describedby', tooltipId);
        }
        
        // Add focus/blur event listeners to all elements
        element.addEventListener('focus', () => {
          if (props.open === undefined) {
            setIsOpen(true);
          }
        });
        
        element.addEventListener('blur', () => {
          if (props.open === undefined) {
            setIsOpen(false);
          }
        });
      });
    }
  });

  // Resolve children to handle functions
  const resolvedChildren = children(() => props.children);

  return (
    <div
      ref={containerRef}
      classList={{
        ...classes(),
        ...props.classList,
      }}
      data-tip={props.tip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusIn={handleFocusIn}
      onFocusOut={handleFocusOut}
    >
      {resolvedChildren()}
      
      {/* Hidden tooltip text for accessibility - always present when open */}
      {(isOpen() || props.open) && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{ 
            position: "absolute", 
            left: "-9999px", 
            width: "1px", 
            height: "1px", 
            overflow: "hidden" 
          }}
        >
          {props.tip}
        </span>
      )}
    </div>
  );
}
