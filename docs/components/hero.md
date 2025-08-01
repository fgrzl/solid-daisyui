# Hero Component

## Overview
The Hero component creates prominent banner sections with optional background images and overlays, following DaisyUI standards. It's designed for landing pages, section headers, and featured content areas with full accessibility support.

## Usage
```tsx
import { Hero } from "solid-daisyui";

// Basic hero
<Hero>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">Provident cupiditate voluptatem.</p>
    </div>
  </div>
</Hero>

// Hero with background image and overlay
<Hero backgroundImage="https://img.daisyui.com/images/stock/photo-1507003211169-0a1dd7228f2d.jpg" overlay>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
      <p class="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</Hero>

// Hero with custom size
<Hero size="screen">
  <div class="hero-content">
    <div class="text-center">
      <h1 class="text-4xl font-bold">Full screen hero</h1>
    </div>
  </div>
</Hero>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `JSX.Element` | - | The content to display inside the hero section |
| class | `string` | - | Additional CSS classes to apply to the hero container |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| backgroundImage | `string` | - | URL of the background image to display in the hero section |
| overlay | `boolean` | `false` | Whether to show a dark overlay over the background image for better text readability |
| minHeight | `string` | - | Custom minimum height value (e.g., "400px", "50vh") |
| size | `"screen" \| "96" \| "80" \| "64" \| "48" \| "32"` | - | Predefined height sizes using Tailwind CSS classes |
| noContentWrapper | `boolean` | `false` | If true, children will not be automatically wrapped in hero-content div |
| role | `string` | - | ARIA role attribute for accessibility (e.g., "banner", "main") |
| aria-label | `string` | - | ARIA label for screen readers |
| aria-labelledby | `string` | - | ID of element that labels this hero section |

## Accessibility
- Uses semantic `<section>` element by default
- Supports ARIA attributes for screen reader compatibility
- Supports custom roles like "banner" or "main" for proper landmark navigation
- Includes proper labeling options with `aria-label` and `aria-labelledby`
- Background images with overlay maintain proper contrast for text readability

## Examples

### Basic Hero
```tsx
<Hero>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Welcome</h1>
      <p class="py-6">Your journey starts here.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</Hero>
```

### Hero with Background Image
```tsx
<Hero 
  backgroundImage="/hero-bg.jpg" 
  overlay
  aria-label="Main hero banner"
>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Amazing Product</h1>
      <p class="mb-5">Revolutionary solution for your needs.</p>
      <button class="btn btn-primary">Learn More</button>
    </div>
  </div>
</Hero>
```

### Full Screen Hero
```tsx
<Hero size="screen" role="banner">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-6xl font-bold">Big Impact</h1>
      <p class="text-lg">Make a statement with full screen presence.</p>
    </div>
  </div>
</Hero>
```

### Custom Content Structure
```tsx
<Hero noContentWrapper>
  <div class="hero-content flex-col lg:flex-row">
    <img src="/hero-image.jpg" alt="Product" class="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 class="text-5xl font-bold">Box Office News!</h1>
      <p class="py-6">Stay updated with the latest releases and entertainment news.</p>
      <button class="btn btn-primary">Subscribe</button>
    </div>
  </div>
</Hero>
```

## Notes
- Content is automatically wrapped in `hero-content` div unless `noContentWrapper` is true
- Background images are applied via inline styles for dynamic URLs
- Overlay uses DaisyUI's `hero-overlay` class with `bg-opacity-60` for consistent styling
- Size variants apply Tailwind CSS `min-h-*` classes for responsive height control
- Component follows DaisyUI naming conventions and supports all official modifier classes
