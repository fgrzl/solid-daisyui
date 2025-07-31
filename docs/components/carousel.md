# Carousel Component

## Overview
A responsive, accessible carousel component for displaying a scrollable collection of slides. Built with SolidJS and styled with DaisyUI.

## Usage

### Recommended: CarouselItem Children (Best Developer Experience)
```tsx
import { Carousel, CarouselItem } from '@/components';

<Carousel>
  <CarouselItem>
    <img src="image1.jpg" alt="Image 1" />
  </CarouselItem>
  <CarouselItem>
    <img src="image2.jpg" alt="Image 2" />
  </CarouselItem>
  <CarouselItem>
    <img src="image3.jpg" alt="Image 3" />
  </CarouselItem>
</Carousel>
```

### Data-Driven with 'each' Prop (Built-in Foreach)
```tsx
<Carousel each={imageArray}>
  {(image, index) => (
    <CarouselItem>
      <img src={image.src} alt={image.alt} />
    </CarouselItem>
  )}
</Carousel>
```

### Legacy: Direct JSX Children (Backward Compatibility)
```tsx
<Carousel>
  <div class="carousel-item">Slide 1</div>
  <div class="carousel-item">Slide 2</div>
  <div class="carousel-item">Slide 3</div>
</Carousel>
```

## Components

### Carousel Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | JSX.Element \| ((item: T, index: () => number) => JSX.Element) | - | The slides to display. For best results, use CarouselItem components as children |
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

### CarouselItem Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | JSX.Element | - | The content to display inside the carousel item |
| class | string | - | Additional CSS classes to apply to the carousel item |
| classList | Record<string, boolean> | - | Dynamic class list for conditional styling |
| id | string | - | Optional ID for the carousel item (useful for scroll-to functionality) |

## Accessibility
- Supports full keyboard navigation with arrow keys, Home, and End
- Includes proper ARIA attributes (role="region", aria-label, aria-pressed)
- Compatible with screen readers
- Navigation buttons are properly labeled and disabled when appropriate
- Carousel items have appropriate tab order
- Each CarouselItem is automatically focusable

## Examples

### Basic Carousel with CarouselItem
```tsx
<Carousel>
  <CarouselItem>
    <div class="hero min-h-32 bg-base-200">
      <div class="hero-content text-center">
        <h1 class="text-5xl font-bold">Slide 1</h1>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem>
    <div class="hero min-h-32 bg-primary text-primary-content">
      <div class="hero-content text-center">
        <h1 class="text-5xl font-bold">Slide 2</h1>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem>
    <div class="hero min-h-32 bg-secondary text-secondary-content">
      <div class="hero-content text-center">
        <h1 class="text-5xl font-bold">Slide 3</h1>
      </div>
    </div>
  </CarouselItem>
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
    <CarouselItem class="w-full">
      <img 
        src={image.src} 
        alt={image.alt}
        class="w-full h-64 object-cover"
      />
    </CarouselItem>
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
    <CarouselItem class="w-64">
      <div class="card bg-base-100 shadow-xl">
        <figure>
          <img src={product.image} alt={product.name} class="h-48 w-full object-cover" />
        </figure>
        <div class="card-body">
          <h3 class="card-title">
            {product.name}
            {product.featured && <div class="badge badge-secondary">Featured</div>}
          </h3>
          <p class="text-lg font-bold">${product.price}</p>
        </div>
      </div>
    </CarouselItem>
  )}
</Carousel>
```

### Vertical Carousel with Navigation
```tsx
<Carousel vertical showNavigation>
  <CarouselItem>
    <img src="image1.jpg" alt="Image 1" class="h-48 w-full object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="image2.jpg" alt="Image 2" class="h-48 w-full object-cover" />
  </CarouselItem>
  <CarouselItem>
    <img src="image3.jpg" alt="Image 3" class="h-48 w-full object-cover" />
  </CarouselItem>
</Carousel>
```

### Carousel with Custom Styled Items
```tsx
<Carousel snap="center" showIndicators>
  <CarouselItem class="w-96 h-64">
    <div class="hero min-h-full bg-primary text-primary-content">
      <div class="hero-content text-center">
        <h1 class="text-3xl font-bold">Wide Card 1</h1>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem class="w-64 h-64">
    <div class="hero min-h-full bg-secondary text-secondary-content">
      <div class="hero-content text-center">
        <h1 class="text-3xl font-bold">Card 2</h1>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem class="w-80 h-64">
    <div class="hero min-h-full bg-accent text-accent-content">
      <div class="hero-content text-center">
        <h1 class="text-3xl font-bold">Medium Card 3</h1>
      </div>
    </div>
  </CarouselItem>
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
      <CarouselItem>
        <div class="hero min-h-32 bg-base-200">
          <div class="hero-content">
            <h1 class="text-3xl">Slide 1</h1>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="hero min-h-32 bg-primary text-primary-content">
          <div class="hero-content">
            <h1 class="text-3xl">Slide 2</h1>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="hero min-h-32 bg-secondary text-secondary-content">
          <div class="hero-content">
            <h1 class="text-3xl">Slide 3</h1>
          </div>
        </div>
      </CarouselItem>
    </Carousel>
  );
}
```

## Usage Patterns

### When to Use Each Pattern

**CarouselItem Children (Recommended)** - Use when:
- You want the best developer experience and TypeScript support
- You need consistent styling and structure for all slides
- You want proper accessibility features built-in
- You need to apply custom classes or IDs to individual slides

**Data-Driven with 'each'** - Use when:
- You have dynamic data arrays (images, products, etc.)
- You want consistent rendering for each item
- You need to handle varying array lengths
- You want to leverage SolidJS's reactive `For` component

**Direct JSX Children (Legacy)** - Use when:
- Migrating from existing carousel implementations
- You need complete control over the slide structure
- Working with third-party components that provide their own carousel-item structure

## Benefits of CarouselItem

### Better Developer Experience
- **Consistent Structure**: All slides have the same base styling and behavior
- **TypeScript Support**: Better autocomplete and type checking
- **Composability**: Can be easily styled and customized per slide
- **Accessibility**: Built-in focus management and ARIA attributes

### Enhanced Functionality
- **Custom Classes**: Apply different widths, heights, and styles per slide
- **IDs for Navigation**: Useful for programmatic scrolling or deep linking
- **Consistent Spacing**: Proper DaisyUI carousel-item implementation
- **Responsive Design**: Works seamlessly with Tailwind CSS utilities

## DaisyUI Classes
This component uses the following official DaisyUI classes:
- `.carousel` - Base carousel container
- `.carousel-item` - Individual slide container (applied automatically by CarouselItem)
- `.carousel-vertical` - Vertical orientation
- `.carousel-horizontal` - Horizontal orientation (default)
- `.carousel-start` - Start snap alignment
- `.carousel-center` - Center snap alignment  
- `.carousel-end` - End snap alignment

## Notes
- **CarouselItem is the recommended approach** for new implementations
- The carousel is fully responsive and works with any slide content
- Navigation controls are optional and only show when enabled
- Supports both controlled and uncontrolled usage patterns
- Handles edge cases like empty children and single slides gracefully
- Built-in keyboard navigation follows standard accessibility patterns
- The `each` prop provides a built-in foreach pattern using SolidJS's `For` component
- Legacy direct JSX children are still supported for backward compatibility
