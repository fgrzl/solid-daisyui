import { JSX } from "solid-js";

/**
 * Props for the ModalConfirm component.
 *
 * @property {JSX.Element} [children] - The confirm button text or content.
 * @property {string} [class] - Additional CSS classes to apply to the confirm button.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {() => void} [onClick] - Click handler for the confirm button.
 * @property {"primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error" | "danger"} [variant="primary"] - The visual variant of the confirm button.
 * @property {"xs" | "sm" | "md" | "lg"} [size] - The size of the confirm button.
 * @property {boolean} [disabled] - Whether the confirm button is disabled.
 * @property {boolean} [loading] - Whether to show loading state.
 */
export interface ModalConfirmProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent" | "neutral" | "info" | "success" | "warning" | "error" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
}

/**
 * ModalConfirm component for rendering a confirm/action button in modals.
 * 
 * This component renders a confirm button that performs an action when clicked.
 * It supports all DaisyUI button variants and can be used for destructive actions
 * like "Delete" or confirmative actions like "Save".
 * 
 * @param {ModalConfirmProps} props - The modal confirm component props
 * @returns {JSX.Element} JSX element representing the modal confirm button
 */
export default function ModalConfirm(props: ModalConfirmProps): JSX.Element {
  // Handle confirm button click
  const handleConfirmClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  // Build confirm button classes
  const confirmClasses = () => {
    const baseClasses: Record<string, boolean> = {
      btn: true,
    };

    // Add variant classes
    const variant = props.variant ?? "primary";
    // Map "danger" to "error" for DaisyUI compatibility
    const daisyVariant = variant === "danger" ? "error" : variant;
    baseClasses[`btn-${daisyVariant}`] = true;

    // Add size classes
    if (props.size) {
      baseClasses[`btn-${props.size}`] = true;
    }

    // Add loading class
    if (props.loading) {
      baseClasses["loading"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <button
      type="button"
      disabled={props.disabled || props.loading}
      classList={{
        ...confirmClasses(),
        ...props.classList,
      }}
      onClick={handleConfirmClick}
    >
      {props.children || "Confirm"}
    </button>
  );
}