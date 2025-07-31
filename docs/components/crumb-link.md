# CrumbLink Component

## Component Overview

The CrumbLink component represents individual breadcrumb items within a Breadcrumbs navigation. It's designed to be used as children of the Breadcrumbs component and provides flexible rendering options for different types of navigation elements.

## Usage Examples

### Basic Link

```tsx
import { CrumbLink } from "solid-daisyui";

<CrumbLink href="/">Home</CrumbLink>
```

### Clickable Button

```tsx
<CrumbLink onClick={() => navigate("/products")}>Products</CrumbLink>
```

### Current Page

```tsx
<CrumbLink current>Current Page</CrumbLink>
```

### With Custom Styling

```tsx
<CrumbLink href="/home" class="text-primary font-bold">
  Home
</CrumbLink>
```

### With Conditional Classes

```tsx
<CrumbLink 
  href="/products" 
  classList={{ active: isActive, highlight: shouldHighlight }}
>
  Products
</CrumbLink>
```

### With Custom Content

```tsx
<CrumbLink href="/dashboard">
  <span class="flex items-center gap-2">
    <HomeIcon />
    Dashboard
  </span>
</CrumbLink>
```

### With Solid Router (Future Enhancement)

When solid-router is available, you can pass the A component:

```tsx
import { A } from "@solidjs/router";

<CrumbLink>
  <A href="/products" class="hover:text-primary">
    Products
  </A>
</CrumbLink>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | `undefined` | Content to display inside the breadcrumb link |
| href | `string` | `undefined` | URL to link to (renders the content as an anchor element) |
| onClick | `() => void` | `undefined` | Click handler (renders the content as a button element) |
| current | `boolean` | `false` | Marks item as current page (adds `aria-current="page"`) |
| class | `string` | `undefined` | Additional CSS classes to apply to the inner element |
| classList | `Record<string, boolean>` | `undefined` | Dynamic class list for conditional styling |

## Rendering Behavior

The CrumbLink component renders different elements based on the props provided:

1. **Link (`<a>`)**: When `href` prop is provided
2. **Button (`<button>`)**: When `onClick` prop is provided  
3. **Span (`<span>`)**: When neither `href` nor `onClick` is provided (typically for current page)

All rendered elements are wrapped in a `<li>` element for proper list semantics.

## Priority Order

When multiple navigation props are provided, they follow this priority:

1. `href` - Always takes precedence and renders as a link
2. `onClick` - Used when no `href` is provided, renders as a button
3. Neither - Renders as a static span

## Accessibility Features

- Automatically applies `aria-current="page"` when `current` prop is true
- Supports keyboard navigation for interactive elements (Enter/Space keys)
- Uses semantic HTML elements (`<a>`, `<button>`, `<span>`)
- Proper list item structure with `<li>` wrapper
- Screen reader compatible

## HTML Structure

### Link Element
```html
<li>
  <a href="/products" class="custom-class">Products</a>
</li>
```

### Button Element
```html
<li>
  <button type="button" class="custom-class">Products</button>
</li>
```

### Static Element (Current Page)
```html
<li>
  <span aria-current="page" class="custom-class">Current Page</span>
</li>
```

## Integration with Breadcrumbs

CrumbLink is designed to be used within a Breadcrumbs component:

```tsx
<Breadcrumbs>
  <CrumbLink href="/">Home</CrumbLink>
  <CrumbLink href="/products">Products</CrumbLink>
  <CrumbLink href="/products/electronics">Electronics</CrumbLink>
  <CrumbLink current>Current Item</CrumbLink>
</Breadcrumbs>
```

## Router Integration

The component is designed to work with different routing solutions:

### Standard HTML Links
```tsx
<CrumbLink href="/products">Products</CrumbLink>
```

### Click Handlers
```tsx
<CrumbLink onClick={() => router.push("/products")}>Products</CrumbLink>
```

### Solid Router A Component
```tsx
<CrumbLink>
  <A href="/products">Products</A>
</CrumbLink>
```

## Notes

- Always renders a `<li>` wrapper for proper list semantics
- Content is passed as `children` for maximum flexibility
- Keyboard navigation is automatically handled for interactive elements
- The `class` and `classList` props are applied to the inner element, not the `<li>` wrapper
- When used with router components as children, navigation behavior is handled by the router component