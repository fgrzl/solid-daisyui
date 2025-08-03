# Divider Component

## Component Overview

The Divider component creates horizontal or vertical separators with optional text content, following official DaisyUI Divider patterns. It provides full support for all official DaisyUI divider features including orientation variants, position/theme styling, color variants, and accessibility features with proper ARIA attributes.

The component can display text or other content in the center of the divider line, commonly used for section separators with labels like "OR", "AND", or decorative elements. It's performance-optimized with SolidJS createMemo for efficient class calculations.

## Usage Examples

### Basic Divider
```tsx
import { Divider } from "solid-daisyui";

<Divider />
<Divider>OR</Divider>
```

### Orientation Variants
```tsx
{/* Horizontal divider (default behavior) */}
<Divider orientation="horizontal">LOGIN</Divider>

{/* Vertical divider */}
<Divider orientation="vertical">OR</Divider>
```

### Position/Theme Variants
```tsx
<Divider position="neutral">Neutral</Divider>
<Divider position="primary">Primary</Divider>
<Divider position="secondary">Secondary</Divider>
<Divider position="accent">Accent</Divider>
```

### Color Variants
```tsx
<Divider color="info">Info</Divider>
<Divider color="success">Success</Divider>
<Divider color="warning">Warning</Divider>
<Divider color="error">Error</Divider>
```

### Complex Content
```tsx
{/* With icons */}
<Divider>
  <span>⭐</span>
</Divider>

{/* With complex JSX */}
<Divider>
  <div class="flex items-center gap-2">
    <span>📝</span>
    <span>Form Section</span>
  </div>
</Divider>
```

### Custom Styling
```tsx
<Divider 
  class="custom-divider" 
  classList={{ "active": true }}
>
  Custom Divider
</Divider>
```

### Accessibility Enhanced
```tsx
<Divider 
  aria-label="Section separator between login and signup options"
  aria-orientation="horizontal"
>
  OR
</Divider>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The content to display inside the divider (text or icons that appear in the center) |
| class | `string` | - | Additional CSS classes to apply to the divider |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| orientation | `"horizontal" \| "vertical"` | - | **Official DaisyUI**: The orientation of the divider (divider-horizontal, divider-vertical) |
| position | `"neutral" \| "primary" \| "secondary" \| "accent"` | - | **Official DaisyUI**: Position/theme variants for divider styling |
| color | `"info" \| "success" \| "warning" \| "error"` | - | **Official DaisyUI**: Color variants for divider styling |
| aria-label | `string` | - | Accessible label for screen readers to describe the divider's purpose |
| aria-orientation | `"horizontal" \| "vertical"` | - | ARIA orientation attribute for accessibility compliance |

## Accessibility Features

- **ARIA Attributes**: Proper `role="separator"` and `aria-orientation` attributes
- **Screen Reader Support**: Optional `aria-label` for descriptive content
- **Semantic HTML**: Uses div element with proper semantic roles
- **WCAG 2.1 AA Compliant**: Meets accessibility standards for separators
- **Focus Management**: Properly integrated into page focus flow

## DaisyUI Classes Used

### Base Classes
- `divider` - Base divider class with proper styling

### Orientation Variants
- `divider-horizontal` - Horizontal divider orientation
- `divider-vertical` - Vertical divider orientation

### Position/Theme Variants
- `divider-neutral` - Neutral theme styling
- `divider-primary` - Primary theme styling
- `divider-secondary` - Secondary theme styling
- `divider-accent` - Accent theme styling

### Color Variants
- `divider-info` - Info color styling
- `divider-success` - Success color styling
- `divider-warning` - Warning color styling
- `divider-error` - Error color styling

## Notes

- The component follows DaisyUI's official Divider patterns and styling
- Default behavior is horizontal divider without explicit orientation class
- Performance optimized with SolidJS `createMemo` for class calculations
- Supports all official DaisyUI divider variants and modifiers
- Text/content appears in the center of the divider line
- Validation is included for all DaisyUI variant props with graceful error handling
- Component supports both controlled and uncontrolled usage patterns
- All variant props are validated against official DaisyUI class names
