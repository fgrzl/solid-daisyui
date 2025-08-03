import { JSX } from "solid-js";

/**
 * Props for the CardBody component.
 */
export interface CardBodyProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
}

/**
 * CardBody component for main card content.
 * This is a compound component that should be used within Card.
 */
export default function CardBody(props: CardBodyProps): JSX.Element {
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      "card-body": true,
    };

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