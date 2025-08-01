import { JSX } from "solid-js";

/**
 * Props for the HeroOverlay component.
 *
 * @property {string} [class] - Additional CSS classes to apply to the hero overlay.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {number} [opacity] - Overlay opacity value (0-100). Defaults to 60.
 * @property {string} [color] - Overlay color class (e.g., "bg-black", "bg-neutral"). Defaults to "bg-black".
 */
export interface HeroOverlayProps {
  class?: string;
  classList?: Record<string, boolean>;
  opacity?: number;
  color?: string;
}

/**
 * HeroOverlay component for adding a dark overlay over hero background images.
 * 
 * This component represents the overlay layer of a DaisyUI Hero component.
 * It automatically applies the required DaisyUI `hero-overlay` class and
 * supports customizable opacity and color options for better text readability
 * over background images.
 * 
 * Designed to be used within a Hero component container, typically positioned
 * before HeroContent to ensure proper layering. The overlay helps improve
 * contrast and text readability when using background images.
 * 
 * **Usage:**
 * ```tsx
 * <Hero backgroundImage="/hero-bg.jpg">
 *   <HeroOverlay opacity={40} color="bg-neutral" />
 *   <HeroContent>
 *     <h1 class="text-white">Hello there</h1>
 *   </HeroContent>
 * </Hero>
 * ```
 * 
 * **Customization:**
 * ```tsx
 * // Light overlay
 * <HeroOverlay opacity={20} />
 * 
 * // Custom color overlay
 * <HeroOverlay color="bg-primary" opacity={30} />
 * 
 * // Heavy overlay for better contrast
 * <HeroOverlay opacity={80} />
 * ```
 * 
 * @param {HeroOverlayProps} props - The hero overlay component props
 * @returns {JSX.Element} JSX element representing hero overlay
 */
export default function HeroOverlay(props: HeroOverlayProps): JSX.Element {
  const opacity = props.opacity ?? 60;
  const colorClass = props.color || "bg-black";

  return (
    <div
      classList={{
        "hero-overlay": true,
        [colorClass]: true,
        [`bg-opacity-${opacity}`]: true,
        [props.class || ""]: !!props.class,
        ...props.classList,
      }}
    />
  );
}