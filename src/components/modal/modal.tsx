import { JSX, createEffect, onCleanup, Show } from "solid-js";
import { Portal } from "solid-js/web";

/**
 * Props for the Modal component.
 *
 * @property {boolean} isOpen - Controls whether the modal is visible.
 * @property {() => void} [onClose] - Callback function called when the modal should be closed.
 * @property {JSX.Element} [children] - The content to display inside the modal.
 * @property {string} [class] - Additional CSS classes to apply to the modal container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"bottom" | "middle" | "top"} [variant="middle"] - The vertical position variant of the modal.
 * @property {"xs" | "sm" | "md" | "lg" | "xl"} [size] - The size variant of the modal box.
 * @property {string} [modalBoxClass] - Additional CSS classes to apply to the modal box.
 * @property {JSX.Element} [actions] - Action buttons to display at the bottom of the modal.
 * @property {boolean} [closeOnBackdrop=true] - Whether clicking the backdrop should close the modal.
 * @property {boolean} [closeOnEscape=true] - Whether pressing Escape should close the modal.
 * @property {string} [aria-label] - Accessible label for the modal.
 * @property {string} [aria-labelledby] - ID of the element that labels the modal.
 * @property {string} [aria-describedby] - ID of the element that describes the modal.
 * @property {boolean} [disablePortal=false] - Disable Portal rendering (mainly for testing).
 */
export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  variant?: "bottom" | "middle" | "top";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  modalBoxClass?: string;
  actions?: JSX.Element;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  disablePortal?: boolean;
}

/**
 * Modal component for creating accessible modal dialogs with DaisyUI styling.
 * 
 * Follows DaisyUI Modal component patterns with full accessibility support.
 * Supports keyboard navigation, focus management, and proper ARIA attributes.
 * Includes backdrop click and escape key handling for closing the modal.
 * 
 * @param {ModalProps} props - The modal component props
 * @returns {JSX.Element | null} JSX element representing the modal or null if not open
 */
export default function Modal(props: ModalProps): JSX.Element | null {
  // Handle escape key
  createEffect(() => {
    if (!props.isOpen) return;

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
    // Only close if clicking the backdrop itself, not the modal box
    if (event.target === event.currentTarget && props.closeOnBackdrop !== false && props.onClose) {
      props.onClose();
    }
  };

  // Handle modal box click to prevent event bubbling
  const handleModalBoxClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  // Build modal classes
  const modalClasses = () => {
    const baseClasses: Record<string, boolean> = {
      modal: true,
      "modal-open": props.isOpen,
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

  // Build modal box classes
  const modalBoxClasses = () => {
    const baseClasses: Record<string, boolean> = {
      "modal-box": true,
    };

    // Add size classes
    if (props.size) {
      switch (props.size) {
        case "xs":
          baseClasses["max-w-xs"] = true;
          break;
        case "sm":
          baseClasses["max-w-sm"] = true;
          break;
        case "md":
          baseClasses["max-w-md"] = true;
          break;
        case "lg":
          baseClasses["max-w-5xl"] = true;
          break;
        case "xl":
          baseClasses["max-w-7xl"] = true;
          break;
      }
    }

    // Add custom modal box class if provided
    if (props.modalBoxClass) {
      baseClasses[props.modalBoxClass] = true;
    }

    return baseClasses;
  };

  const modalContent = () => (
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
      <div
        classList={modalBoxClasses()}
        onClick={handleModalBoxClick}
        tabIndex={-1}
      >
        {props.children}
        <Show when={props.actions}>
          {props.actions}
        </Show>
      </div>
    </div>
  );

  return (
    <Show when={props.isOpen}>
      <Show when={!props.disablePortal} fallback={modalContent()}>
        <Portal>
          {modalContent()}
        </Portal>
      </Show>
    </Show>
  );
}
