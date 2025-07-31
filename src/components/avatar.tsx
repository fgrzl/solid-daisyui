import { JSX, createSignal, Show, createMemo } from "solid-js";

/**
 * Props for the Avatar component.
 *
 * @property {string} [src] - The image source URL for the avatar.
 * @property {string} [alt] - Alternative text for the avatar image.
 * @property {string} [placeholder] - Initials or text to display when no image is provided.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the avatar.
 * @property {boolean} [rounded] - Whether the avatar should be fully rounded.
 * @property {boolean} [ring] - Whether to show a ring around the avatar.
 * @property {"online" | "offline"} [status] - Online presence indicator.
 * @property {string} [mask] - Mask variant for the avatar (e.g., "squircle", "heart", "hexagon-2").
 * @property {string} [class] - Additional CSS classes to apply to the avatar container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [fallback] - Fallback text to display when image fails to load.
 */
export interface AvatarProps {
  src?: string;
  alt?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  rounded?: boolean;
  ring?: boolean;
  status?: "online" | "offline";
  mask?: string;
  class?: string;
  classList?: Record<string, boolean>;
  fallback?: string;
}

/**
 * Avatar component for displaying user profile pictures or placeholder initials.
 * Follows DaisyUI Avatar component patterns with support for sizes, presence indicators, masks, and rings.
 * Implements WCAG 2.1 AA accessibility standards with proper ARIA attributes and semantic structure.
 */
export default function Avatar(props: AvatarProps): JSX.Element {
  const [imageError, setImageError] = createSignal(false);
  let imgRef: HTMLImageElement | undefined;

  // Reset error state when src changes
  const currentSrc = () => props.src;
  createMemo((prevSrc) => {
    if (prevSrc !== undefined && prevSrc !== currentSrc()) {
      setImageError(false);
    }
    return currentSrc();
  });

  // Size mapping for DaisyUI classes
  const getSizeClasses = () => {
    switch (props.size) {
      case "xs":
        return "w-6";
      case "sm":
        return "w-8";
      case "md":
        return "w-12";
      case "lg":
        return "w-16";
      default:
        return "w-12"; // default medium size
    }
  };

  // Build avatar container classes
  const avatarClasses = () => ({
    avatar: true,
    "avatar-online": props.status === "online",
    "avatar-offline": props.status === "offline",
    "avatar-placeholder": !!(!props.src || imageError() || props.placeholder),
    ...(props.class ? { [props.class]: true } : {}),
  });

  // Build inner div classes
  const innerClasses = () => {
    const classes: Record<string, boolean> = {
      [getSizeClasses()]: true,
    };

    // Add rounded classes
    if (props.rounded) {
      classes["rounded-full"] = true;
    } else {
      classes["rounded"] = true;
    }

    // Add ring classes
    if (props.ring) {
      classes["ring"] = true;
      classes["ring-primary"] = true;
      classes["ring-offset-base-100"] = true;
      classes["ring-offset-2"] = true;
    }

    // Add mask classes
    if (props.mask) {
      classes["mask"] = true;
      classes[`mask-${props.mask}`] = true;
    }

    // Add background for placeholder
    if (!props.src || imageError() || props.placeholder) {
      classes["bg-neutral"] = true;
      classes["text-neutral-content"] = true;
    }

    return classes;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Determine what content to render
  const shouldShowImage = () =>
    props.src && !imageError() && !props.placeholder;
  const shouldShowPlaceholder = () =>
    props.placeholder || (props.fallback && (!props.src || imageError()));

  const getDisplayText = () => {
    if (props.placeholder) return props.placeholder;
    if (props.fallback && (!props.src || imageError())) return props.fallback;
    return "";
  };

  // Generate accessibility label
  const getAriaLabel = () => {
    let label = "";

    if (props.placeholder) {
      label = `Avatar with initials ${props.placeholder}`;
    } else if (props.alt) {
      label = props.alt;
    } else if (props.fallback && (!props.src || imageError())) {
      label = `Avatar with initials ${props.fallback}`;
    } else {
      label = "Avatar";
    }

    if (props.status) {
      label += ` (${props.status})`;
    }

    return label;
  };

  return (
    <div
      role="img"
      aria-label={getAriaLabel()}
      tabindex="0"
      classList={{
        ...avatarClasses(),
        ...props.classList,
      }}
    >
      <div classList={innerClasses()}>
        <Show when={shouldShowImage()}>
          <img
            ref={imgRef}
            src={props.src}
            alt=""
            aria-hidden="true"
            onError={handleImageError}
          />
        </Show>
        <Show when={shouldShowPlaceholder()}>
          <span aria-hidden="true">{getDisplayText()}</span>
        </Show>
      </div>

      {/* Presence indicators */}
      <Show when={props.status === "online"}>
        <div class="online" aria-hidden="true"></div>
      </Show>
      <Show when={props.status === "offline"}>
        <div class="offline" aria-hidden="true"></div>
      </Show>
    </div>
  );
}
