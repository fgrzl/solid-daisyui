import { JSX } from "solid-js";

/**
 * Props for the CardHeader component.
 */
export interface CardHeaderProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * CardHeader component for card title and header content.
 * This is a compound component that should be used within Card.
 */
export default function CardHeader(props: CardHeaderProps): JSX.Element {
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      "card-title": true,
    };

    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <h2
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </h2>
  );
}