import { JSX, createSignal } from "solid-js";

/**
 * Props for the Alert component.
 *
 * @property {JSX.Element} [children] - The content to display inside the alert.
 * @property {string} [class] - Additional CSS classes to apply to the alert.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {'info' | 'success' | 'warning' | 'error'} [type] - The type of alert, which determines its styling.
 * @property {JSX.Element} [icon] - An optional icon to display in the alert.
 * @property {boolean} [hideIcon] - If true, hides the icon in the alert.
 * @property {'soft' | 'outline' | 'dash'} [style] - The style of the alert.
 * @property {string} [title] - An optional title for the alert.
 * @property {boolean} [vertical] - If true, uses a vertical layout (good for mobile).
 * @property {JSX.Element[]} [buttons] - Optional buttons to display in the alert.
 */
export interface AlertProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  type?: "info" | "success" | "warning" | "error";
  icon?: JSX.Element;
  hideIcon?: boolean;
  style?: "soft" | "outline" | "dash";
  title?: string;
  vertical?: boolean;
  buttons?: JSX.Element[];
}

/**
 * The Alert component displays a styled message box with optional content and an icon.
 *
 * @param {AlertProps} props - The properties to configure the Alert component.
 * @returns {JSX.Element} The rendered Alert component.
 */
export default function Alert(props: AlertProps): JSX.Element {
  const [isVisible, setIsVisible] = createSignal(true);

  const defaultIcons = {
    info: (
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        ></path>
      </svg>
    ),
    success: (
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m0 0a9 9 0 11-6.364-2.636A9 9 0 0112 21a9 9 0 010-18z"
        ></path>
      </svg>
    ),
    warning: (
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4m0 4h.01"
        ></path>
      </svg>
    ),
    error: (
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    ),
  };

  const classes = () => ({
    alert: true,
    [`alert-${props.type}`]: !!props.type,
    ...(props.class ? { [props.class]: true } : {}),
  });

  const styleClasses: Record<"soft" | "outline" | "dash", string> = {
    soft: "alert-soft",
    outline: "alert-outline",
    dash: "alert-dash",
  };

  const layoutClass = props.vertical ? "alert-vertical" : "alert-horizontal";

  if (!isVisible()) return null;

  return (
    <div
      role="alert"
      aria-live={props.type === "error" ? "assertive" : "polite"}
      classList={{
        ...classes(),
        [styleClasses[props.style as "soft" | "outline" | "dash"] || ""]:
          !!props.style,
        [layoutClass]: true,
        ...props.classList,
      }}
    >
      {props.title && <h3 class="alert-title">{props.title}</h3>}
      {!props.hideIcon && (props.icon || defaultIcons[props.type || "info"]) ? (
        <span class="alert-icon" aria-hidden="true">
          {props.icon || defaultIcons[props.type || "info"]}
        </span>
      ) : null}
      <div class="alert-content">{props.children}</div>
      {props.buttons && (
        <div class="alert-buttons">
          {props.buttons.map((button) => (
            <span class="alert-button">{button}</span>
          ))}
        </div>
      )}
      <button
        type="button"
        class="alert-close"
        aria-label="Close"
        onClick={() => setIsVisible(false)}
      >
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
}
