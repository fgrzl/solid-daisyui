import { JSX, useContext } from "solid-js";
import { ModalContext } from "./modal-backdrop";

/**
 * Props for the ModalCancel component.
 *
 * @property {JSX.Element} [children] - The cancel button text or content.
 * @property {string} [class] - Additional CSS classes to apply to the cancel button.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {() => void} [onClick] - Custom click handler for the cancel button.
 * @property {"button" | "outline" | "ghost" | "link"} [variant="outline"] - The visual variant of the cancel button.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the cancel button.
 * @property {boolean} [disabled] - Whether the cancel button is disabled.
 */
export interface ModalCancelProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  onClick?: () => void;
  variant?: "button" | "outline" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
}

/**
 * ModalCancel component for rendering a cancel button that closes the modal.
 * 
 * This component renders a cancel button wrapped in a form with method="dialog"
 * following DaisyUI modal patterns. The button automatically closes the modal
 * when clicked and can have custom styling and behavior.
 * 
 * @param {ModalCancelProps} props - The modal cancel component props
 * @returns {JSX.Element} JSX element representing the modal cancel button
 */
export default function ModalCancel(props: ModalCancelProps): JSX.Element {
  const modalContext = useContext(ModalContext);

  // Handle cancel button click
  const handleCancelClick = () => {
    if (props.onClick) {
      props.onClick();
    }
    if (modalContext?.onClose) {
      modalContext.onClose();
    }
  };

  // Handle form submission
  const handleFormSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    handleCancelClick();
  };

  // Build cancel button classes
  const cancelClasses = () => {
    const baseClasses: Record<string, boolean> = {
      btn: true,
    };

    // Add variant classes
    const variant = props.variant ?? "outline";
    if (variant !== "button") {
      baseClasses[`btn-${variant}`] = true;
    }

    // Add size classes
    if (props.size) {
      baseClasses[`btn-${props.size}`] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <form method="dialog" onSubmit={handleFormSubmit}>
      <button
        type="submit"
        disabled={props.disabled}
        classList={{
          ...cancelClasses(),
          ...props.classList,
        }}
      >
        {props.children || "Cancel"}
      </button>
    </form>
  );
}