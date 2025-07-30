# Button Component

## Overview

The Button component provides a customizable button element following DaisyUI design standards. It supports all DaisyUI button variants, sizes, and modifiers including outline, wide, block, and shape options. The component includes comprehensive accessibility features with proper ARIA attributes, keyboard navigation support, and screen reader compatibility.

## Usage

```tsx
import { Button } from "solid-daisyui";

// Basic button
<Button>Click me</Button>

// Button with variant and size
<Button variant="primary" size="lg">Primary Button</Button>

// Button with loading state
<Button loading>Loading...</Button>

// Button with icons
<Button 
  variant="secondary" 
  startIcon={<span>→</span>}
  endIcon={<span>←</span>}
>
  With Icons
</Button>

// Disabled button
<Button disabled>Disabled Button</Button>

// Button with custom styling
<Button 
  variant="accent" 
  outline 
  wide 
  onClick={(e) => console.log('Clicked!')}
>
  Outline Wide Button
</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `JSX.Element` | - | The content to display inside the button |
| class | `string` | - | Additional CSS classes to apply to the button |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| type | `"button" \| "submit" \| "reset"` | `"button"` | The type of button for form interaction |
| variant | `"primary" \| "secondary" \| "accent" \| "ghost" \| "link" \| "info" \| "success" \| "warning" \| "error"` | - | The visual variant that determines color scheme |
| size | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | The size of the button |
| shape | `"circle" \| "square"` | - | The shape of the button for icon-only buttons |
| outline | `boolean` | `false` | If true, applies outline styling to the button |
| wide | `boolean` | `false` | If true, makes the button wider than normal |
| block | `boolean` | `false` | If true, makes button take full width of container |
| active | `boolean` | `false` | If true, applies active state styling |
| disabled | `boolean` | `false` | If true, disables the button and prevents interaction |
| loading | `boolean` | `false` | If true, shows loading spinner and disables button |
| startIcon | `JSX.Element` | - | Icon to display at the start of the button content |
| endIcon | `JSX.Element` | - | Icon to display at the end of the button content |
| onClick | `(event: MouseEvent) => void` | - | Event handler for button click events |
| onFocus | `(event: FocusEvent) => void` | - | Event handler for button focus events |
| onBlur | `(event: FocusEvent) => void` | - | Event handler for button blur events |
| aria-label | `string` | - | Accessible label when text content is not descriptive |
| aria-describedby | `string` | - | ID of element that describes the button |
| id | `string` | - | Unique identifier for the button element |
| tabIndex | `number` | `0` | Tab order for keyboard navigation |

## Accessibility

- **Keyboard Navigation**: Supports standard button keyboard interactions (Enter, Space)
- **ARIA Attributes**: Includes `aria-disabled`, `aria-busy`, `aria-label`, and `aria-describedby` support
- **Screen Reader**: Compatible with screen readers with proper semantic markup
- **Focus Management**: Proper focus handling for disabled and loading states
- **Loading States**: Uses `aria-busy` to indicate loading state to assistive technologies

## Examples

### Form Buttons
```tsx
<form>
  <Button type="submit" variant="primary">Submit</Button>
  <Button type="reset" variant="secondary">Reset</Button>
  <Button type="button" onClick={handleCancel}>Cancel</Button>
</form>
```

### Loading Button
```tsx
const [isLoading, setIsLoading] = createSignal(false);

<Button 
  loading={isLoading()} 
  onClick={() => setIsLoading(true)}
>
  {isLoading() ? 'Processing...' : 'Submit'}
</Button>
```

### Icon Button
```tsx
<Button 
  variant="ghost" 
  shape="circle" 
  aria-label="Close dialog"
>
  ×
</Button>
```

## Notes

- Loading state automatically disables the button and hides icons
- Icons are hidden during loading state to prevent layout conflicts
- Disabled buttons have `tabIndex="-1"` to remove them from tab order
- The component follows DaisyUI button component specifications
- All DaisyUI button classes and modifiers are supported
