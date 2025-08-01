# Alert Component

## Component Overview

The Alert component displays styled message boxes with optional content and icons, following official DaisyUI Alert patterns. It provides full support for all official DaisyUI alert features including style variants, layout options, and proper grid-based structure.

**Custom Extensions**: Includes optional dismissible functionality with close button - this is not part of standard DaisyUI but provided as a useful extension.

## Usage Examples

### Basic Alert

```tsx
import { Alert } from "solid-daisyui";

<Alert>This is a basic alert message</Alert>;
```

### Alert Types

```tsx
<Alert type="info">This is an info alert</Alert>
<Alert type="success">Operation completed successfully!</Alert>
<Alert type="warning">Please check your input</Alert>
<Alert type="error">Something went wrong</Alert>
```

### Official DaisyUI Style Variants

```tsx
<Alert type="success" style="outline">Outline style alert</Alert>
<Alert type="warning" style="soft">Soft style alert</Alert>
<Alert type="error" style="dash">Dashed border alert</Alert>
```

### Official DaisyUI Layout Options

```tsx
<Alert type="info" vertical={true}>Vertical layout alert</Alert>
<Alert type="success" vertical={false}>Horizontal layout alert</Alert>
```

### Custom Icons

```tsx
<Alert
  type="success"
  icon={<CustomIcon />}
>
  Alert with custom icon
</Alert>

<Alert type="info" hideIcon>
  Alert without icon
</Alert>
```

### Alert with Action Buttons

```tsx
<Alert
  buttons={[
    <button class="btn btn-sm">Accept</button>,
    <button class="btn btn-sm btn-outline">Decline</button>,
  ]}
>
  We use cookies for no reason.
</Alert>
```

### Custom Dismissible Functionality (Extension)

```tsx
{
  /* Close button with custom callback */
}
<Alert
  onClose={() => {
    console.log("Alert dismissed");
    return true; // Allow closing
  }}
>
  Custom dismissible alert
</Alert>;

{
  /* Always show close button */
}
<Alert dismissible={true}>Always dismissible alert</Alert>;

{
  /* Never show close button */
}
<Alert dismissible={false}>Non-dismissible alert</Alert>;
```

## Props

| Name        | Type                                          | Default | Description                                                                           |
| ----------- | --------------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| children    | `JSX.Element`                                 | -       | The content to display inside the alert                                               |
| class       | `string`                                      | -       | Additional CSS classes to apply to the alert                                          |
| classList   | `Record<string, boolean>`                     | -       | Dynamic class list for conditional styling                                            |
| type        | `"info" \| "success" \| "warning" \| "error"` | -       | Alert type using official DaisyUI classes                                             |
| icon        | `JSX.Element`                                 | -       | Custom icon to display in the alert                                                   |
| hideIcon    | `boolean`                                     | `false` | If true, hides the icon in the alert                                                  |
| style       | `"outline" \| "soft" \| "dash"`               | -       | **Official DaisyUI**: Style variant (alert-outline, alert-soft, alert-dash)           |
| vertical    | `boolean`                                     | -       | **Official DaisyUI**: Layout option (true = alert-vertical, false = alert-horizontal) |
| buttons     | `JSX.Element[]`                               | -       | Optional action buttons to display                                                    |
| dismissible | `boolean`                                     | `false` | **Custom Extension**: If true, shows close button                                     |
| onClose     | `() => boolean \| void`                       | -       | **Custom Extension**: Callback fired when close button is clicked                     |

## Accessibility Features

- **ARIA Attributes**: Proper `role="alert"` and `aria-live` attributes
- **Keyboard Navigation**: Close button supports Enter and Space keys (when enabled)
- **Screen Reader Support**: Icons are properly integrated into alert structure
- **Focus Management**: Proper tab order and focus indicators for close button
- **Live Regions**: Dynamic `aria-live` based on alert type (assertive for errors, polite for others)

## DaisyUI Classes Used

### Base Classes

- `alert` - Base alert class with grid layout

### Type Variants

- `alert-info` - Info variant styling
- `alert-success` - Success variant styling
- `alert-warning` - Warning variant styling
- `alert-error` - Error variant styling

### Style Modifiers (Official DaisyUI)

- `alert-outline` - Outlined border style
- `alert-soft` - Soft background style
- `alert-dash` - Dashed border style

### Layout Options (Official DaisyUI)

- `alert-vertical` - Vertical stacked layout
- `alert-horizontal` - Horizontal inline layout

## Notes

- The component follows DaisyUI's official Alert grid structure and styling
- Default icons are provided for each alert type when no custom icon is specified
- State management is handled internally with SolidJS signals
- **Close button functionality is a custom extension** and not part of standard DaisyUI alerts
- All DaisyUI style and layout modifiers are fully supported as official features
- The component supports both controlled and uncontrolled usage patterns
