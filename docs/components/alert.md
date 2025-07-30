# Alert Component

## Component Overview

The Alert component displays styled message boxes with optional content and icons, following official DaisyUI Alert patterns. It provides accessibility features including proper ARIA attributes, keyboard navigation, and screen reader compatibility, implementing WCAG 2.1 AA compliance standards.

## Usage Examples

### Basic Alert
```tsx
import { Alert } from "solid-daisyui";

<Alert>This is a basic alert message</Alert>
```

### Alert Types
```tsx
<Alert type="info">This is an info alert</Alert>
<Alert type="success">Operation completed successfully!</Alert>
<Alert type="warning">Please check your input</Alert>
<Alert type="error">Something went wrong</Alert>
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

### Alert with Title and Actions
```tsx
<Alert 
  title="Important Notice"
  buttons={[
    <button class="btn btn-sm">Accept</button>,
    <button class="btn btn-sm btn-outline">Decline</button>
  ]}
>
  Please review the terms and conditions.
</Alert>
```

### Controlled Dismissal
```tsx
<Alert 
  dismissible={false}
  onClose={() => {
    console.log("Alert close attempted");
    return false; // Prevent closing
  }}
>
  This alert cannot be dismissed
</Alert>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The content to display inside the alert |
| class | `string` | - | Additional CSS classes to apply to the alert |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| type | `"info" \| "success" \| "warning" \| "error"` | - | Alert type using official DaisyUI classes |
| icon | `JSX.Element` | - | Custom icon to display in the alert |
| hideIcon | `boolean` | `false` | If true, hides the icon in the alert |
| title | `string` | - | Optional title for the alert |
| buttons | `JSX.Element[]` | - | Optional action buttons to display |
| dismissible | `boolean` | `true` | If false, hides the close button |
| onClose | `() => boolean \| void` | - | Callback fired when close button is clicked. Return false to prevent closing |

## Accessibility Features

- **ARIA Attributes**: Proper `role="alert"` and `aria-live` attributes
- **Keyboard Navigation**: Close button supports Enter and Space keys
- **Screen Reader Support**: Icons marked with `aria-hidden="true"`
- **Focus Management**: Proper tab order and focus indicators
- **Live Regions**: Dynamic `aria-live` based on alert type (assertive for errors, polite for others)

## DaisyUI Classes Used

- `alert` - Base alert class
- `alert-info` - Info variant styling
- `alert-success` - Success variant styling  
- `alert-warning` - Warning variant styling
- `alert-error` - Error variant styling

## Notes

- The component follows DaisyUI's official Alert structure and styling
- Default icons are provided for each alert type when no custom icon is specified
- State management is handled internally with SolidJS signals
- The component supports both controlled and uncontrolled usage patterns
- Legacy props (`style`, `vertical`) are deprecated but maintained for backward compatibility
