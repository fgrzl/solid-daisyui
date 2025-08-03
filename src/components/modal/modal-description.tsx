import { JSX } from "solid-js";

/**
 * Props for the ModalDescription component.
 *
 * @property {JSX.Element} [children] - The description text or content to display.
 * @property {string} [class] - Additional CSS classes to apply to the description.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [id] - ID for the description element, useful for aria-describedby references.
 * @property {"p" | "div" | "span"} [as="p"] - The HTML element to render as.
 */
export interface ModalDescriptionProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  id?: string;
  as?: "p" | "div" | "span";
}

/**
 * ModalDescription component for rendering modal description text with proper styling.
 * 
 * This component provides a semantic element for modal descriptions with appropriate styling.
 * It defaults to a paragraph element but can be customized using the 'as' prop.
 * Commonly used with aria-describedby for accessibility.
 * 
 * @param {ModalDescriptionProps} props - The modal description component props
 * @returns {JSX.Element} JSX element representing the modal description
 */
export default function ModalDescription(props: ModalDescriptionProps): JSX.Element {
  // Build description classes
  const descriptionClasses = () => {
    const baseClasses: Record<string, boolean> = {
      "py-4": true,
      "text-base": true,
    };

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  const commonProps = {
    id: props.id,
    classList: {
      ...descriptionClasses(),
      ...props.classList,
    },
    children: props.children,
  };

  // Use switch statement for better TypeScript support
  switch (props.as) {
    case "div":
      return <div {...commonProps} />;
    case "span":
      return <span {...commonProps} />;
    case "p":
    default:
      return <p {...commonProps} />;
  }
}