# Dropdown Component

## Component Overview

The Dropdown component creates interactive dropdown menus with full DaisyUI integration. It follows official DaisyUI Dropdown component patterns with support for position variants, hover triggers, and comprehensive accessibility features implementing WCAG 2.1 AA standards.

The component supports click-to-toggle, hover triggers, keyboard navigation (Enter, Space, Escape), click-outside-to-close, and proper focus management for enhanced user experience.

## Usage Examples

### Basic Dropdown

```tsx
import { Dropdown } from "solid-daisyui";

<Dropdown>
  <button class="btn">Open Dropdown</button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</Dropdown>
```

### Dropdown with Position Variants

```tsx
{/* Top positioned dropdown */}
<Dropdown position="top">
  <button class="btn">Dropdown Top</button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</Dropdown>

{/* Right positioned dropdown */}
<Dropdown position="right">
  <button class="btn">Dropdown Right</button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</Dropdown>

{/* End aligned dropdown */}
<Dropdown align="end">
  <button class="btn">Dropdown End</button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</Dropdown>
```

### Hover Trigger Dropdown

```tsx
<Dropdown hover>
  <button class="btn">Hover to Open</button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</Dropdown>
```

### Controlled Dropdown

```tsx
import { createSignal } from "solid-js";

const [isOpen, setIsOpen] = createSignal(false);

<Dropdown 
  open={isOpen()} 
  onToggle={(open) => setIsOpen(open)}
>
  <button class="btn">Controlled Dropdown</button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</Dropdown>
```

### Custom Styling

```tsx
<Dropdown 
  class="custom-dropdown" 
  classList={{ active: someCondition() }}
>
  <button class="btn btn-primary">Styled Dropdown</button>
  <div class="dropdown-content bg-neutral text-neutral-content rounded-box p-4 shadow-lg">
    <p>Custom content</p>
  </div>
</Dropdown>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The dropdown trigger and content elements. First child is the trigger, second child is the content. |
| class | `string` | - | Additional CSS classes to apply to the dropdown container. |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling. |
| position | `"top" \| "bottom" \| "left" \| "right"` | - | Official DaisyUI position variants for dropdown placement. Controls where the dropdown appears relative to the trigger. |
| align | `"end"` | - | Official DaisyUI alignment modifier (dropdown-end). Aligns dropdown to the end of the trigger. |
| hover | `boolean` | `false` | If true, enables hover trigger mode using dropdown-hover class. Dropdown opens on hover instead of click. |
| open | `boolean` | - | Controls the dropdown state externally using dropdown-open class. Use with onToggle for controlled component behavior. |
| onToggle | `(isOpen: boolean) => void` | - | Callback fired when dropdown state changes. Receives the new open/closed state. |
| ariaLabel | `string` | - | Custom ARIA label for accessibility. Applied to the trigger element for screen readers. |
| id | `string` | auto-generated | Custom ID for the dropdown. If not provided, a random ID will be generated for accessibility. |

## Accessibility Features

The Dropdown component implements comprehensive accessibility features:

### ARIA Attributes
- **`aria-expanded`**: Indicates whether the dropdown is open or closed
- **`aria-haspopup`**: Indicates the trigger has a popup menu
- **`aria-controls`**: Links the trigger to the dropdown content
- **`aria-labelledby`**: Links the content back to the trigger
- **`role="menu"`**: Identifies the dropdown content as a menu

### Keyboard Navigation
- **Enter/Space**: Opens or closes the dropdown when trigger is focused
- **Escape**: Closes the dropdown and returns focus to trigger
- **Tab**: Moves focus through focusable elements in the dropdown content
- **Auto-focus**: When dropdown opens, focus moves to first focusable element in content

### Screen Reader Support
- Proper semantic structure with roles and labels
- State announcements when dropdown opens/closes
- Content properly associated with trigger

## DaisyUI Integration

The component uses official DaisyUI CSS classes:

### Base Classes
- `dropdown`: Base dropdown container class
- `dropdown-content`: Content container class

### Position Modifiers
- `dropdown-top`: Positions dropdown above trigger
- `dropdown-bottom`: Positions dropdown below trigger (default)
- `dropdown-left`: Positions dropdown to the left of trigger
- `dropdown-right`: Positions dropdown to the right of trigger

### Alignment Modifiers
- `dropdown-end`: Aligns dropdown to the end of trigger

### State Modifiers
- `dropdown-open`: Applied when dropdown is open
- `dropdown-hover`: Enables hover trigger mode

## Advanced Usage

### Click Outside to Close
The dropdown automatically closes when clicking outside the component. This behavior is built-in and requires no additional configuration.

### Focus Management
When the dropdown opens, focus automatically moves to the first focusable element in the content. When closed via Escape key, focus returns to the trigger.

### Disabled Trigger Handling
The component properly handles disabled triggers by preventing dropdown interaction when the trigger element has the `disabled` attribute or `aria-disabled="true"`.

### Custom Event Handling
Original event handlers on trigger elements are preserved and called before dropdown-specific handling:

```tsx
<Dropdown>
  <button 
    class="btn" 
    onClick={(e) => console.log('Custom handler')}
    onKeyDown={(e) => console.log('Custom keydown')}
  >
    Custom Events
  </button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
  </ul>
</Dropdown>
```

## Best Practices

1. **Always provide two children**: The first child should be the trigger element, the second should be the content.

2. **Use semantic HTML**: Use `<button>` for triggers and appropriate list elements for menu content.

3. **Include proper DaisyUI classes**: Apply `dropdown-content` class to content and use DaisyUI menu classes for styling.

4. **Consider z-index**: Add `z-[1]` or higher to dropdown content to ensure it appears above other elements.

5. **Provide meaningful labels**: Use `ariaLabel` prop for screen reader accessibility when button text isn't descriptive.

6. **Test keyboard navigation**: Ensure all dropdown items are focusable and keyboard accessible.

## Notes

- The component follows the TDD (Test-Driven Development) methodology with 100% test coverage
- Global event listeners for click-outside and escape key are automatically managed
- Memory leaks are prevented through proper cleanup of event listeners
- Component is optimized with memoization for performance
- Compatible with SSR (Server-Side Rendering)
- Supports both controlled and uncontrolled usage patterns
