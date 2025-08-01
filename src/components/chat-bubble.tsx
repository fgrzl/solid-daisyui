import { JSX } from "solid-js";

/**
 * Props for the ChatBubble component.
 *
 * @property {JSX.Element | string} children - The message content to display in the chat bubble.
 * @property {string} [class] - Additional CSS classes to apply to the chat bubble.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {'start' | 'end'} [side] - The side of the chat bubble (start for left, end for right). Defaults to 'start'.
 * @property {'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'} [color] - The color variant of the chat bubble.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size of the chat bubble. Defaults to 'md'.
 * @property {string} [avatar] - URL for the avatar image.
 * @property {string} [avatarAlt] - Alt text for the avatar image.
 * @property {JSX.Element} [avatarElement] - Custom avatar element (overrides avatar URL).
 * @property {string | JSX.Element} [time] - Time stamp to display.
 * @property {string | JSX.Element} [header] - Header content to display above the message.
 * @property {string | JSX.Element} [footer] - Footer content to display below the message.
 */
export interface ChatBubbleProps {
  children: JSX.Element | string;
  class?: string;
  classList?: Record<string, boolean>;
  side?: "start" | "end";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  size?: "xs" | "sm" | "md" | "lg";
  avatar?: string;
  avatarAlt?: string;
  avatarElement?: JSX.Element;
  time?: string | JSX.Element;
  header?: string | JSX.Element;
  footer?: string | JSX.Element;
}

/**
 * The ChatBubble component displays a styled chat message with optional avatar, time, header, and footer.
 * It follows DaisyUI chat bubble design patterns.
 *
 * @param {ChatBubbleProps} props - The properties to configure the ChatBubble component.
 * @returns {JSX.Element} The rendered ChatBubble component.
 */
export default function ChatBubble(props: ChatBubbleProps): JSX.Element {
  const side = () => props.side || "start";
  const size = () => props.size || "md";

  const chatClasses = () => ({
    chat: true,
    [`chat-${side()}`]: true,
    ...(props.class ? { [props.class]: true } : {}),
  });

  const bubbleClasses = () => ({
    "chat-bubble": true,
    [`chat-bubble-${props.color}`]: !!props.color,
    [`chat-bubble-${size()}`]: size() !== "md",
  });

  const renderAvatar = () => {
    if (props.avatarElement) {
      return <div class="chat-image avatar">{props.avatarElement}</div>;
    }

    if (props.avatar) {
      return (
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img src={props.avatar} alt={props.avatarAlt || "User avatar"} />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      class="chat"
      classList={{
        ...chatClasses(),
        ...props.classList,
      }}
    >
      {renderAvatar()}

      {props.header && (
        <div class="chat-header">
          {props.header}
          {props.time && <time class="text-xs opacity-50">{props.time}</time>}
        </div>
      )}

      <div class="chat-bubble" classList={bubbleClasses()}>
        {props.children}
      </div>

      {props.footer && <div class="chat-footer opacity-50">{props.footer}</div>}
    </div>
  );
}
