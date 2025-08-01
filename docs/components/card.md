# Card Component

## Overview

The Card component provides a structured, styled container for displaying content. It follows DaisyUI Card component patterns and supports images, titles, actions, and various layouts with full accessibility compliance.

## Usage

```tsx
import { Card } from "solid-daisyui";

// Basic card
<Card title="Card Title">
  Card content goes here
</Card>

// Card with image and actions
<Card
  title="Featured Article"
  imageSrc="/article-image.jpg"
  imageAlt="Article preview"
  actions={<button class="btn btn-primary">Read More</button>}
  bordered
>
  This is a preview of the article content...
</Card>

// Clickable card
<Card
  title="Interactive Card"
  onClick={(event) => console.log("Card clicked")}
  ariaLabel="Click to view details"
  compact
>
  Click anywhere on this card
</Card>
```

## Props

| Prop            | Type                         | Default | Description                                               |
| --------------- | ---------------------------- | ------- | --------------------------------------------------------- |
| children        | JSX.Element                  | -       | Main content to display inside the card body              |
| class           | string                       | -       | Additional CSS classes to apply to the card               |
| classList       | Record<string, boolean>      | -       | Dynamic class list for conditional styling                |
| title           | string                       | -       | Title to display in the card header with card-title class |
| titleLevel      | 1-6                          | 2       | Heading level for the title (h1-h6)                       |
| body            | string \| JSX.Element        | -       | Optional body content (alternative to children)           |
| imageSrc        | string                       | -       | Image source URL for the card image                       |
| imageAlt        | string                       | -       | Alternative text for the card image                       |
| imagePosition   | "top" \| "bottom"            | "top"   | Position of the image                                     |
| actions         | JSX.Element \| JSX.Element[] | -       | Action buttons or elements to display                     |
| actionsPosition | "start" \| "center" \| "end" | "end"   | Alignment of actions                                      |
| bordered        | boolean                      | false   | Whether to apply card-bordered class                      |
| compact         | boolean                      | false   | Whether to apply card-compact class                       |
| side            | boolean                      | false   | Whether to apply card-side class for horizontal layout    |
| glass           | boolean                      | false   | Whether to apply glass effect class                       |
| onClick         | (event: MouseEvent) => void  | -       | Click event handler. Makes the card clickable             |
| ariaLabel       | string                       | -       | ARIA label for accessibility when clickable               |
| ariaDescribedBy | string                       | -       | ARIA described-by for additional context                  |

## DaisyUI Variants

### Style Variants

- `bordered` - Adds border styling with card-bordered
- `compact` - Reduces padding with card-compact
- `side` - Horizontal layout with card-side
- `glass` - Glassmorphism effect with glass class

### Layout Options

- **Image positioning**: top (default) or bottom
- **Action alignment**: start, center, end (default)
- **Clickable behavior**: Automatic role and keyboard handling

## Accessibility

The Card component implements WCAG 2.1 AA standards:

- **Semantic structure**: Uses `<article>` for content cards
- **Interactive cards**: Automatic `role="button"` with keyboard support
- **Keyboard navigation**: Enter and Space key support for clickable cards
- **ARIA attributes**: Proper labeling and descriptions
- **Focus management**: Tab-accessible when clickable
- **Screen reader compatibility**: Proper heading hierarchy and content structure

## Examples

### Basic Content Card

```tsx
<Card title="Product Information" bordered>
  <p>Detailed product description and specifications.</p>
</Card>
```

### Image Card with Actions

```tsx
<Card
  title="Product Name"
  imageSrc="/product.jpg"
  imageAlt="Product image"
  actions={[
    <button class="btn btn-primary">Buy Now</button>,
    <button class="btn btn-ghost">Add to Cart</button>,
  ]}
  actionsPosition="center"
  glass
>
  Product description and details
</Card>
```

### Interactive Card

```tsx
<Card
  title="Click to Navigate"
  onClick={() => navigate("/details")}
  ariaLabel="Navigate to product details"
  compact
  side
>
  <div class="flex items-center">
    <Icon name="arrow-right" />
    <span>View Details</span>
  </div>
</Card>
```

## Notes

- Compatible with all DaisyUI themes
- Supports responsive design patterns
- Optimized for performance with SolidJS reactivity
- Fully tree-shakeable when bundled
- Follows semantic HTML standards
- Cross-browser tested and accessible
