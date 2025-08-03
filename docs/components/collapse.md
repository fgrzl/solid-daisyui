# Collapse Component

## Component Overview

The Collapse component creates collapsible content sections with DaisyUI styling, following official DaisyUI Collapse patterns. It provides full support for both checkbox and radio input types, allowing for independent or mutually exclusive collapsible sections. The component supports keyboard navigation and proper accessibility attributes.

## Usage Examples

### Basic Collapse
```tsx
import { Collapse } from "solid-daisyui";

<Collapse title="Click to expand">
  <p>This content will be shown when expanded.</p>
</Collapse>
```

### Collapse Variants
```tsx
// Arrow variant (default)
<Collapse title="Arrow Collapse" variant="arrow">
  <p>Content with arrow indicator</p>
</Collapse>

// Plus variant
<Collapse title="Plus Collapse" variant="plus">
  <p>Content with plus/minus indicator</p>
</Collapse>
```

### Input Types
```tsx
// Checkbox type (default) - independent state
<Collapse title="Independent Collapse" type="checkbox">
  <p>This can be open independently of others</p>
</Collapse>

// Radio type - mutually exclusive group
<Collapse title="Radio Collapse 1" type="radio" name="group1">
  <p>Only one in this group can be open</p>
</Collapse>
<Collapse title="Radio Collapse 2" type="radio" name="group1">
  <p>Opening this will close the other</p>
</Collapse>
```

### Open by Default
```tsx
<Collapse title="Initially Open" open>
  <p>This collapse starts in an open state</p>
</Collapse>
```

### With State Callback
```tsx
<Collapse 
  title="With Callback" 
  onToggle={(isOpen) => console.log('Collapse is now:', isOpen ? 'open' : 'closed')}
>
  <p>State changes are reported via callback</p>
</Collapse>
```

### Custom Styling
```tsx
<Collapse 
  title="Custom Styled" 
  class="border border-primary"
  classList={{ "bg-base-200": true }}
>
  <p>Custom classes and dynamic styling</p>
</Collapse>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | `string` | **Required** | The title text displayed in the collapse header |
| children | `JSX.Element` | `undefined` | The content to display inside the collapse when expanded |
| open | `boolean` | `false` | Whether the collapse should be open by default |
| class | `string` | `undefined` | Additional CSS classes to apply to the collapse container |
| classList | `Record<string, boolean>` | `undefined` | Dynamic class list for conditional styling |
| id | `string` | Auto-generated | Custom ID for the collapse. If not provided, a random ID will be generated |
| variant | `"arrow" \| "plus"` | `"arrow"` | The visual indicator variant - "arrow" or "plus" icon |
| type | `"checkbox" \| "radio"` | `"checkbox"` | The input type for state management |
| name | `string` | `undefined` | Required when type is "radio" for grouping radio inputs |
| onToggle | `(open: boolean) => void` | `undefined` | Callback function called when the collapse state changes |

## Accessibility

- Supports full keyboard navigation with Tab, Enter, and Space keys
- Includes proper ARIA attributes (`role`, `aria-expanded`, `aria-controls`, etc.)
- Uses semantic HTML structure with proper labeling
- Compatible with screen readers
- Hidden input elements are properly marked with `aria-hidden="true"`
- Content regions are properly labeled with `aria-labelledby`

## DaisyUI Classes Used

- `collapse` - Base collapse component class
- `collapse-arrow` - Arrow indicator variant
- `collapse-plus` - Plus/minus indicator variant
- `collapse-title` - Title/header section styling
- `collapse-content` - Content section styling

## Behavior Notes

- **Checkbox Type**: Multiple collapses can be open simultaneously
- **Radio Type**: Only one collapse in the same name group can be open at a time
- **State Management**: Component manages its own open/closed state internally
- **Event Handling**: Supports both mouse clicks and keyboard navigation (Enter/Space)
- **ID Generation**: Automatically generates unique IDs for accessibility if not provided
- **Performance**: Uses SolidJS signals for efficient reactive updates

## Examples in Context

### FAQ Section
```tsx
<div class="space-y-2">
  <Collapse title="What is SolidJS?" variant="plus">
    <p>SolidJS is a declarative JavaScript library for creating user interfaces.</p>
  </Collapse>
  <Collapse title="What is DaisyUI?" variant="plus">
    <p>DaisyUI is a component library built on top of Tailwind CSS.</p>
  </Collapse>
</div>
```

### Settings Panel with Radio Groups
```tsx
<div class="space-y-4">
  <h3>Choose Theme</h3>
  <Collapse title="Light Theme" type="radio" name="theme">
    <p>Light theme configuration options...</p>
  </Collapse>
  <Collapse title="Dark Theme" type="radio" name="theme">
    <p>Dark theme configuration options...</p>
  </Collapse>
  <Collapse title="Auto Theme" type="radio" name="theme">
    <p>Automatic theme switching options...</p>
  </Collapse>
</div>
```
