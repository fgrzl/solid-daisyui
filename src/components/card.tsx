import { JSX, Show, For } from "solid-js";

/**
 * Props for the Card component.
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
 * Card component for displaying content in a structured container.
 * Supports DaisyUI variants, images, actions, and accessibility features.
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

  // Get actions position class
  const actionsPositionClass = () => {
    const position = props.actionsPosition || "end";
    return `justify-${position}`;
  };

  // Render title with dynamic heading level
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

  // Render image if provided
  const renderImage = () => {
    if (!props.imageSrc) return null;
    
    return (
      <figure>
        <img src={props.imageSrc} alt={props.imageAlt || ""} />
      </figure>
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
