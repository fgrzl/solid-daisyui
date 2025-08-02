import { JSX } from "solid-js";

/**
 * Props for the Divider component.
 *
 * @property {JSX.Element} [children] - The content to display inside the divider (text or icons that appear in the center).
 * @property {string} [class] - Additional CSS classes to apply to the divider.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {'horizontal' | 'vertical'} [orientation] - The orientation of the divider using official DaisyUI classes (divider-horizontal, divider-vertical).
 * @property {'neutral' | 'primary' | 'secondary' | 'accent'} [position] - Official DaisyUI position/theme variants for divider styling.
 * @property {'info' | 'success' | 'warning' | 'error'} [color] - Official DaisyUI color variants for divider styling.
 * @property {string} [aria-label] - Accessible label for screen readers to describe the divider's purpose.
 * @property {'horizontal' | 'vertical'} [aria-orientation] - ARIA orientation attribute for accessibility compliance.
 */
export interface DividerProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  orientation?: "horizontal" | "vertical";
  position?: "neutral" | "primary" | "secondary" | "accent";
  color?: "info" | "success" | "warning" | "error";
  "aria-label"?: string;
  "aria-orientation"?: "horizontal" | "vertical";
}

/**
 * Divider component for creating horizontal or vertical separators with optional text content.
 * Follows official DaisyUI Divider component patterns for consistent styling and behavior.
 * 
 * Supports all official DaisyUI divider features including orientation variants (horizontal, vertical),
 * position/theme styling (neutral, primary, secondary, accent), color variants (info, success, warning, error),
 * and accessibility features with proper ARIA attributes.
 * 
 * Can display text or other content in the center of the divider line, commonly used for
 * section separators with labels like "OR", "AND", or decorative elements.
 *
 * @param {DividerProps} props - The properties to configure the Divider component.
 * @returns {JSX.Element} The rendered Divider component.
 */
export default function Divider(props: DividerProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      divider: true,
    };

    // Add official DaisyUI orientation classes (with validation)
    if (props.orientation && ["horizontal", "vertical"].includes(props.orientation)) {
      baseClasses[`divider-${props.orientation}`] = true;
    }

    // Add official DaisyUI position/theme classes (with validation)
    if (props.position && ["neutral", "primary", "secondary", "accent"].includes(props.position)) {
      baseClasses[`divider-${props.position}`] = true;
    }

    // Add official DaisyUI color classes (with validation)
    if (props.color && ["info", "success", "warning", "error"].includes(props.color)) {
      baseClasses[`divider-${props.color}`] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <div
      role="separator"
      aria-label={props["aria-label"]}
      aria-orientation={props["aria-orientation"]}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </div>
  );
}
