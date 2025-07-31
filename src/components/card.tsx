import { JSX, Show, For } from "solid-js";

/**
 * Props for the Card component.
 *
 * @property {JSX.Element} [children] - The content to display inside the card body.
 * @property {string} [class] - Additional CSS classes to apply to the card.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [title] - The title text to display in the card header.
 * @property {1 | 2 | 3 | 4 | 5 | 6} [titleLevel] - The heading level for the title (h1-h6). Defaults to h2.
 * @property {string | JSX.Element} [body] - Additional body content to display below the title.
 * @property {string} [imageSrc] - URL of the image to display in the card.
 * @property {string} [imageAlt] - Alt text for the card image for accessibility.
 * @property {"top" | "bottom"} [imagePosition] - Position of the image relative to card content. Defaults to top.
 * @property {JSX.Element | JSX.Element[]} [actions] - Action buttons or elements to display in card actions area.
 * @property {"start" | "center" | "end"} [actionsPosition] - Alignment of action buttons. Defaults to end.
 * @property {boolean} [bordered] - If true, applies card-bordered styling with visible border.
 * @property {boolean} [compact] - If true, applies card-compact styling with reduced padding.
 * @property {boolean} [side] - If true, applies card-side styling for horizontal layout.
 * @property {boolean} [glass] - If true, applies glass effect styling.
 * @property {(event: MouseEvent) => void} [onClick] - Click event handler for interactive cards.
 * @property {string} [ariaLabel] - Accessible label for the card when interactive.
 * @property {string} [ariaDescribedBy] - ID of element that describes the card for screen readers.
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
 * Card component for displaying content in a structured, visually appealing container.
 * 
 * Supports all DaisyUI card variants including bordered, compact, side layout, and glass effects.
 * Provides flexible image positioning, customizable action buttons, and proper accessibility features.
 * Can be used as a static content container or interactive element with click handlers.
 * 
 * @param {CardProps} props - The properties to configure the Card component.
 * @returns {JSX.Element} The rendered Card component.
 */
export default function Card(props: CardProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => ({
    card: true,
    "card-bordered": !!props.bordered,
    "card-compact": !!props.compact,
    "card-side": !!props.side,
    glass: !!props.glass,
    ...(props.class ? { [props.class]: true } : {}),
  });

  // Handle keyboard events for clickable cards
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === "Enter" || event.key === " ") && props.onClick) {
      event.preventDefault();
      props.onClick(new MouseEvent("click", { bubbles: true, cancelable: true }));
    }
  };

  const actionsPositionClass = () => {
    const position = props.actionsPosition || "end";
    return `justify-${position}`;
  };

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

  const renderImage = () => {
    if (!props.imageSrc) return null;
    
    return (
      <figure>
        <img src={props.imageSrc} alt={props.imageAlt || ""} />
      </figure>
    );
  };

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

  return (
    <article
      classList={{ ...classes(), ...props.classList }}
      role={props.onClick ? "button" : "article"}
      tabIndex={props.onClick ? 0 : undefined}
      onClick={props.onClick}
      onKeyDown={props.onClick ? handleKeyDown : undefined}
      aria-label={props.ariaLabel}
      aria-describedby={props.ariaDescribedBy}
    >
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
