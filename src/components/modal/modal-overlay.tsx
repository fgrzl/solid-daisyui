import { JSX, createEffect, onCleanup, Show } from "solid-js";
import { ModalContext, ModalContextValue } from "./modal-context";

/**
 * Props for the ModalOverlay component.
 *
 * @property {boolean} [isOpen=true] - Controls whether the modal is visible. Defaults to true for convenience.
 * @property {() => void} [onClose] - Callback function called when the modal should be closed.
 * @property {JSX.Element} [children] - The content to display inside the modal overlay.
 * @property {string} [class] - Additional CSS classes to apply to the modal container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"bottom" | "middle" | "top"} [variant="middle"] - The vertical position variant of the modal.
 * @property {boolean} [closeOnBackdrop=true] - Whether clicking the backdrop should close the modal.
 * @property {boolean} [closeOnEscape=true] - Whether pressing Escape should close the modal.
 * @property {string} [aria-label] - Accessible label for the modal.
 * @property {string} [aria-labelledby] - ID of the element that labels the modal.
 * @property {string} [aria-describedby] - ID of the element that describes the modal.
 */
export interface ModalOverlayProps {
  isOpen?: boolean;
  onClose?: () => void;
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  variant?: "bottom" | "middle" | "top";
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

/**
 * ModalOverlay component that provides the backdrop and container for modal content.
 * 
 * This component manages the modal state and provides context to child components.
 * It handles backdrop clicks, escape key presses, and provides proper ARIA attributes.
 * 
 * @param {ModalOverlayProps} props - The modal overlay component props
 * @returns {JSX.Element | null} JSX element representing the modal overlay or null if not open
 */
export default function ModalOverlay(props: ModalOverlayProps): JSX.Element | null {
  // Default isOpen to true for convenience when not explicitly controlled
  const isOpen = () => props.isOpen ?? true;

  // Handle escape key
  createEffect(() => {
    if (!isOpen()) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && props.closeOnEscape !== false && props.onClose) {
        event.preventDefault();
        props.onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document.removeEventListener("keydown", handleKeyDown);
    });
  });

  // Handle backdrop click
  const handleBackdropClick = (event: MouseEvent) => {
    // Only close if clicking the backdrop itself, not child content
    if (event.target === event.currentTarget && props.closeOnBackdrop !== false && props.onClose) {
      props.onClose();
    }
  };

  // Build modal classes
  const modalClasses = () => {
    const baseClasses: Record<string, boolean> = {
      modal: true,
      "modal-open": isOpen(),
    };

    // Add variant classes
    const variant = props.variant ?? "middle";
    baseClasses[`modal-${variant}`] = true;

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Create context value
  const contextValue: ModalContextValue = {
    isOpen: isOpen(),
    onClose: props.onClose,
    closeOnBackdrop: props.closeOnBackdrop,
    closeOnEscape: props.closeOnEscape,
  };

  return (
    <Show when={isOpen()}>
      <ModalContext.Provider value={contextValue}>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={props["aria-label"]}
          aria-labelledby={props["aria-labelledby"]}
          aria-describedby={props["aria-describedby"]}
          classList={{
            ...modalClasses(),
            ...props.classList,
          }}
          onClick={handleBackdropClick}
        >
          {props.children}
        </div>
      </ModalContext.Provider>
    </Show>
  );
}