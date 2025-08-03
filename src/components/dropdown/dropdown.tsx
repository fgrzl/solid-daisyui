import { JSX, createSignal, createEffect, onCleanup, children as resolveChildren, onMount, For, createMemo } from "solid-js";

/**
 * Utility function to check if an element is disabled
 */
const isElementDisabled = (element: HTMLElement): boolean => {
  return element.hasAttribute("disabled") || 
         element.getAttribute("aria-disabled") === "true" ||
         (element as HTMLButtonElement).disabled;
};

/**
 * Utility function to find the first focusable element in a container
 */
const findFirstFocusableElement = (container: Element): HTMLElement | null => {
  return container.querySelector(
    "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
  ) as HTMLElement;
};

/**
 * Utility function to set ARIA attributes on an element
 */
const setAriaAttributes = (
  element: HTMLElement, 
  triggerId: string, 
  contentId: string, 
  isOpen: boolean,
  ariaLabel?: string
): void => {
  element.setAttribute("id", triggerId);
  element.setAttribute("aria-expanded", isOpen.toString());
  element.setAttribute("aria-haspopup", "true");
  element.setAttribute("aria-controls", contentId);
  
  if (ariaLabel) {
    element.setAttribute("aria-label", ariaLabel);
  }
  
  if (!element.hasAttribute("tabindex")) {
    element.setAttribute("tabindex", "0");
  }
};

/**
 * Props for the Dropdown component.
 *
 * @property {JSX.Element} [children] - The dropdown trigger and content elements.
 * @property {string} [class] - Additional CSS classes to apply to the dropdown container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"top" | "bottom" | "left" | "right"} [position] - Official DaisyUI position variants for dropdown placement.
 * @property {"end"} [align] - Official DaisyUI alignment modifier (dropdown-end).
 * @property {boolean} [hover] - If true, enables hover trigger mode using dropdown-hover class.
 * @property {boolean} [open] - Controls the dropdown state externally using dropdown-open class.
 * @property {(isOpen: boolean) => void} [onToggle] - Callback fired when dropdown state changes.
 * @property {string} [ariaLabel] - Custom ARIA label for accessibility.
 * @property {string} [id] - Custom ID for the dropdown. If not provided, a random ID will be generated.
 */
export interface DropdownProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  position?: "top" | "bottom" | "left" | "right";
  align?: "end";
  hover?: boolean;
  open?: boolean;
  onToggle?: (isOpen: boolean) => void;
  ariaLabel?: string;
  id?: string;
}

/**
 * Dropdown component for creating interactive dropdown menus with full DaisyUI integration.
 * 
 * Follows official DaisyUI Dropdown component patterns with support for position variants,
 * hover triggers, and proper accessibility features. Implements WCAG 2.1 AA standards
 * with keyboard navigation and screen reader support.
 * 
 * Supports click-to-toggle, hover triggers, keyboard navigation (Enter, Space, Escape),
 * click-outside-to-close, and proper focus management for enhanced user experience.
 *
 * @param {DropdownProps} props - The dropdown component props
 * @returns {JSX.Element} JSX element representing the dropdown
 */
export default function Dropdown(props: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = createSignal(props.open ?? false);
  const [triggerId, setTriggerId] = createSignal("");
  const [contentId, setContentId] = createSignal("");

  let dropdownRef: HTMLDivElement | undefined;

  // Generate unique IDs for accessibility
  onMount(() => {
    const baseId = props.id ?? `dropdown-${Math.random().toString(36).slice(2)}`;
    setTriggerId(`${baseId}-trigger`);
    setContentId(`${baseId}-content`);
  });

  // Sync external open prop with internal state
  createEffect(() => {
    if (props.open !== undefined) {
      setIsOpen(props.open);
    }
  });

  // Build dropdown container classes following DaisyUI patterns (memoized for performance)
  const dropdownClasses = createMemo(() => {
    const baseClasses: Record<string, boolean> = {
      dropdown: true,
    };

    // Add position classes
    if (props.position) {
      baseClasses[`dropdown-${props.position}`] = true;
    }

    // Add alignment classes
    if (props.align) {
      baseClasses[`dropdown-${props.align}`] = true;
    }

    // Add trigger variant classes
    if (props.hover) {
      baseClasses["dropdown-hover"] = true;
    }

    // Add open state class
    if (isOpen()) {
      baseClasses["dropdown-open"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  });

  // Handle dropdown toggle
  const toggleDropdown = (event?: Event, fromTarget?: HTMLElement) => {
    event?.preventDefault();
    
    // Don't toggle if hover mode is enabled and this is a click event
    if (props.hover && event?.type === "click") {
      return;
    }

    // Check if target is disabled
    if (fromTarget && isElementDisabled(fromTarget)) {
      return;
    }

    const newState = !isOpen();
    setIsOpen(newState);
    
    // Call onToggle callback if provided
    props.onToggle?.(newState);

    // Focus management for accessibility
    if (newState) {
      // When opening, focus the first focusable element in content
      // Use requestAnimationFrame for better timing in both real world and tests
      requestAnimationFrame(() => {
        const content = dropdownRef?.querySelector(".dropdown-content");
        if (content) {
          const firstFocusable = findFirstFocusableElement(content);
          firstFocusable?.focus();
        }
      });
    }
  };

  // Handle click outside
  const handleClickOutside = (event: Event) => {
    const target = event.target as Node;
    if (isOpen() && dropdownRef && !dropdownRef.contains(target)) {
      setIsOpen(false);
      props.onToggle?.(false);
    }
  };

  // Handle global escape key
  const handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && isOpen()) {
      event.preventDefault();
      setIsOpen(false);
      props.onToggle?.(false);
      
      // Focus back to trigger
      const trigger = dropdownRef?.querySelector(`#${triggerId()}`) as HTMLElement;
      if (trigger) {
        trigger.focus();
      }
    }
  };

  // Setup global event listeners
  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleGlobalKeyDown);

    onCleanup(() => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleGlobalKeyDown);
    });
  });

  // Resolve children to identify trigger and content (memoized for performance)
  const childrenArray = createMemo(() => {
    const resolved = resolveChildren(() => props.children);
    if (Array.isArray(resolved())) {
      return resolved() as JSX.Element[];
    }
    return resolved() ? [resolved() as JSX.Element] : [];
  });

  // Check if children are structured components (DropdownTrigger, DropdownContent)
  const isStructuredChildren = createMemo(() => {
    const children = childrenArray();
    return children.some(child => {
      if (!child || typeof child !== "object" || !("props" in child)) {
        return false;
      }
      const props = child.props as any;
      return props?.["data-dropdown-trigger"] === "true" || props?.["data-dropdown-content"] === "true";
    });
  });

  // Extract structured trigger and content
  const structuredTrigger = createMemo(() => {
    if (!isStructuredChildren()) return null;
    const children = childrenArray();
    return children.find(child => {
      if (!child || typeof child !== "object" || !("props" in child)) {
        return false;
      }
      const props = child.props as any;
      return props?.["data-dropdown-trigger"] === "true";
    });
  });

  const structuredContent = createMemo(() => {
    if (!isStructuredChildren()) return null;
    const children = childrenArray();
    return children.find(child => {
      if (!child || typeof child !== "object" || !("props" in child)) {
        return false;
      }
      const props = child.props as any;
      return props?.["data-dropdown-content"] === "true";
    });
  });

  // Handle trigger click events  
  const handleTriggerClick = (event: MouseEvent, element: HTMLElement) => {
    // Check if the actual clicked element (not the wrapper) is disabled
    const clickedElement = event.target as HTMLElement;
    if (isElementDisabled(clickedElement)) {
      event.preventDefault();
      return;
    }

    toggleDropdown(event, element);
  };

  // Handle trigger keyboard events
  const handleTriggerKeyDown = (event: KeyboardEvent, element: HTMLElement) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      
      // Check if the actual target element is disabled
      const target = event.target as HTMLElement;
      if (isElementDisabled(target)) {
        return;
      }

      toggleDropdown(event, element);
    }
  };

  // Enhanced event delegation to handle the trigger element directly
  const enhanceTriggerElement = (element: JSX.Element, wrapperElement: HTMLElement) => {
    // Add event listeners to the actual trigger element
    createEffect(() => {
      // For structured DropdownTrigger components, the trigger is the div itself
      // For legacy components, find the first child element
      let triggerElement: HTMLElement;
      
      // Check if this is a DropdownTrigger component (has data-dropdown-trigger)
      if (wrapperElement.firstElementChild?.getAttribute("data-dropdown-trigger") === "true") {
        triggerElement = wrapperElement.firstElementChild as HTMLElement;
      } else {
        // Legacy pattern - look for child element
        triggerElement = wrapperElement.firstElementChild as HTMLElement;
      }
      
      if (triggerElement) {
        // Set ARIA attributes directly on the trigger element
        setAriaAttributes(triggerElement, triggerId(), contentId(), isOpen(), props.ariaLabel);

        // Add event listeners
        const clickHandler = (e: MouseEvent) => {
          // Also call any original click handler if element has props
          if (element && typeof element === "object" && "props" in element) {
            const originalOnClick = (element.props as any)?.onClick;
            if (originalOnClick) {
              originalOnClick(e);
            }
          }
          handleTriggerClick(e, triggerElement);
        };
        
        const keyDownHandler = (e: KeyboardEvent) => {
          // Also call any original keydown handler if element has props
          if (element && typeof element === "object" && "props" in element) {
            const originalOnKeyDown = (element.props as any)?.onKeyDown;
            if (originalOnKeyDown) {
              originalOnKeyDown(e);
            }
          }
          handleTriggerKeyDown(e, triggerElement);
        };

        triggerElement.addEventListener("click", clickHandler);
        triggerElement.addEventListener("keydown", keyDownHandler);

        onCleanup(() => {
          triggerElement.removeEventListener("click", clickHandler);
          triggerElement.removeEventListener("keydown", keyDownHandler);
        });
      }
    });
  };

  return (
    <div
      ref={dropdownRef}
      classList={{
        ...dropdownClasses(),
        ...props.classList,
      }}
    >
      {isStructuredChildren() ? (
        // Structured component pattern
        <>
          {structuredTrigger() && (
            <div
              ref={(el) => {
                if (el) {
                  enhanceTriggerElement(structuredTrigger()!, el);
                }
              }}
              style="display: contents;"
            >
              {structuredTrigger()}
            </div>
          )}
          {structuredContent() && (
            <div
              id={contentId()}
              role="menu"
              aria-labelledby={triggerId()}
            >
              {structuredContent()}
            </div>
          )}
        </>
      ) : (
        // Legacy children pattern (for backward compatibility)
        <For each={childrenArray()}>
          {(child, index) => {
            // First child is the trigger
            if (index() === 0) {
              return (
                <div
                  ref={(el) => {
                    if (el) {
                      enhanceTriggerElement(child, el);
                    }
                  }}
                  style="display: contents;"
                >
                  {child}
                </div>
              );
            }
            
            // Second child is the content
            if (index() === 1) {
              return (
                <div
                  class="dropdown-content"
                  id={contentId()}
                  role="menu"
                  aria-labelledby={triggerId()}
                >
                  {child}
                </div>
              );
            }
            
            // Any additional children are rendered as-is
            return child;
          }}
        </For>
      )}
    </div>
  );
}
