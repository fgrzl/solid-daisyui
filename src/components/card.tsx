import { JSX, createSignal, Show, For } from "solid-js";

/**
 * Props for the Card component.
 *
 * @property {JSX.Element} [children] - The main content to display inside the card body.
 * @property {string} [class] - Additional CSS classes to apply to the card.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [title] - The title to display in the card header using official DaisyUI card-title class.
 * @property {1 | 2 | 3 | 4 | 5 | 6} [titleLevel] - Heading level for the title (defaults to 2).
 * @property {string | JSX.Element} [body] - Optional body content (alternative to children).
 * @property {string} [imageSrc] - Image source URL for the card image.
 * @property {string} [imageAlt] - Alternative text for the card image.
 * @property {"top" | "bottom"} [imagePosition] - Position of the image (defaults to "top").
 * @property {JSX.Element | JSX.Element[]} [actions] - Action buttons or elements to display in card-actions.
 * @property {"start" | "center" | "end"} [actionsPosition] - Alignment of actions (defaults to "end").
 * @property {boolean} [bordered] - Whether to apply card-bordered class for border styling.
 * @property {boolean} [compact] - Whether to apply card-compact class for reduced padding.
 * @property {boolean} [side] - Whether to apply card-side class for horizontal layout.
 * @property {boolean} [glass] - Whether to apply glass effect class for glassmorphism styling.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler. Makes the card clickable with proper ARIA attributes.
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
 * Follows official DaisyUI Card component patterns with support for images, titles, actions, and various layouts.
 * 
 * Implements WCAG 2.1 AA accessibility standards with proper ARIA attributes, semantic structure,
 * and keyboard navigation support for interactive cards.
 * 
 * Supports all official DaisyUI card features including:
 * - Style variants: bordered, compact, side, glass
 * - Image positioning: top, bottom with figure wrapper
 * - Action alignment: start, center, end with card-actions
 * - Interactive behavior: click handling with keyboard support
 * - Accessibility: proper roles, ARIA attributes, focus management
 *
 * @param {CardProps} props - The properties to configure the Card component.
 * @returns {JSX.Element} The rendered Card component with proper semantic structure.
 */
export default function Card(props: CardProps): JSX.Element {
  const [imageLoaded, setImageLoaded] = createSignal(true);

  // Build classes following DaisyUI patterns
  const classes = () => ({
    card: true,
    "card-bordered": !!props.bordered,
    "card-compact": !!props.compact,
    "card-side": !!props.side,
    glass: !!props.glass,
    ...(props.class ? { [props.class]: true } : {}),
  });

  // Determine if card is clickable
  const isClickable = () => !!props.onClick;

  // Handle click events
  const handleClick = (event: MouseEvent) => {
    props.onClick?.(event);
  };

  // Handle keyboard events for clickable cards
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === "Enter" || event.key === " ") && props.onClick) {
      event.preventDefault();
      // Create synthetic MouseEvent for keyboard activation
      const syntheticEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      });
      props.onClick(syntheticEvent);
    }
  };

  // Handle image load error
  const handleImageError = () => setImageLoaded(false);

  // Get actions position class
  const actionsPositionClass = () => {
    const position = props.actionsPosition || "end";
    return `justify-${position === "end" ? "end" : position === "start" ? "start" : "center"}`;
  };

  // Render title with dynamic heading level - using switch for better performance
  const renderTitle = () => {
    if (!props.title) return null;
    
    const level = props.titleLevel || 2;
    const titleProps = { class: "card-title", children: props.title };
    
    switch (level) {
      case 1: return <h1 {...titleProps} />;
      case 2: return <h2 {...titleProps} />;
      case 3: return <h3 {...titleProps} />;
      case 4: return <h4 {...titleProps} />;
      case 5: return <h5 {...titleProps} />;
      case 6: return <h6 {...titleProps} />;
      default: return <h2 {...titleProps} />;
    }
  };

  // Render image if provided and loaded
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

  // Render card body with content
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

  // Build container props based on clickable state
  const containerProps = () => {
    const baseProps: Record<string, any> = {
      classList: { ...classes(), ...props.classList },
      role: isClickable() ? "button" : "article",
    };

    if (isClickable()) {
      Object.assign(baseProps, {
        tabIndex: 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        ...(props.ariaLabel && { "aria-label": props.ariaLabel }),
      });
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
