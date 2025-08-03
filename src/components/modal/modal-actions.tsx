import { JSX, useContext } from "solid-js";
import { ModalContext } from "./modal-overlay";

/**
 * Props for the ModalActions component.
 *
 * @property {JSX.Element} [children] - The action buttons or content to display.
 * @property {string} [class] - Additional CSS classes to apply to the actions container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 */
export interface ModalActionsProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * ModalActions component for rendering action buttons at the bottom of the modal.
 * 
 * This component provides the modal-action container with proper DaisyUI styling.
 * It automatically handles data-modal-close attributes to close the modal when clicked.
 * 
 * @param {ModalActionsProps} props - The modal actions component props
 * @returns {JSX.Element} JSX element representing the modal actions
 */
export default function ModalActions(props: ModalActionsProps): JSX.Element {
  const modalContext = useContext(ModalContext);

  // Handle clicks on elements with data-modal-close attribute
  const handleActionClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    
    // Check if the clicked element or any parent has data-modal-close attribute
    let element = target;
    while (element && element !== event.currentTarget) {
      if (element.hasAttribute('data-modal-close')) {
        if (modalContext?.onClose) {
          modalContext.onClose();
        }
        break;
      }
      element = element.parentElement as HTMLElement;
    }
  };

  // Build actions classes
  const actionsClasses = () => {
    const baseClasses: Record<string, boolean> = {
      "modal-action": true,
    };

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <div
      classList={{
        ...actionsClasses(),
        ...props.classList,
      }}
      onClick={handleActionClick}
    >
      {props.children}
    </div>
  );
}