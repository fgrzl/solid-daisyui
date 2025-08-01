import {
  JSX,
  createSignal,
  children,
  For,
  Show,
  createEffect,
  createMemo,
} from "solid-js";

/**
 * Props for the Carousel component.
 *
 * @property {JSX.Element | ((item: T, index: () => number) => JSX.Element)} [children] - The slides to display in the carousel. For best results, use CarouselItem components as children, though any JSX elements are supported.
 * @property {T[]} [each] - Array of data items to render. When provided, children should be a render function.
 * @property {string} [class] - Additional CSS classes to apply to the carousel container.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {"start" | "center" | "end"} [snap] - DaisyUI snap alignment for carousel items.
 * @property {boolean} [vertical] - Whether the carousel should be vertical (true) or horizontal (false/default).
 * @property {boolean} [showNavigation] - Whether to show previous/next navigation buttons.
 * @property {boolean} [showIndicators] - Whether to show slide indicator dots.
 * @property {number} [currentSlide] - The currently active slide index (0-based).
 * @property {(index: number) => void} [onChange] - Callback fired when the current slide changes.
 * @property {string} [ariaLabel] - Custom aria-label for the carousel container.
 */
export interface CarouselProps<T = any> {
  children?: JSX.Element | ((item: T, index: () => number) => JSX.Element);
  each?: T[];
  class?: string;
  classList?: Record<string, boolean>;
  snap?: "start" | "center" | "end";
  vertical?: boolean;
  showNavigation?: boolean;
  showIndicators?: boolean;
  currentSlide?: number;
  onChange?: (index: number) => void;
  ariaLabel?: string;
}

/**
 * Carousel component for displaying a scrollable collection of slides.
 * Follows official DaisyUI Carousel component patterns with support for
 * snap alignment, orientation, navigation controls, and accessibility features.
 *
 * Supports all official DaisyUI carousel classes and modifiers including
 * carousel-start, carousel-center, carousel-end, carousel-vertical, and carousel-horizontal.
 *
 * **Usage Patterns:**
 *
 * **Recommended: CarouselItem Children** (best developer experience and composability):
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
 * **Data-Driven with 'each'** (built-in foreach with CarouselItem):
 * ```tsx
 * <Carousel each={imageArray}>
 *   {(image, index) => (
 *     <CarouselItem>
 *       <img src={image.src} alt={image.alt} />
 *     </CarouselItem>
 *   )}
 * </Carousel>
 * ```
 *
 * **Legacy: Direct JSX Children** (backward compatibility, automatically wrapped):
 * ```tsx
 * <Carousel>
 *   <img src="image1.jpg" alt="Image 1" />
 *   <img src="image2.jpg" alt="Image 2" />
 * </Carousel>
 * ```
 *
 * @param {CarouselProps<T>} props - The properties to configure the Carousel component.
 * @returns {JSX.Element} The rendered Carousel component.
 */
export default function Carousel<T = any>(
  props: CarouselProps<T>,
): JSX.Element {
  // Initialize current slide index
  const [currentSlideIndex, setCurrentSlideIndex] = createSignal(
    props.currentSlide ?? 0,
  );

  // Resolve children to array for easier manipulation using createMemo for proper reactivity
  const slidesArray = createMemo(() => {
    // Handle data-driven pattern with 'each' prop
    if (props.each && typeof props.children === "function") {
      return props.each.map((item, index) =>
        (props.children as (item: T, index: () => number) => JSX.Element)(
          item,
          () => index,
        ),
      );
    }

    // Handle traditional JSX children pattern
    const resolved = children(() => props.children as JSX.Element);
    const slides = resolved.toArray
      ? resolved.toArray()
      : Array.isArray(resolved())
        ? resolved()
        : resolved()
          ? [resolved()]
          : [];
    return slides as JSX.Element[];
  });

  // Build classes following DaisyUI patterns
  const classes = () => {
    const baseClasses: Record<string, boolean> = {
      carousel: true,
    };

    // Add snap alignment classes
    if (props.snap) {
      baseClasses[`carousel-${props.snap}`] = true;
    }

    // Add orientation classes
    if (props.vertical) {
      baseClasses["carousel-vertical"] = true;
    } else {
      baseClasses["carousel-horizontal"] = true;
    }

    // Add custom class if provided
    if (props.class) {
      baseClasses[props.class] = true;
    }

    return baseClasses;
  };

  // Handle slide navigation
  const goToSlide = (index: number) => {
    const slides = slidesArray();
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
      props.onChange?.(index);
    }
  };

  const goToPrevious = () => {
    const currentIndex = currentSlideIndex();
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  const goToNext = () => {
    const currentIndex = currentSlideIndex();
    const slides = slidesArray();
    if (currentIndex < slides.length - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    const isVertical = props.vertical;

    switch (event.key) {
      case "ArrowLeft":
        if (!isVertical) {
          event.preventDefault();
          goToPrevious();
        }
        break;
      case "ArrowRight":
        if (!isVertical) {
          event.preventDefault();
          goToNext();
        }
        break;
      case "ArrowUp":
        if (isVertical) {
          event.preventDefault();
          goToPrevious();
        }
        break;
      case "ArrowDown":
        if (isVertical) {
          event.preventDefault();
          goToNext();
        }
        break;
      case "Home":
        event.preventDefault();
        goToSlide(0);
        break;
      case "End":
        event.preventDefault();
        const slides = slidesArray();
        if (slides.length > 0) {
          goToSlide(slides.length - 1);
        }
        break;
    }
  };

  // Update current slide when prop changes
  createEffect(() => {
    if (props.currentSlide !== undefined) {
      setCurrentSlideIndex(props.currentSlide);
    }
  });

  const slides = slidesArray();
  const currentIndex = () => currentSlideIndex();
  const isFirstSlide = () => currentIndex() === 0;
  const isLastSlide = () => currentIndex() === slides.length - 1;

  return (
    <div
      role="region"
      aria-label={props.ariaLabel ?? "Carousel"}
      classList={{
        ...classes(),
        ...props.classList,
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Carousel items */}
      <Show
        when={props.each && typeof props.children === "function"}
        fallback={<For each={slides}>{(slide) => slide}</For>}
      >
        <For each={props.each}>
          {(item, index) => {
            const renderedItem = (
              props.children as (item: T, index: () => number) => JSX.Element
            )(item, index);
            return renderedItem;
          }}
        </For>
      </Show>

      {/* Navigation buttons */}
      <Show when={props.showNavigation && slides.length > 1}>
        <div class="carousel-navigation">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goToPrevious}
            disabled={isFirstSlide()}
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={goToNext}
            disabled={isLastSlide()}
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </Show>

      {/* Slide indicators */}
      <Show when={props.showIndicators && slides.length > 1}>
        <div class="carousel-indicators">
          <Show
            when={props.each && typeof props.children === "function"}
            fallback={
              <For each={slides}>
                {(_, index) => (
                  <button
                    type="button"
                    role="button"
                    aria-label={`Go to slide ${index() + 1}`}
                    aria-pressed={index() === currentIndex() ? "true" : "false"}
                    onClick={() => goToSlide(index())}
                    classList={{
                      active: index() === currentIndex(),
                    }}
                  />
                )}
              </For>
            }
          >
            <For each={props.each}>
              {(_, index) => (
                <button
                  type="button"
                  role="button"
                  aria-label={`Go to slide ${index() + 1}`}
                  aria-pressed={index() === currentIndex() ? "true" : "false"}
                  onClick={() => goToSlide(index())}
                  classList={{
                    active: index() === currentIndex(),
                  }}
                />
              )}
            </For>
          </Show>
        </div>
      </Show>
    </div>
  );
}
