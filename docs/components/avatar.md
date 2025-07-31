# Avatar

Avatar component for displaying user profile pictures or placeholder initials with support for presence indicators, size variants, and masks.

## Usage

### Basic avatar with image

```tsx
import { Avatar } from "solid-daisyui";

function Example() {
  return <Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />;
}
```

### Avatar with placeholder text

```tsx
import { Avatar } from "solid-daisyui";

function Example() {
  return <Avatar placeholder="JD" />;
}
```

### Size variants

```tsx
import { Avatar } from "solid-daisyui";

function Example() {
  return (
    <div class="flex gap-4 items-end">
      <Avatar src="avatar.jpg" size="xs" />
      <Avatar src="avatar.jpg" size="sm" />
      <Avatar src="avatar.jpg" size="md" />
      <Avatar src="avatar.jpg" size="lg" />
    </div>
  );
}
```

### Rounded avatar

```tsx
import { Avatar } from "solid-daisyui";

function Example() {
  return <Avatar src="avatar.jpg" alt="User" rounded />;
}
```

### Avatar with ring

```tsx
import { Avatar } from "solid-daisyui";

function Example() {
  return <Avatar src="avatar.jpg" alt="User" rounded ring />;
}
```

### Presence indicators

```tsx
import { Avatar } from "solid-daisyui";

function Example() {
  return (
    <div class="flex gap-4">
      <Avatar src="avatar.jpg" alt="Online User" status="online" rounded />
      <Avatar src="avatar.jpg" alt="Offline User" status="offline" rounded />
    </div>
  );
}
```

### Avatar with mask

```tsx
import { Avatar } from "solid-daisyui";

function Example() {
  return (
    <div class="flex gap-4">
      <Avatar src="avatar.jpg" mask="squircle" />
      <Avatar src="avatar.jpg" mask="heart" />
      <Avatar src="avatar.jpg" mask="hexagon-2" />
    </div>
  );
}
```

### Fallback handling

```tsx
import { Avatar } from "solid-daisyui";

function Example() {
  return <Avatar src="invalid-url.jpg" alt="User" fallback="JD" />;
}
```

## Props

| Name          | Type                           | Default    | Description                                                          |
| ------------- | ------------------------------ | ---------- | -------------------------------------------------------------------- |
| `src`         | `string`                       | -          | Image source URL for the avatar                                      |
| `alt`         | `string`                       | `"Avatar"` | Alternative text for the avatar image                                |
| `placeholder` | `string`                       | -          | Initials or text to display when no image is provided                |
| `size`        | `"xs" \| "sm" \| "md" \| "lg"` | `"md"`     | Size of the avatar                                                   |
| `rounded`     | `boolean`                      | `false`    | Whether the avatar should be fully rounded                           |
| `ring`        | `boolean`                      | `false`    | Whether to show a ring around the avatar                             |
| `status`      | `"online" \| "offline"`        | -          | Online presence indicator                                            |
| `mask`        | `string`                       | -          | Mask variant for the avatar (e.g., "squircle", "heart", "hexagon-2") |
| `class`       | `string`                       | -          | Additional CSS classes to apply                                      |
| `classList`   | `Record<string, boolean>`      | -          | Dynamic class list for conditional styling                           |
| `fallback`    | `string`                       | -          | Fallback text to display when image fails to load                    |

## Size Classes

- `xs`: 24px (w-6)
- `sm`: 32px (w-8)
- `md`: 48px (w-12) - default
- `lg`: 64px (w-16)

## Accessibility

- Images include proper `alt` attributes
- Presence indicators are semantically meaningful
- Keyboard navigation support
- Screen reader compatible

## Examples in Action

The Avatar component automatically handles:

- Image loading failures with fallback text
- Presence indicator positioning
- Size-appropriate text scaling
- Proper semantic HTML structure

When an image fails to load, the component will display the fallback text with appropriate styling. The presence indicators (online/offline) are positioned as overlay elements for optimal visual design.
