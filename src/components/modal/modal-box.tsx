import { JSX } from "solid-js";

/**
 * Props for the ModalBox component.
 *
 * @property {JSX.Element} [children] - The content to display inside the modal box area.
 * @property {string} [class] - Additional CSS classes to apply to the modal box.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"xs" | "sm" | "md" | "lg" | "xl"} [size] - The size variant of the modal box.
 */
export interface ModalBoxProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

/**
 * ModalBox component that provides the main content container for the modal.
 * 
 * This component renders the modal box (modal-box class) and handles sizing.
 * It prevents event bubbling to avoid closing the modal when content is clicked.
 * 
 * @param {ModalBoxProps} props - The modal box component props
 * @returns {JSX.Element} JSX element representing the modal box
 */
export default function ModalBox(props: ModalBoxProps): JSX.Element {
  // Handle modal box click to prevent event bubbling
  const handleBoxClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  // Build modal box classes
  const boxClasses = () => {
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
        ...boxClasses(),
        ...props.classList,
      }}
      onClick={handleBoxClick}
      tabIndex={-1}
    >
      {props.children}
    </div>
  );
}