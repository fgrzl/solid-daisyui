# Tooltip Component

## Overview
The Tooltip component displays contextual information when users hover over or focus on an element. It follows DaisyUI design patterns and provides comprehensive accessibility support.

## Usage
```tsx
import { Tooltip } from "solid-daisyui";

// Basic tooltip
<Tooltip tip="This is helpful information">
  <button>Hover me</button>
</Tooltip>

// Positioned tooltip
<Tooltip tip="Bottom tooltip" position="bottom">
  <span>Hover for bottom tooltip</span>
</Tooltip>

// Colored tooltip
<Tooltip tip="Primary tooltip" color="primary">
  <a href="#">Link with tooltip</a>
</Tooltip>

// Force open (useful for testing)
<Tooltip tip="Always visible" open={true}>
  <div>This tooltip is always shown</div>
</Tooltip>
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | JSX.Element | - | **Required.** The element that triggers the tooltip |
| tip | string | - | **Required.** The text content displayed in the tooltip |
| position | "top" \| "bottom" \| "left" \| "right" | "top" | Position of the tooltip relative to the target |
| color | "primary" \| "secondary" \| "accent" \| "neutral" \| "success" \| "warning" \| "error" \| "info" | - | Color variant of the tooltip |
| open | boolean | - | Force the tooltip to be visible (useful for testing) |
| class | string | - | Additional CSS classes to apply |
| classList | Record<string, boolean> | - | Dynamic class list for conditional styling |

## Position Variants
```tsx
// Top (default)
<Tooltip tip="Top tooltip">
  <button>Default (top)</button>
</Tooltip>

// Bottom
<Tooltip tip="Bottom tooltip" position="bottom">
  <button>Bottom</button>
</Tooltip>

// Left
<Tooltip tip="Left tooltip" position="left">
  <button>Left</button>
</Tooltip>

// Right
<Tooltip tip="Right tooltip" position="right">
  <button>Right</button>
</Tooltip>
```

## Color Variants
```tsx
// Primary
<Tooltip tip="Primary tooltip" color="primary">
  <button>Primary</button>
</Tooltip>

// Secondary
<Tooltip tip="Secondary tooltip" color="secondary">
  <button>Secondary</button>
</Tooltip>

// Accent
<Tooltip tip="Accent tooltip" color="accent">
  <button>Accent</button>
</Tooltip>

// Success
<Tooltip tip="Success tooltip" color="success">
  <button>Success</button>
</Tooltip>

// Warning
<Tooltip tip="Warning tooltip" color="warning">
  <button>Warning</button>
</Tooltip>

// Error
<Tooltip tip="Error tooltip" color="error">
  <button>Error</button>
</Tooltip>
```

## Accessibility
The Tooltip component includes comprehensive accessibility features:

- **ARIA Support**: Automatically adds `aria-describedby` attributes to focusable child elements
- **Keyboard Navigation**: Shows on focus and hides on blur for keyboard users  
- **Screen Reader Support**: Tooltip content is available to assistive technologies via hidden elements with `role="tooltip"`
- **Semantic HTML**: Uses proper ARIA attributes and semantic structure

### Accessibility Best Practices
- Use descriptive tooltip text that adds value for users
- Ensure tooltip content is concise and relevant
- Test with keyboard navigation and screen readers
- Consider users with motor disabilities who may have difficulty with hover interactions

## Interactions
- **Mouse**: Shows on hover (`mouseenter`) and hides when leaving (`mouseleave`)
- **Keyboard**: Shows on focus and hides on blur for keyboard navigation
- **Programmatic**: Can be controlled via the `open` prop

## Examples

### Basic Tooltip
```tsx
<Tooltip tip="Click to submit the form">
  <button type="submit">Submit</button>
</Tooltip>
```

### Complex Content
```tsx
<Tooltip tip="Edit user profile settings">
  <div class="flex items-center gap-2">
    <UserIcon />
    <span>Profile</span>
  </div>
</Tooltip>
```

### Form Field Help
```tsx
<div class="form-field">
  <label>Username</label>
  <Tooltip tip="Must be 3-20 characters, letters and numbers only" position="right">
    <input type="text" placeholder="Enter username" />
  </Tooltip>
</div>
```

### Icon Buttons
```tsx
<Tooltip tip="Save document" position="bottom">
  <button class="btn btn-square">
    <SaveIcon />
  </button>
</Tooltip>
```

## Technical Notes
- Built with SolidJS reactive patterns using `createSignal` and `createEffect`
- Uses DaisyUI CSS classes: `tooltip`, `tooltip-{position}`, `tooltip-{color}`, `tooltip-open`
- Implements proper event handling for mouse and keyboard interactions
- Follows SolidJS best practices for component composition and reactivity
- Generates unique IDs for accessibility attributes using `createUniqueId()`

## Browser Support
Works in all modern browsers that support:
- CSS Grid and Flexbox (for DaisyUI styles)
- Modern DOM APIs (addEventListener, querySelector)
- ARIA attributes and accessibility APIs
