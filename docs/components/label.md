# Label Component

## Component Overview

The Label component provides accessible and semantic labeling for form controls following DaisyUI design standards. It supports both basic label styling and floating label behavior for modern form experiences.

## Usage Examples

### Basic Label

```tsx
<Label for="username">Username</Label>
<input id="username" type="text" />
```

### Floating Label

```tsx
<Label variant="floating">
  Email Address
  <input type="email" placeholder=" " />
</Label>
```

### With Required Indicator

```tsx
<Label for="password" required>Password</Label>
<input id="password" type="password" />
```

### With Optional Indicator

```tsx
<Label for="phone" optional>Phone Number</Label>
<input id="phone" type="tel" />
```

### Custom Classes

```tsx
<Label class="text-primary" classList={{ "font-bold": true }}>
  Custom Styled Label
</Label>
```

### With Event Handlers

```tsx
<Label
  for="toggle"
  onClick={handleClick}
  tabIndex={0}
  onKeyDown={handleKeyDown}
>
  Clickable Label
</Label>
```

## Props

| Name             | Type                                   | Default   | Description                                                                                    |
| ---------------- | -------------------------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| children         | `JSX.Element \| string`                | -         | The content to display inside the label                                                        |
| class            | `string`                               | -         | Additional CSS classes to apply to the label                                                   |
| classList        | `Record<string, boolean>`              | -         | Dynamic class list for conditional styling                                                     |
| for              | `string`                               | -         | The ID of the form control this label is associated with                                       |
| variant          | `"basic" \| "floating"`                | `"basic"` | Label variant - basic for standard styling, floating for Material Design-style floating labels |
| size             | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | -         | Size hint for floating labels when associated with form controls                               |
| required         | `boolean`                              | `false`   | Whether to show a required indicator (\*)                                                      |
| optional         | `boolean`                              | `false`   | Whether to show an optional indicator (ignored if required is true)                            |
| aria-label       | `string`                               | -         | Accessibility label for the label element                                                      |
| aria-describedby | `string`                               | -         | ID of element that describes this label                                                        |
| role             | `string`                               | -         | ARIA role override for the label element                                                       |
| tabIndex         | `number`                               | -         | Tab index for keyboard navigation                                                              |
| onClick          | `(event: MouseEvent) => void`          | -         | Click event handler                                                                            |
| onFocus          | `(event: FocusEvent) => void`          | -         | Focus event handler                                                                            |
| onBlur           | `(event: FocusEvent) => void`          | -         | Blur event handler                                                                             |
| onKeyDown        | `(event: KeyboardEvent) => void`       | -         | Keyboard event handler                                                                         |

## Accessibility

The Label component implements WCAG 2.1 AA accessibility standards:

- Uses semantic `<label>` HTML element
- Supports explicit association via `for` attribute
- Supports implicit association via nesting
- Includes proper ARIA attributes and roles
- Supports keyboard navigation with tabIndex
- Compatible with screen readers
- Provides clear visual indicators for required/optional fields

## DaisyUI Classes

The component uses the following DaisyUI classes:

- **Basic variant**: `.label` - Standard label styling with inline-flex layout
- **Floating variant**: `.floating-label` - Modern floating label behavior with CSS transitions
- **Responsive variants**: `.sm:label`, `.md:label`, etc. for responsive styling

## Notes

### Form Association

Labels can be associated with form controls in two ways:

1. **Explicit association**: Using the `for` prop with the target element's ID
2. **Implicit association**: Nesting the form control inside the label

### Floating Labels

The floating variant requires specific markup structure and works best with inputs that have placeholder attributes. The DaisyUI CSS handles the floating animation automatically.

### Required vs Optional

When both `required` and `optional` props are provided, `required` takes precedence and the optional indicator will not be shown.

## Edge Cases

- Handles empty, null, or undefined children gracefully
- Maintains semantic structure even with minimal props
- Supports custom event handlers while preserving accessibility
- Works with custom classes and dynamic styling
