import { JSX } from "solid-js";

/**
 * Props for the HeroContent component.
 *
 * @property {JSX.Element} [children] - The content to display inside the hero content area.
 * @property {string} [class] - Additional CSS classes to apply to the hero content container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"center" | "start" | "end"} [align] - Content alignment within the hero content area.
 * @property {"center" | "top" | "bottom"} [verticalAlign] - Vertical alignment of content.
 */
export interface HeroContentProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  align?: "center" | "start" | "end";
  verticalAlign?: "center" | "top" | "bottom";
}

/**
 * HeroContent component for the main content area within a Hero component.
 * 
 * This component represents the content area of a DaisyUI Hero component.
 * It automatically applies the required DaisyUI `hero-content` class and
 * supports content alignment options for flexible positioning.
 * 
 * Designed to be used within a Hero component container to properly
 * structure the hero layout according to DaisyUI patterns. The content
 * area is responsive and provides proper spacing and alignment for
 * hero content like headings, text, and call-to-action buttons.
 * 
 * **Usage:**
 * ```tsx
 * <Hero backgroundImage="/hero-bg.jpg">
 *   <HeroOverlay />
 *   <HeroContent align="center" verticalAlign="center">
 *     <div class="max-w-md">
 *       <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
 *       <p class="mb-5">Provident cupiditate voluptatem et in.</p>
 *       <button class="btn btn-primary">Get Started</button>
 *     </div>
 *   </HeroContent>
 * </Hero>
 * ```
 * 
 * @param {HeroContentProps} props - The hero content component props
 * @returns {JSX.Element} JSX element representing hero content
 */
export default function HeroContent(props: HeroContentProps): JSX.Element {
  return (
    <div
      classList={{
        "hero-content": true,
        "text-left": props.align === "start",
        "text-right": props.align === "end", 
        "text-center": !props.align || props.align === "center",
        "items-start": props.verticalAlign === "top",
        "items-end": props.verticalAlign === "bottom",
        "items-center": !props.verticalAlign || props.verticalAlign === "center",
        [props.class || ""]: !!props.class,
        ...props.classList,
      }}
    >
      {props.children}
    </div>
  );
}