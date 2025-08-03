import { JSX } from "solid-js";

/**
 * Props for the ModalTitle component.
 *
 * @property {JSX.Element} [children] - The title text or content to display.
 * @property {string} [class] - Additional CSS classes to apply to the title.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [id] - ID for the title element, useful for aria-labelledby references.
 * @property {"h1" | "h2" | "h3" | "h4" | "h5" | "h6"} [as="h3"] - The HTML element to render as.
 */
export interface ModalTitleProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  id?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * ModalTitle component for rendering the modal title with proper styling and semantics.
 * 
 * This component provides a semantic heading element with appropriate styling for modal titles.
 * It defaults to an h3 element but can be customized using the 'as' prop for proper heading hierarchy.
 * 
 * @param {ModalTitleProps} props - The modal title component props
 * @returns {JSX.Element} JSX element representing the modal title
 */
export default function ModalTitle(props: ModalTitleProps): JSX.Element {
  // Build title classes
  const titleClasses = () => {
    const baseClasses: Record<string, boolean> = {
      "font-bold": true,
      "text-lg": true,
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
      ...titleClasses(),
      ...props.classList,
    },
    children: props.children,
  };

  // Use switch statement for better TypeScript support
  switch (props.as) {
    case "h1":
      return <h1 {...commonProps} />;
    case "h2":
      return <h2 {...commonProps} />;
    case "h4":
      return <h4 {...commonProps} />;
    case "h5":
      return <h5 {...commonProps} />;
    case "h6":
      return <h6 {...commonProps} />;
    case "h3":
    default:
      return <h3 {...commonProps} />;
  }
}