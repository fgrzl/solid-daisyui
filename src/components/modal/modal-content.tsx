import { JSX } from "solid-js";

/**
 * Props for the ModalContent component.
 *
 * @property {JSX.Element} [children] - The content to display inside the modal content area.
 * @property {string} [class] - Additional CSS classes to apply to the modal content.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"xs" | "sm" | "md" | "lg" | "xl"} [size] - The size variant of the modal content.
 */
export interface ModalContentProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * ModalContent component that provides the main content container for the modal.
 * 
 * This component renders the modal box (modal-box class) and handles sizing.
 * It prevents event bubbling to avoid closing the modal when content is clicked.
 * 
 * @param {ModalContentProps} props - The modal content component props
 * @returns {JSX.Element} JSX element representing the modal content
 */
export default function ModalContent(props: ModalContentProps): JSX.Element {
  // Handle modal content click to prevent event bubbling
  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  // Build modal box classes
  const contentClasses = () => {
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

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <div
      classList={{
        ...contentClasses(),
        ...props.classList,
      }}
      onClick={handleContentClick}
      tabIndex={-1}
    >
      {props.children}
    </div>
  );
}