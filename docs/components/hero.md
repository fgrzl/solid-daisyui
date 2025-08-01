# Hero Component

## Overview
The Hero component creates prominent banner sections with optional background images and overlays, following DaisyUI standards. It's designed for landing pages, section headers, and featured content areas with full accessibility support.

The Hero component now includes child components **HeroContent** and **HeroOverlay** for more granular control and better composition.

## Quick Start

### Basic Usage (Backward Compatible)
```tsx
import { Hero } from "solid-daisyui";

// Basic hero (legacy way - still works)
<Hero>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">Provident cupiditate voluptatem.</p>
    </div>
  </div>
</Hero>
```

### Recommended Usage (With Child Components)
```tsx
import { Hero, HeroContent, HeroOverlay } from "solid-daisyui";

// Modern composable approach
<Hero backgroundImage="/hero-bg.jpg">
  <HeroOverlay opacity={50} />
  <HeroContent align="center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold text-white">Hello there</h1>
      <p class="py-6 text-white">Provident cupiditate voluptatem.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </HeroContent>
</Hero>

// Or using compound component syntax
<Hero backgroundImage="/hero-bg.jpg">
  <Hero.Overlay opacity={50} />
  <Hero.Content align="center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold text-white">Hello there</h1>
      <p class="py-6 text-white">Provident cupiditate voluptatem.</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </Hero.Content>
</Hero>
```

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

---

## HeroContent Component

### Overview
The HeroContent component provides a structured content area within a Hero component. It automatically applies DaisyUI's `hero-content` class and offers additional alignment options.

### Usage
```tsx
import { Hero, HeroContent } from "solid-daisyui";

<Hero>
  <HeroContent align="center" verticalAlign="center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Welcome</h1>
      <p class="py-6">Your content here</p>
    </div>
  </HeroContent>
</Hero>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `JSX.Element` | - | The content to display inside the hero content area |
| class | `string` | - | Additional CSS classes to apply to the hero content container |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| align | `"center" \| "start" \| "end"` | `"center"` | Horizontal content alignment |
| verticalAlign | `"center" \| "top" \| "bottom"` | `"center"` | Vertical content alignment |

### Examples

#### Centered Content (Default)
```tsx
<HeroContent>
  <div class="max-w-md">
    <h1 class="text-5xl font-bold">Centered Title</h1>
    <p class="py-6">This content is centered horizontally and vertically.</p>
  </div>
</HeroContent>
```

#### Left-Aligned Content
```tsx
<HeroContent align="start" verticalAlign="top">
  <div class="max-w-md">
    <h1 class="text-4xl font-bold">Left Aligned</h1>
    <p class="py-4">Content aligned to the left and top.</p>
  </div>
</HeroContent>
```

#### Multiple Content Sections
```tsx
<Hero>
  <HeroContent align="start">
    <h2>Left Section</h2>
  </HeroContent>
  <HeroContent align="end">
    <h2>Right Section</h2>
  </HeroContent>
</Hero>
```

---

## HeroOverlay Component

### Overview
The HeroOverlay component provides a customizable overlay layer for Hero components with background images. It offers more control than the basic `overlay` prop.

### Usage
```tsx
import { Hero, HeroOverlay, HeroContent } from "solid-daisyui";

<Hero backgroundImage="/background.jpg">
  <HeroOverlay opacity={40} color="bg-primary" />
  <HeroContent>
    <h1 class="text-white">Content over custom overlay</h1>
  </HeroContent>
</Hero>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| class | `string` | - | Additional CSS classes to apply to the hero overlay |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| opacity | `number` | `60` | Overlay opacity value (0-100) |
| color | `string` | `"bg-black"` | Overlay color class (e.g., "bg-black", "bg-primary") |

### Examples

#### Basic Dark Overlay
```tsx
<HeroOverlay />
<!-- Equivalent to: opacity={60} color="bg-black" -->
```

#### Light Overlay
```tsx
<HeroOverlay opacity={20} />
```

#### Colored Overlay
```tsx
<HeroOverlay color="bg-primary" opacity={30} />
```

#### Multiple Layered Overlays
```tsx
<Hero backgroundImage="/complex-bg.jpg">
  <HeroOverlay color="bg-black" opacity={30} />
  <HeroOverlay color="bg-primary" opacity={10} />
  <HeroContent>
    <h1 class="text-white">Layered overlay effects</h1>
  </HeroContent>
</Hero>
```

#### No Overlay (Transparent)
```tsx
<HeroOverlay opacity={0} />
```

---

## Component Composition Examples

### Complete Hero with All Features
```tsx
<Hero 
  backgroundImage="/hero-background.jpg"
  size="screen" 
  aria-label="Main hero section"
>
  <HeroOverlay opacity={50} />
  <HeroContent align="center" verticalAlign="center">
    <div class="max-w-md text-center text-white">
      <h1 class="mb-5 text-5xl font-bold">Amazing Product</h1>
      <p class="mb-5">Revolutionary solution for modern problems.</p>
      <div class="space-x-2">
        <button class="btn btn-primary">Get Started</button>
        <button class="btn btn-outline btn-secondary">Learn More</button>
      </div>
    </div>
  </HeroContent>
</Hero>
```

### Side-by-Side Layout
```tsx
<Hero size="80">
  <HeroContent align="start" class="flex-row">
    <div class="flex-1">
      <h1 class="text-4xl font-bold">Left Content</h1>
      <p>Description on the left side.</p>
    </div>
  </HeroContent>
  <HeroContent align="end" class="flex-row">
    <div class="flex-1">
      <img src="/product.jpg" alt="Product" class="rounded-lg" />
    </div>
  </HeroContent>
</Hero>
```

### Gradient Overlay Effect
```tsx
<Hero backgroundImage="/landscape.jpg">
  <HeroOverlay color="bg-gradient-to-r from-purple-600" opacity={40} />
  <HeroOverlay color="bg-gradient-to-l from-blue-600" opacity={20} />
  <HeroContent>
    <div class="text-center text-white">
      <h1 class="text-6xl font-bold">Gradient Magic</h1>
    </div>
  </HeroContent>
</Hero>
```
