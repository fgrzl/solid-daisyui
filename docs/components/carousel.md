# Carousel Component

## Overview
A responsive, accessible carousel component for displaying a scrollable collection of slides. Built with SolidJS and styled with DaisyUI.

## Usage

### Static Children (Traditional JSX)
```tsx
<Carousel>
  <div>Slide 1</div>
  <div>Slide 2</div>
  <div>Slide 3</div>
</Carousel>
```

### Data-Driven with 'each' Prop (Built-in Foreach)
```tsx
<Carousel each={imageArray}>
  {(image, index) => (
    <img src={image.src} alt={image.alt} />
  )}
</Carousel>
```

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | JSX.Element \| ((item: T, index: () => number) => JSX.Element) | - | The slides to display or render function when using 'each' |
| each | T[] | - | Array of data items to render. When provided, children should be a render function |
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

### Data-Driven Image Carousel
```tsx
const images = [
  { src: "image1.jpg", alt: "Beautiful sunset" },
  { src: "image2.jpg", alt: "Mountain landscape" },
  { src: "image3.jpg", alt: "Ocean waves" }
];

<Carousel each={images} showNavigation showIndicators>
  {(image, index) => (
    <img 
      src={image.src} 
      alt={image.alt}
      class="w-full h-64 object-cover"
    />
  )}
</Carousel>
```

### Product Carousel with Complex Data
```tsx
const products = [
  { 
    id: 1, 
    name: "Product 1", 
    price: 29.99, 
    image: "product1.jpg",
    featured: true 
  },
  { 
    id: 2, 
    name: "Product 2", 
    price: 39.99, 
    image: "product2.jpg",
    featured: false 
  }
];

<Carousel each={products} snap="center" showIndicators>
  {(product, index) => (
    <div class="card w-64 bg-base-100 shadow-xl">
      <img src={product.image} alt={product.name} class="h-48 object-cover" />
      <div class="card-body">
        <h3 class="card-title">
          {product.name}
          {product.featured && <span class="badge badge-secondary">Featured</span>}
        </h3>
        <p class="text-lg font-bold">${product.price}</p>
      </div>
    </div>
  )}
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

## Usage Patterns

### When to Use Each Pattern

**Static Children** - Use when:
- You have a fixed set of slides
- Each slide is unique with different content
- You want simple, straightforward JSX

**Data-Driven with 'each'** - Use when:
- You have dynamic data arrays (images, products, etc.)
- You want consistent rendering for each item
- You need to handle varying array lengths
- You want to leverage SolidJS's reactive `For` component

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
- The `each` prop provides a built-in foreach pattern using SolidJS's `For` component
