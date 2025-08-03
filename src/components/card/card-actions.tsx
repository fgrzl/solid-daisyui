import { JSX } from "solid-js";

/**
 * Props for the CardActions component.
 */
export interface CardActionsProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  position?: "start" | "center" | "end";
}

/**
 * CardActions component for action buttons and controls.
 * This is a compound component that should be used within Card.
 */
export default function CardActions(props: CardActionsProps): JSX.Element {
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      "card-actions": true,
    };

    // Add position classes
    const position = props.position || "end";
    baseClasses[`justify-${position}`] = true;

    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <div
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </div>
  );
}