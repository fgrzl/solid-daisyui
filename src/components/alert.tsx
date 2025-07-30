import { JSX, createSignal } from "solid-js";

/**
 * Props for the Alert component.
 *
 * @property {JSX.Element} [children] - The content to display inside the alert.
 * @property {string} [class] - Additional CSS classes to apply to the alert.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {'info' | 'success' | 'warning' | 'error'} [type] - The type of alert, which determines its styling using official DaisyUI classes.
 * @property {JSX.Element} [icon] - An optional icon to display in the alert.
 * @property {boolean} [hideIcon] - If true, hides the icon in the alert.
 * @property {string} [title] - An optional title for the alert.
 * @property {JSX.Element[]} [buttons] - Optional buttons to display in the alert.
 * @property {boolean} [dismissible] - If false, hides the close button. Defaults to true.
 * @property {() => boolean | void} [onClose] - Callback fired when the close button is clicked. If returns false, prevents default close behavior.
 * @property {'soft' | 'outline' | 'dash'} [style] - @deprecated Legacy style prop - use DaisyUI classes directly instead.
 * @property {boolean} [vertical] - @deprecated Legacy vertical prop - use DaisyUI flexbox classes directly instead.
 */
export interface AlertProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  type?: "info" | "success" | "warning" | "error";
  icon?: JSX.Element;
  hideIcon?: boolean;
  title?: string;
  buttons?: JSX.Element[];
  dismissible?: boolean;
  onClose?: () => boolean | void;
  // Deprecated props for backward compatibility
  style?: "soft" | "outline" | "dash";
  vertical?: boolean;
}

/**
 * Alert component for displaying styled message boxes with optional content and icons.
 * Follows official DaisyUI Alert component patterns for consistent styling and behavior.
 * 
 * Supports accessibility features including proper ARIA attributes, keyboard navigation,
 * and screen reader compatibility. Implements WCAG 2.1 AA compliance standards.
 *
 * @param {AlertProps} props - The properties to configure the Alert component.
 * @returns {JSX.Element} The rendered Alert component.
 */
export default function Alert(props: AlertProps): JSX.Element | null {
  const [isVisible, setIsVisible] = createSignal(true);

  // Default icons following DaisyUI patterns
  const defaultIcons = {
    info: (
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        ></path>
      </svg>
    ),
    success: (
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m0 0a9 9 0 11-6.364-2.636A9 9 0 0112 21a9 9 0 010-18z"
        ></path>
      </svg>
    ),
    warning: (
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01"
        ></path>
      </svg>
    ),
    error: (
      <svg
        class="w-6 h-6"
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
        ></path>
      </svg>
    ),
  };

  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      alert: true,
    };

    // Add official DaisyUI type classes
    if (props.type) {
      baseClasses[`alert-${props.type}`] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle close action with proper event handling and keyboard support
  const handleClose = (event?: Event) => {
    event?.preventDefault();
    
    // Call onClose callback if provided
    if (props.onClose) {
      const result = props.onClose();
      // If onClose returns false, prevent default close behavior
      if (result === false) {
        return;
      }
    }
    
    // Use batch update to ensure reactivity works properly in tests
    setIsVisible(false);
  };

  // Handle keyboard events for close button
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClose(event);
    }
  };

  // Don't render if not visible
  if (!isVisible()) {
    return null;
  }

  // Determine if should show close button
  const showCloseButton = props.dismissible !== false;

  return (
    <div
      role="alert"
      aria-live={props.type === "error" ? "assertive" : "polite"}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {/* Title */}
      {props.title && <h3>{props.title}</h3>}
      
      {/* Icon */}
      {!props.hideIcon && (props.icon || defaultIcons[props.type || "info"]) && (
        <span aria-hidden="true">
          {props.icon || defaultIcons[props.type || "info"]}
        </span>
      )}
      
      {/* Main content */}
      <span>{props.children}</span>
      
      {/* Action buttons */}
      {props.buttons && props.buttons.length > 0 && (
        <div>
          {props.buttons.map((button) => (
            <span>{button}</span>
          ))}
        </div>
      )}
      
      {/* Close button */}
      {showCloseButton && (
        <button
          type="button"
          aria-label="Close"
          onClick={handleClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <svg
            class="w-4 h-4"
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
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}
