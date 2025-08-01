import { JSX } from "solid-js";

/**
 * Props for the Hero component.
 *
 * @property {JSX.Element} [children] - The content to display inside the hero section.
 * @property {string} [class] - Additional CSS classes to apply to the hero container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [backgroundImage] - URL of the background image to display in the hero section.
 * @property {boolean} [overlay] - Whether to show a dark overlay over the background image for better text readability.
 * @property {string} [minHeight] - Custom minimum height value (e.g., "400px", "50vh").
 * @property {"screen" | "96" | "80" | "64" | "48" | "32"} [size] - Predefined height sizes using Tailwind CSS classes.
 * @property {boolean} [noContentWrapper] - If true, children will not be automatically wrapped in hero-content div.
 * @property {string} [role] - ARIA role attribute for accessibility (e.g., "banner", "main").
 * @property {string} [aria-label] - ARIA label for screen readers.
 * @property {string} [aria-labelledby] - ID of element that labels this hero section.
 */
export interface HeroProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  backgroundImage?: string;
  overlay?: boolean;
  minHeight?: string;
  size?: "screen" | "96" | "80" | "64" | "48" | "32";
  noContentWrapper?: boolean;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/**
 * Hero component for creating prominent banner sections with optional background images and overlays.
 * 
 * Follows official DaisyUI Hero component patterns for consistent styling and layout.
 * Supports background images, overlay effects, flexible sizing, and accessibility features.
 * Uses semantic HTML structure with proper ARIA attributes for screen reader compatibility.
 *
 * @param {HeroProps} props - The properties to configure the Hero component.
 * @returns {JSX.Element} The rendered Hero component.
 */
function Hero(props: HeroProps): JSX.Element {
  // Build base classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      hero: true,
    };

    // Add height size classes if specified
    if (props.size) {
      baseClasses[`min-h-${props.size}`] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Build inline styles for background image and custom height
  const styles = () => {
    const style: Record<string, string> = {};

    if (props.backgroundImage) {
      style["background-image"] = `url(${props.backgroundImage})`;
    }

    if (props.minHeight) {
      style["min-height"] = props.minHeight;
    }

    return Object.keys(style).length > 0 ? style : undefined;
  };

  // Build ARIA attributes
  const ariaProps = () => {
    const aria: Record<string, string> = {};

    if (props["aria-label"]) {
      aria["aria-label"] = props["aria-label"];
    }

    if (props["aria-labelledby"]) {
      aria["aria-labelledby"] = props["aria-labelledby"];
    }

    if (props.role) {
      aria.role = props.role;
    }

    return aria;
  };

  // Determine content structure
  const content = () => {
    if (props.noContentWrapper) {
      return props.children;
    }
    
    return (
      <div class="hero-content">
        {props.children}
      </div>
    );
  };

  return (
    <section
      classList={{
        ...classes(),
        ...props.classList,
      }}
      style={styles()}
      {...ariaProps()}
    >
      {/* Overlay - DaisyUI pattern for background image overlay */}
      {props.overlay && (
        <div class="hero-overlay bg-opacity-60"></div>
      )}
      
      {/* Content */}
      {content()}
    </section>
  );
}

// Import child components for compound component pattern
import HeroContent from "./hero-content";
import HeroOverlay from "./hero-overlay";

// Define the compound component type
type HeroComponent = typeof Hero & {
  Content: typeof HeroContent;
  Overlay: typeof HeroOverlay;
};

// Attach child components to Hero for compound component pattern
(Hero as HeroComponent).Content = HeroContent;
(Hero as HeroComponent).Overlay = HeroOverlay;

// Export with compound component types
export default Hero as HeroComponent;
