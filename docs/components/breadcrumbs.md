# Breadcrumbs Component

## Component Overview

The Breadcrumbs component provides hierarchical navigation paths that allow users to understand their current location within a website or application. It follows DaisyUI design standards and implements WCAG 2.1 AA accessibility guidelines.

## Usage Examples

### Basic Usage with Items

```tsx
import { Breadcrumbs } from "solid-daisyui";

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Current Page", current: true }
];

<Breadcrumbs items={items} />
```

### Custom Separator

```tsx
<Breadcrumbs 
  items={items} 
  separator=" → " 
/>
```

### With Click Handlers

```tsx
const items = [
  { label: "Home", onClick: () => navigate("/") },
  { label: "Products", onClick: () => navigate("/products") },
  { label: "Current Page" }
];

<Breadcrumbs items={items} />
```

### Using Children (Manual Layout)

```tsx
<Breadcrumbs>
  <li><a href="/">Home</a></li>
  <li><a href="/products">Products</a></li>
  <li>Current Page</li>
</Breadcrumbs>
```

### Custom Separator Element

```tsx
const CustomSeparator = () => <span class="text-primary">→</span>;

<Breadcrumbs 
  items={items} 
  separator={<CustomSeparator />} 
/>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| items | `BreadcrumbItem[]` | `undefined` | Array of breadcrumb items to display |
| children | `JSX.Element` | `undefined` | Custom breadcrumb content. Items prop takes precedence |
| separator | `string \| JSX.Element` | `"/"` | Custom separator between breadcrumb items |
| class | `string` | `undefined` | Additional CSS classes to apply |
| classList | `Record<string, boolean>` | `undefined` | Dynamic class list for conditional styling |
| ariaLabel | `string` | `"Breadcrumb"` | Custom aria-label for navigation element |

### BreadcrumbItem Interface

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| label | `string` | `undefined` | Text label to display |
| href | `string` | `undefined` | URL to link to (renders as anchor) |
| onClick | `() => void` | `undefined` | Click handler (renders as button) |
| current | `boolean` | `false` | Marks item as current page (adds aria-current) |
| element | `JSX.Element` | `undefined` | Custom element to render instead of label |

## Accessibility Features

- Uses semantic `<nav>` and `<ol>` elements
- Includes proper ARIA attributes (`role="navigation"`, `aria-label`)
- Current page marked with `aria-current="page"`
- Keyboard navigation support for interactive items
- Screen reader compatible with descriptive labeling

## DaisyUI Classes

The component uses the following DaisyUI classes:
- `breadcrumbs` - Base breadcrumbs styling

## Notes

- When both `items` and `children` are provided, `items` takes precedence
- Items without `href` or `onClick` are rendered as static spans
- Items with `href` are rendered as anchor links
- Items with `onClick` are rendered as buttons with keyboard support
- Custom separators are hidden from screen readers with `aria-hidden="true"`
- Empty items arrays or missing items render an empty list
