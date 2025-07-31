# CarouselItem Component

## Overview
A wrapper component for individual carousel slides that ensures proper DaisyUI styling and accessibility. Designed to be used within a Carousel component container.

## Usage

### Basic Usage
```tsx
import { Carousel, CarouselItem } from '@/components';

<Carousel>
  <CarouselItem>
    <img src="image1.jpg" alt="Image 1" />
  </CarouselItem>
  <CarouselItem>
    <img src="image2.jpg" alt="Image 2" />
  </CarouselItem>
</Carousel>
```

### With Custom Classes
```tsx
<Carousel>
  <CarouselItem class="w-96 h-64">
    <div class="hero min-h-full bg-primary text-primary-content">
      <div class="hero-content text-center">
        <h1 class="text-3xl font-bold">Wide Slide</h1>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem class="w-64 h-64">
    <div class="hero min-h-full bg-secondary text-secondary-content">
      <div class="hero-content text-center">
        <h1 class="text-3xl font-bold">Square Slide</h1>
      </div>
    </div>
  </CarouselItem>
</Carousel>
```

### With IDs for Navigation
```tsx
<Carousel>
  <CarouselItem id="intro-slide">
    <div class="hero min-h-32 bg-base-200">
      <div class="hero-content text-center">
        <h1 class="text-5xl font-bold">Welcome!</h1>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem id="features-slide">
    <div class="hero min-h-32 bg-primary text-primary-content">
      <div class="hero-content text-center">
        <h1 class="text-5xl font-bold">Features</h1>
      </div>
    </div>
  </CarouselItem>
</Carousel>
```

## Props
| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | JSX.Element | - | The content to display inside the carousel item |
| class | string | - | Additional CSS classes to apply to the carousel item |
| classList | Record<string, boolean> | - | Dynamic class list for conditional styling |
| id | string | - | Optional ID for the carousel item (useful for scroll-to functionality) |

## Features

### Automatic DaisyUI Integration
- Automatically applies the `carousel-item` class
- Ensures proper styling and behavior within DaisyUI carousels
- Handles focus management and accessibility attributes

### Customizable Sizing
```tsx
<Carousel snap="start">
  <CarouselItem class="w-full">
    <img src="banner.jpg" alt="Full width banner" class="w-full h-48 object-cover" />
  </CarouselItem>
  <CarouselItem class="w-96">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Fixed Width Card</h2>
        <p>This card has a fixed width of 24rem (96 * 0.25rem)</p>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem class="w-80">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Medium Width Card</h2>
        <p>This card has a width of 20rem (80 * 0.25rem)</p>
      </div>
    </div>
  </CarouselItem>
</Carousel>
```

### Responsive Design Support
```tsx
<Carousel>
  <CarouselItem class="w-full md:w-1/2 lg:w-1/3">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Responsive Card</h2>
        <p>Full width on mobile, half on tablet, third on desktop</p>
      </div>
    </div>
  </CarouselItem>
</Carousel>
```

## Accessibility
- **Automatic Focus Management**: Each CarouselItem is automatically focusable with `tabindex="0"`
- **Keyboard Navigation**: Participates in carousel keyboard navigation
- **Screen Reader Support**: Works seamlessly with assistive technologies
- **Semantic Structure**: Uses proper HTML structure for carousel items

## Examples

### Image Gallery
```tsx
const images = [
  { src: "landscape1.jpg", alt: "Mountain landscape" },
  { src: "landscape2.jpg", alt: "Ocean view" },
  { src: "landscape3.jpg", alt: "Forest scene" }
];

<Carousel each={images} showNavigation showIndicators>
  {(image) => (
    <CarouselItem class="w-full">
      <img 
        src={image.src} 
        alt={image.alt} 
        class="w-full h-64 object-cover rounded-lg"
      />
    </CarouselItem>
  )}
</Carousel>
```

### Product Showcase
```tsx
<Carousel snap="center" showIndicators>
  <CarouselItem class="w-72">
    <div class="card bg-base-100 shadow-xl">
      <figure>
        <img src="product1.jpg" alt="Product 1" class="h-48 w-full object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Premium Headphones</h2>
        <p>High-quality audio experience</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem class="w-72">
    <div class="card bg-base-100 shadow-xl">
      <figure>
        <img src="product2.jpg" alt="Product 2" class="h-48 w-full object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Wireless Speaker</h2>
        <p>Portable sound solution</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </CarouselItem>
</Carousel>
```

### Mixed Content Types
```tsx
<Carousel>
  <CarouselItem class="w-full">
    <div class="hero min-h-32 bg-gradient-to-r from-primary to-secondary text-primary-content">
      <div class="hero-content text-center">
        <div>
          <h1 class="text-5xl font-bold">Welcome!</h1>
          <p class="py-6">Discover amazing products</p>
        </div>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem class="w-80">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Downloads</div>
        <div class="stat-value">31K</div>
        <div class="stat-desc">Jan 1st - Feb 1st</div>
      </div>
    </div>
  </CarouselItem>
  <CarouselItem class="w-96">
    <div class="mockup-code">
      <pre data-prefix="$"><code>npm install solid-daisyui</code></pre>
      <pre data-prefix=">" class="text-warning"><code>installing...</code></pre>
      <pre data-prefix=">" class="text-success"><code>Done!</code></pre>
    </div>
  </CarouselItem>
</Carousel>
```

## Best Practices

### Use CarouselItem for Consistency
```tsx
// ✅ Recommended - Consistent structure and styling
<Carousel>
  <CarouselItem>
    <img src="image1.jpg" alt="Image 1" />
  </CarouselItem>
  <CarouselItem>
    <img src="image2.jpg" alt="Image 2" />
  </CarouselItem>
</Carousel>

// ❌ Avoid - Inconsistent structure
<Carousel>
  <div class="carousel-item">
    <img src="image1.jpg" alt="Image 1" />
  </div>
  <img src="image2.jpg" alt="Image 2" />
</Carousel>
```

### Leverage Custom Classes for Layout
```tsx
// ✅ Good - Use utility classes for responsive design
<CarouselItem class="w-full sm:w-1/2 lg:w-1/3">
  <div class="aspect-square bg-base-200">
    {/* Content */}
  </div>
</CarouselItem>

// ✅ Good - Use specific widths for fixed layouts
<CarouselItem class="w-80">
  <div class="card bg-base-100 shadow-xl">
    {/* Card content */}
  </div>
</CarouselItem>
```

### Use IDs for Navigation
```tsx
// ✅ Good - IDs enable programmatic navigation
<Carousel>
  <CarouselItem id="hero">
    <div class="hero bg-base-200">
      {/* Hero content */}
    </div>
  </CarouselItem>
  <CarouselItem id="features">
    <div class="grid grid-cols-3 gap-4">
      {/* Features grid */}
    </div>
  </CarouselItem>
</Carousel>

// JavaScript: document.getElementById('features').scrollIntoView();
```

## DaisyUI Integration
CarouselItem automatically applies the `carousel-item` class and works seamlessly with all DaisyUI carousel features:
- **Snap Scrolling**: Works with `snap="start|center|end"` on parent Carousel
- **Orientation**: Compatible with both horizontal and vertical carousels  
- **Responsive**: Inherits responsive behavior from DaisyUI
- **Theming**: Automatically adapts to DaisyUI themes

## Notes
- CarouselItem should always be used within a Carousel component
- The component automatically handles the `carousel-item` class application
- Custom classes are merged with the base `carousel-item` class
- Each CarouselItem participates in the carousel's navigation and accessibility features
- The component is optimized for performance with SolidJS's reactive system