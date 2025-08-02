import { JSX, createMemo } from "solid-js";

// Constants for DaisyUI variant validation
const VALID_ORIENTATIONS = ["horizontal", "vertical"] as const;
const VALID_POSITIONS = ["neutral", "primary", "secondary", "accent"] as const;
const VALID_COLORS = ["info", "success", "warning", "error"] as const;

// Type definitions for better type safety
type DividerOrientation = typeof VALID_ORIENTATIONS[number];
type DividerPosition = typeof VALID_POSITIONS[number];
type DividerColor = typeof VALID_COLORS[number];

/**
 * Props for the Divider component.
 *
 * @property {JSX.Element} [children] - The content to display inside the divider (text or icons that appear in the center).
 * @property {string} [class] - Additional CSS classes to apply to the divider.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {DividerOrientation} [orientation] - The orientation of the divider using official DaisyUI classes (divider-horizontal, divider-vertical).
 * @property {DividerPosition} [position] - Official DaisyUI position/theme variants for divider styling.
 * @property {DividerColor} [color] - Official DaisyUI color variants for divider styling.
 * @property {string} [aria-label] - Accessible label for screen readers to describe the divider's purpose.
 * @property {'horizontal' | 'vertical'} [aria-orientation] - ARIA orientation attribute for accessibility compliance.
 */
export interface DividerProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  orientation?: DividerOrientation;
  position?: DividerPosition;
  color?: DividerColor;
  "aria-label"?: string;
  "aria-orientation"?: "horizontal" | "vertical";
}

/**
 * Utility function to build DaisyUI classes with validation
 */
function buildDividerClasses(
  orientation?: string,
  position?: string,
  color?: string,
  customClass?: string
): Record<string, boolean> {
  const classes: Record<string, boolean> = {
    divider: true,
  };

  // Add official DaisyUI orientation classes (with validation)
  if (orientation && VALID_ORIENTATIONS.includes(orientation as DividerOrientation)) {
    classes[`divider-${orientation}`] = true;
  }

  // Add official DaisyUI position/theme classes (with validation)
  if (position && VALID_POSITIONS.includes(position as DividerPosition)) {
    classes[`divider-${position}`] = true;
  }

  // Add official DaisyUI color classes (with validation)
  if (color && VALID_COLORS.includes(color as DividerColor)) {
    classes[`divider-${color}`] = true;
  }

  // Add custom class if provided
  if (customClass) {
    classes[customClass] = true;
  }

  return classes;
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
  // Memoize class calculation for performance
  const computedClasses = createMemo(() =>
    buildDividerClasses(
      props.orientation,
      props.position,
      props.color,
      props.class
    )
  );

  return (
    <div
      role="separator"
      aria-label={props["aria-label"]}
      aria-orientation={props["aria-orientation"]}
      classList={{
        ...computedClasses(),
        ...props.classList,
      }}
    >
      {props.children}
    </div>
  );
}
