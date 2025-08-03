import { JSX, Show } from "solid-js";

/**
 * Props for the Timeline component.
 *
 * @property {JSX.Element} [children] - The timeline items to display.
 * @property {string} [class] - Additional CSS classes to apply to the timeline.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"vertical" | "horizontal"} [orientation] - The orientation of the timeline.
 * @property {"compact" | "normal"} [size] - The size variant of the timeline.
 * @property {"icon"} [snap] - Snap alignment option for timeline items.
 * @property {string} [ariaLabel] - Accessible label for the timeline.
 * @property {string} [ariaDescribedby] - ID of element that describes the timeline.
 */
export interface TimelineProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  orientation?: "vertical" | "horizontal";
  size?: "compact" | "normal";
  snap?: "icon";
  "aria-label"?: string;
  "aria-describedby"?: string;
}

/**
 * Props for the TimelineItem component.
 *
 * @property {JSX.Element} [children] - The content to display in the timeline item.
 * @property {string} [class] - Additional CSS classes to apply to the timeline item.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"start" | "end"} [position] - Position of the content relative to the timeline.
 * @property {JSX.Element} [icon] - Custom icon to display in the timeline middle.
 * @property {string} [title] - Title text for the timeline item.
 * @property {string} [subtitle] - Subtitle text for the timeline item.
 * @property {string} [time] - Time/date information for the timeline item.
 * @property {"completed" | "current" | "pending"} [state] - Visual state of the timeline item.
 * @property {string} [ariaLabel] - Accessible label for the timeline item.
 */
export interface TimelineItemProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  position?: "start" | "end";
  icon?: JSX.Element;
  title?: string;
  subtitle?: string;
  time?: string;
  state?: "completed" | "current" | "pending";
  "aria-label"?: string;
}

/**
 * Timeline component for displaying a sequence of events or steps.
 * Follows DaisyUI Timeline component patterns with support for different orientations,
 * sizes, and accessibility features.
 * 
 * Implements WCAG 2.1 AA accessibility standards with proper ARIA attributes
 * and semantic list structure.
 *
 * @param {TimelineProps} props - The properties to configure the Timeline component.
 * @returns {JSX.Element} The rendered Timeline component.
 */
export default function Timeline(props: TimelineProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      timeline: true,
    };

    // Add orientation classes
    if (props.orientation === "vertical") {
      baseClasses["timeline-vertical"] = true;
    } else if (props.orientation === "horizontal") {
      baseClasses["timeline-horizontal"] = true;
    }

    // Add size classes
    if (props.size === "compact") {
      baseClasses["timeline-compact"] = true;
    } else if (props.size === "normal") {
      baseClasses["timeline-normal"] = true;
    }

    // Add snap classes
    if (props.snap === "icon") {
      baseClasses["timeline-snap-icon"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <ul
      role="list"
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </ul>
  );
}

/**
 * TimelineItem component for individual items within a Timeline.
 * Represents a single event or step in the timeline with support for
 * custom icons, titles, subtitles, and time information.
 * 
 * Follows DaisyUI Timeline item patterns with proper semantic structure
 * and accessibility features.
 *
 * @param {TimelineItemProps} props - The properties to configure the TimelineItem component.
 * @returns {JSX.Element} The rendered TimelineItem component.
 */
export function TimelineItem(props: TimelineItemProps): JSX.Element {
  // Default icon for timeline items
  const defaultIcon = (
    <div class="timeline-middle">
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  );

  return (
    <li
      role="listitem"
      aria-label={props["aria-label"]}
      classList={{
        ...props.classList,
        ...(props.class ? { [props.class]: true } : {}),
      }}
    >
      {/* Timeline start content */}
      <div class="timeline-start">
        <Show when={props.position !== "end"}>
          <Show when={props.time}>
            <time datetime={props.time}>{props.time}</time>
          </Show>
          <Show when={props.title}>
            <div class="text-lg font-black">{props.title}</div>
          </Show>
          <Show when={props.subtitle}>
            <div class="text-sm text-gray-500">{props.subtitle}</div>
          </Show>
          <Show when={props.position !== "end" && props.children}>
            <div>{props.children}</div>
          </Show>
        </Show>
      </div>

      {/* Timeline middle (icon) */}
      <Show
        when={props.icon}
        fallback={defaultIcon}
      >
        <div class="timeline-middle">{props.icon}</div>
      </Show>

      {/* Timeline end content */}
      <div class="timeline-end">
        <Show when={props.position === "end"}>
          <Show when={props.time}>
            <time datetime={props.time}>{props.time}</time>
          </Show>
          <Show when={props.title}>
            <div class="text-lg font-black">{props.title}</div>
          </Show>
          <Show when={props.subtitle}>
            <div class="text-sm text-gray-500">{props.subtitle}</div>
          </Show>
          <Show when={props.position === "end" && props.children}>
            <div>{props.children}</div>
          </Show>
        </Show>
      </div>

      {/* HR separator */}
      <hr />
    </li>
  );
}
