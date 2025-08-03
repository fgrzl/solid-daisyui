import { JSX, createEffect, onCleanup, Show } from "solid-js";
import { Portal } from "solid-js/web";
import { ModalContext, ModalContextValue } from "./modal-context";

/**
 * Props for the ModalBackdrop component.
 *
 * @property {boolean} isOpen - Controls whether the modal is visible.
 * @property {() => void} [onClose] - Callback function called when the modal should be closed.
 * @property {JSX.Element} [children] - The content to display inside the modal backdrop.
 * @property {string} [class] - Additional CSS classes to apply to the modal container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"bottom" | "middle" | "top"} [variant="middle"] - The vertical position variant of the modal.
 * @property {boolean} [closeOnBackdrop=true] - Whether clicking the backdrop should close the modal.
 * @property {boolean} [closeOnEscape=true] - Whether pressing Escape should close the modal.
 * @property {string} [aria-label] - Accessible label for the modal.
 * @property {string} [aria-labelledby] - ID of the element that labels the modal.
 * @property {string} [aria-describedby] - ID of the element that describes the modal.
 * @property {boolean} [disablePortal=false] - Disable Portal rendering (mainly for testing).
 */
export interface ModalBackdropProps {
  isOpen: boolean;
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
  disablePortal?: boolean;
}

/**
 * ModalBackdrop component that provides the backdrop and container for modal content.
 * 
 * This component manages the modal state and provides context to child components.
 * It handles backdrop clicks, escape key presses, and provides proper ARIA attributes.
 * Uses DaisyUI form pattern with method="dialog" for proper modal behavior.
 * 
 * @param {ModalBackdropProps} props - The modal backdrop component props
 * @returns {JSX.Element | null} JSX element representing the modal backdrop or null if not open
 */
export default function ModalBackdrop(props: ModalBackdropProps): JSX.Element | null {
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

  // Handle backdrop form submission
  const handleBackdropSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (props.closeOnBackdrop !== false && props.onClose) {
      props.onClose();
    }
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

  // Create context value
  const contextValue: ModalContextValue = {
    isOpen: props.isOpen,
    onClose: props.onClose,
    closeOnBackdrop: props.closeOnBackdrop,
    closeOnEscape: props.closeOnEscape,
  };

  const modalContent = () => (
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
      >
        {props.children}
        <form method="dialog" class="modal-backdrop" onSubmit={handleBackdropSubmit}>
          <button type="submit">Close</button>
        </form>
      </div>
    </ModalContext.Provider>
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