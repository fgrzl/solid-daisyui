# Carousel Component

## Overview
A responsive, accessible carousel component for displaying a scrollable collection of slides. Built with SolidJS and styled with DaisyUI.

## Usage
```tsx
<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>
```

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | JSX.Element | - | The slides to display in the carousel |
| class | string | - | Additional CSS classes to apply to the carousel container |
| classList | Record<string, boolean> | - | Dynamic class list for conditional styling |
| snap | "start" \| "center" \| "end" | - | DaisyUI snap alignment for carousel items |
| vertical | boolean | false | Whether the carousel should be vertical (true) or horizontal (false/default) |
| showNavigation | boolean | false | Whether to show previous/next navigation buttons |
| showIndicators | boolean | false | Whether to show slide indicator dots |
| currentSlide | number | 0 | The currently active slide index (0-based) |
| onChange | (index: number) => void | - | Callback fired when the current slide changes |
| ariaLabel | string | "Carousel" | Custom aria-label for the carousel container |

## Accessibility
- Supports full keyboard navigation with arrow keys, Home, and End
- Includes proper ARIA attributes (role="region", aria-label, aria-pressed)
- Compatible with screen readers
- Navigation buttons are properly labeled and disabled when appropriate
- Carousel items have appropriate tab order

## Examples

### Basic Carousel
```tsx
<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>
```

### Vertical Carousel with Navigation
```tsx
<Carousel vertical showNavigation>
  <img src="image1.jpg" alt="Image 1" />
  <img src="image2.jpg" alt="Image 2" />
  <img src="image3.jpg" alt="Image 3" />
</Carousel>
```

### Carousel with Indicators and Centered Snap
```tsx
<Carousel snap="center" showIndicators>
  <div className="w-64 h-48 bg-primary">Card 1</div>
  <div className="w-64 h-48 bg-secondary">Card 2</div>
  <div className="w-64 h-48 bg-accent">Card 3</div>
</Carousel>
```

### Controlled Carousel
```tsx
function ControlledCarousel() {
  const [currentSlide, setCurrentSlide] = createSignal(0);
  
  return (
    <Carousel 
      currentSlide={currentSlide()} 
      onChange={setCurrentSlide}
      showNavigation 
      showIndicators
    >
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  );
}
```

## DaisyUI Classes
This component uses the following official DaisyUI classes:
- `.carousel` - Base carousel container
- `.carousel-item` - Individual slide container
- `.carousel-vertical` - Vertical orientation
- `.carousel-horizontal` - Horizontal orientation (default)
- `.carousel-start` - Start snap alignment
- `.carousel-center` - Center snap alignment  
- `.carousel-end` - End snap alignment

## Notes
- The carousel is fully responsive and works with any slide content
- Navigation controls are optional and only show when enabled
- Supports both controlled and uncontrolled usage patterns
- Handles edge cases like empty children and single slides gracefully
- Built-in keyboard navigation follows standard accessibility patterns
