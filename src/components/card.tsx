import { JSX, createSignal, Show, For } from "solid-js";

/**
 * Props for the Card component.
 *
 * @property {JSX.Element} [children] - The main content to display inside the card body.
 * @property {string} [class] - Additional CSS classes to apply to the card.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [title] - The title to display in the card header.
 * @property {1 | 2 | 3 | 4 | 5 | 6} [titleLevel] - Heading level for the title (defaults to 2).
 * @property {string | JSX.Element} [body] - Optional body content (alternative to children).
 * @property {string} [imageSrc] - Image source URL for the card image.
 * @property {string} [imageAlt] - Alternative text for the card image.
 * @property {"top" | "bottom"} [imagePosition] - Position of the image (defaults to "top").
 * @property {JSX.Element | JSX.Element[]} [actions] - Action buttons or elements to display in card-actions.
 * @property {"start" | "center" | "end"} [actionsPosition] - Alignment of actions (defaults to "end").
 * @property {boolean} [bordered] - Whether to apply card-bordered class.
 * @property {boolean} [compact] - Whether to apply card-compact class.
 * @property {boolean} [side] - Whether to apply card-side class for horizontal layout.
 * @property {boolean} [glass] - Whether to apply glass effect class.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler. Makes the card clickable.
 * @property {string} [ariaLabel] - ARIA label for accessibility when clickable.
 * @property {string} [ariaDescribedBy] - ARIA described-by for additional context.
 */
export interface CardProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  body?: string | JSX.Element;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "top" | "bottom";
  actions?: JSX.Element | JSX.Element[];
  actionsPosition?: "start" | "center" | "end";
  bordered?: boolean;
  compact?: boolean;
  side?: boolean;
  glass?: boolean;
  onClick?: (event: MouseEvent) => void;
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

/**
 * Card component for displaying content in a structured, styled container.
 * Follows DaisyUI Card component patterns with support for images, titles, actions, and various layouts.
 * Implements WCAG 2.1 AA accessibility standards with proper ARIA attributes and semantic structure.
 * 
 * Supports all official DaisyUI card features including bordered, compact, side, and glass variants.
 * Provides optional clickable functionality with proper keyboard navigation support.
 *
 * @param {CardProps} props - The properties to configure the Card component.
 * @returns {JSX.Element} The rendered Card component.
 */
export default function Card(props: CardProps): JSX.Element {
  const [imageLoaded, setImageLoaded] = createSignal(true);

  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      card: true,
    };

    // Add official DaisyUI variant classes
    if (props.bordered) {
      baseClasses["card-bordered"] = true;
    }
    if (props.compact) {
      baseClasses["card-compact"] = true;
    }
    if (props.side) {
      baseClasses["card-side"] = true;
    }
    if (props.glass) {
      baseClasses["glass"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle click event with proper keyboard support
  const handleClick = (event: MouseEvent) => {
    if (props.onClick) {
      props.onClick(event);
    }
  };

  // Handle keyboard events for clickable cards
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (props.onClick) {
        // Create a synthetic MouseEvent for keyboard activation
        const syntheticEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        });
        props.onClick(syntheticEvent);
      }
    }
  };

  // Handle image load error
  const handleImageError = () => {
    setImageLoaded(false);
  };

  // Determine if card is clickable
  const isClickable = () => !!props.onClick;

  // Get actions position class
  const actionsPositionClass = () => {
    switch (props.actionsPosition) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "end":
      default:
        return "justify-end";
    }
  };

  // Render title with appropriate heading level
  const renderTitle = () => {
    if (!props.title) return null;
    
    const level = props.titleLevel || 2;
    
    // Use conditional rendering for heading levels
    return (
      <>
        <Show when={level === 1}>
          <h1 class="card-title">{props.title}</h1>
        </Show>
        <Show when={level === 2}>
          <h2 class="card-title">{props.title}</h2>
        </Show>
        <Show when={level === 3}>
          <h3 class="card-title">{props.title}</h3>
        </Show>
        <Show when={level === 4}>
          <h4 class="card-title">{props.title}</h4>
        </Show>
        <Show when={level === 5}>
          <h5 class="card-title">{props.title}</h5>
        </Show>
        <Show when={level === 6}>
          <h6 class="card-title">{props.title}</h6>
        </Show>
      </>
    );
  };

  // Render image if provided
  const renderImage = () => {
    if (!props.imageSrc) return null;
    
    return (
      <Show when={imageLoaded()}>
        <figure>
          <img
            src={props.imageSrc}
            alt={props.imageAlt || ""}
            onError={handleImageError}
          />
        </figure>
      </Show>
    );
  };

  // Render card body
  const renderBody = () => {
    const hasContent = props.children || props.body || props.title || props.actions;
    if (!hasContent) return null;

    return (
      <div class="card-body">
        {renderTitle()}
        <Show when={props.body}>
          <div>{props.body}</div>
        </Show>
        <Show when={props.children}>
          <div>{props.children}</div>
        </Show>
        <Show when={props.actions}>
          <div class={`card-actions ${actionsPositionClass()}`}>
            <Show when={Array.isArray(props.actions)}>
              <For each={props.actions as JSX.Element[]}>
                {(action) => action}
              </For>
            </Show>
            <Show when={!Array.isArray(props.actions)}>
              {props.actions}
            </Show>
          </div>
        </Show>
      </div>
    );
  };

  // Determine container element and its properties
  const containerProps = () => {
    const baseProps: any = {
      classList: {
        ...classes(),
        ...props.classList,
      },
    };

    if (isClickable()) {
      baseProps.role = "button";
      baseProps.tabIndex = 0;
      baseProps.onClick = handleClick;
      baseProps.onKeyDown = handleKeyDown;
      
      if (props.ariaLabel) {
        baseProps["aria-label"] = props.ariaLabel;
      }
    } else {
      baseProps.role = "article";
    }

    if (props.ariaDescribedBy) {
      baseProps["aria-describedby"] = props.ariaDescribedBy;
    }

    return baseProps;
  };

  return (
    <article {...containerProps()}>
      <Show when={props.imageSrc && props.imagePosition !== "bottom"}>
        {renderImage()}
      </Show>
      {renderBody()}
      <Show when={props.imageSrc && props.imagePosition === "bottom"}>
        {renderImage()}
      </Show>
    </article>
  );
}
