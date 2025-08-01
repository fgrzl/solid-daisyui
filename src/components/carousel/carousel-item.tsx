import { JSX } from "solid-js";

/**
 * Props for the CarouselItem component.
 *
 * @property {JSX.Element} [children] - The content to display inside the carousel item.
 * @property {string} [class] - Additional CSS classes to apply to the carousel item.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {string} [id] - Optional ID for the carousel item (useful for scroll-to functionality).
 */
export interface CarouselItemProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  id?: string;
}

/**
 * CarouselItem component for individual carousel slides.
 *
 * This component represents a single slide within a Carousel component.
 * It automatically applies the required DaisyUI `carousel-item` class and
 * supports all standard DaisyUI carousel item modifiers.
 *
 * Designed to be used within a Carousel component container for optimal
 * performance and accessibility. Each CarouselItem is automatically
 * focusable and participates in keyboard navigation.
 *
 * **Usage:**
 * ```tsx
 * <Carousel>
 *   <CarouselItem>
 *     <img src="image1.jpg" alt="Image 1" />
 *   </CarouselItem>
 *   <CarouselItem>
 *     <img src="image2.jpg" alt="Image 2" />
 *   </CarouselItem>
 * </Carousel>
 * ```
 *
 * @param {CarouselItemProps} props - The carousel item component props
 * @returns {JSX.Element} JSX element representing a carousel item
 */
export default function CarouselItem(props: CarouselItemProps): JSX.Element {
  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      "carousel-item": true,
    };

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  return (
    <div
      id={props.id}
      tabIndex={0}
      classList={{
        ...classes(),
        ...props.classList,
      }}
    >
      {props.children}
    </div>
  );
}
