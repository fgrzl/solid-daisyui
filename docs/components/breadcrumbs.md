# Breadcrumbs Component

## Component Overview

The Breadcrumbs component provides hierarchical navigation paths that allow users to understand their current location within a website or application. It follows DaisyUI design standards and implements WCAG 2.1 AA accessibility guidelines.

The component now supports two approaches:

- **Recommended**: Composable structure using `Breadcrumb` components for better flexibility
- **Legacy**: Items array for backward compatibility

## Usage Examples

### Recommended: Composable Structure with Breadcrumb

```tsx
import { Breadcrumbs, Breadcrumb } from "solid-daisyui";

<Breadcrumbs>
  <Breadcrumb href="/">Home</Breadcrumb>
  <Breadcrumb href="/products">Products</Breadcrumb>
  <Breadcrumb href="/products/electronics">Electronics</Breadcrumb>
  <Breadcrumb current>Current Page</Breadcrumb>
</Breadcrumbs>;
```

### With Click Handlers

```tsx
<Breadcrumbs>
  <Breadcrumb onClick={() => navigate("/")}>Home</Breadcrumb>
  <Breadcrumb onClick={() => navigate("/products")}>Products</Breadcrumb>
  <Breadcrumb current>Current Page</Breadcrumb>
</Breadcrumbs>
```

### With Solid Router (Future Enhancement)

When using with solid-router, you can pass the A component as children:

```tsx
import { A } from "@solidjs/router";

<Breadcrumbs>
  <Breadcrumb>
    <A href="/">Home</A>
  </Breadcrumb>
  <Breadcrumb>
    <A href="/products">Products</A>
  </Breadcrumb>
  <Breadcrumb current>Current Page</Breadcrumb>
</Breadcrumbs>;
```

### Legacy: Items Array (Deprecated)

```tsx
import { Breadcrumbs } from "solid-daisyui";

const items = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Current Page", current: true },
];

<Breadcrumbs items={items} />;
```

### Legacy: Custom Separator

```tsx
<Breadcrumbs items={items} separator=" → " />
```

### Legacy: With Click Handlers

```tsx
const items = [
  { label: "Home", onClick: () => navigate("/") },
  { label: "Products", onClick: () => navigate("/products") },
  { label: "Current Page" },
];

<Breadcrumbs items={items} />;
```

### Legacy: Using Children (Manual Layout)

```tsx
<Breadcrumbs>
  <li>
    <a href="/">Home</a>
  </li>
  <li>
    <a href="/products">Products</a>
  </li>
  <li>Current Page</li>
</Breadcrumbs>
```

### Legacy: Custom Separator Element

```tsx
const CustomSeparator = () => <span class="text-primary">→</span>;

<Breadcrumbs items={items} separator={<CustomSeparator />} />;
```

## Props

### Breadcrumbs Props

| Name      | Type                      | Default        | Description                                                                           |
| --------- | ------------------------- | -------------- | ------------------------------------------------------------------------------------- |
| items     | `BreadcrumbItem[]`        | `undefined`    | **Deprecated**: Array of breadcrumb items to display. Use Breadcrumb children instead |
| children  | `JSX.Element`             | `undefined`    | Breadcrumb content as Breadcrumb components or custom JSX                             |
| separator | `string \| JSX.Element`   | `"/"`          | Custom separator between breadcrumb items (only used with items prop)                 |
| class     | `string`                  | `undefined`    | Additional CSS classes to apply                                                       |
| classList | `Record<string, boolean>` | `undefined`    | Dynamic class list for conditional styling                                            |
| ariaLabel | `string`                  | `"Breadcrumb"` | Custom aria-label for navigation element                                              |

### Breadcrumb Props

| Name      | Type                      | Default     | Description                                         |
| --------- | ------------------------- | ----------- | --------------------------------------------------- |
| children  | `JSX.Element`             | `undefined` | Content to display inside the breadcrumb link       |
| href      | `string`                  | `undefined` | URL to link to (renders as anchor)                  |
| onClick   | `() => void`              | `undefined` | Click handler (renders as button)                   |
| current   | `boolean`                 | `false`     | Marks item as current page (adds aria-current)      |
| class     | `string`                  | `undefined` | Additional CSS classes to apply to the link element |
| classList | `Record<string, boolean>` | `undefined` | Dynamic class list for conditional styling          |

### BreadcrumbItem Interface (Legacy)

| Name    | Type          | Default     | Description                                    |
| ------- | ------------- | ----------- | ---------------------------------------------- |
| label   | `string`      | `undefined` | Text label to display                          |
| href    | `string`      | `undefined` | URL to link to (renders as anchor)             |
| onClick | `() => void`  | `undefined` | Click handler (renders as button)              |
| current | `boolean`     | `false`     | Marks item as current page (adds aria-current) |
| element | `JSX.Element` | `undefined` | Custom element to render instead of label      |

## Accessibility Features

- Uses semantic `<div role="navigation">` and `<ul>` elements following DaisyUI structure
- Includes proper ARIA attributes (`role="navigation"`, `aria-label`)
- Current page marked with `aria-current="page"`
- Keyboard navigation support for interactive items (Enter/Space keys)
- Screen reader compatible with descriptive labeling
- Separators hidden from assistive technology (legacy items mode only)

## DaisyUI Classes

The component uses the following DaisyUI classes:

- `breadcrumbs` - Base breadcrumbs styling

## Component Structure

### Recommended: Composable Structure

```html
<div class="breadcrumbs" role="navigation" aria-label="Breadcrumb">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><span aria-current="page">Current Page</span></li>
  </ul>
</div>
```

### Legacy: Items Structure

```html
<div class="breadcrumbs" role="navigation" aria-label="Breadcrumb">
  <ul>
    <li><a href="/">Home</a><span aria-hidden="true">/</span></li>
    <li><a href="/products">Products</a><span aria-hidden="true">/</span></li>
    <li><span aria-current="page">Current Page</span></li>
  </ul>
</div>
```

## Migration Guide

To migrate from the legacy items approach to the new composable structure:

### Before (Legacy)

```tsx
<Breadcrumbs
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Current Page", current: true },
  ]}
/>
```

### After (Recommended)

```tsx
<Breadcrumbs>
  <Breadcrumb href="/">Home</Breadcrumb>
  <Breadcrumb href="/products">Products</Breadcrumb>
  <Breadcrumb current>Current Page</Breadcrumb>
</Breadcrumbs>
```

## Notes

- **Recommended**: Use Breadcrumb children for better composability and router integration
- **Legacy**: Items prop is deprecated but still supported for backward compatibility
- When both `items` and `children` are provided, `items` takes precedence
- Breadcrumb components automatically render appropriate elements (links, buttons, or spans)
- Breadcrumb supports keyboard navigation for interactive elements
- Custom separators are only supported in legacy items mode
- The new structure is more flexible and allows for future router integration
