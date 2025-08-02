# Dropdown Component

## Component Overview

The Dropdown component creates interactive dropdown menus with full DaisyUI integration. It follows official DaisyUI Dropdown component patterns with support for position variants, hover triggers, and comprehensive accessibility features implementing WCAG 2.1 AA standards.

The component supports click-to-toggle, hover triggers, keyboard navigation (Enter, Space, Escape), click-outside-to-close, and proper focus management for enhanced user experience.

**NEW**: The Dropdown component now supports structured child components for better composition and type safety:
- `DropdownTrigger`: Wraps the trigger element
- `DropdownContent`: Wraps the dropdown content  
- `DropdownItem`: Individual menu items with built-in state handling

## Usage Examples

### New Structured Components Pattern (Recommended)

```tsx
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from "solid-daisyui";

<Dropdown>
  <DropdownTrigger>
    <button class="btn">Open Menu</button>
  </DropdownTrigger>
  <DropdownContent>
    <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
      <DropdownItem><a>Item 1</a></DropdownItem>
      <DropdownItem active><a>Item 2 (Active)</a></DropdownItem>
      <DropdownItem disabled><a>Item 3 (Disabled)</a></DropdownItem>
    </ul>
  </DropdownContent>
</Dropdown>
```

### Structured Components with Positioning

```tsx
<Dropdown position="top" align="end">
  <DropdownTrigger>
    <button class="btn btn-primary">Positioned Menu</button>
  </DropdownTrigger>
  <DropdownContent>
    <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
      <DropdownItem><a>Profile</a></DropdownItem>
      <DropdownItem><a>Settings</a></DropdownItem>
      <DropdownItem><a>Logout</a></DropdownItem>
    </ul>
  </DropdownContent>
</Dropdown>
```

### Legacy Pattern (Maintained for Backward Compatibility)

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

### Dropdown with Position Variants (Structured)

```tsx
{/* Top positioned dropdown */}
<Dropdown position="top">
  <DropdownTrigger>
    <button class="btn">Dropdown Top</button>
  </DropdownTrigger>
  <DropdownContent>
    <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
      <DropdownItem><a>Item 1</a></DropdownItem>
      <DropdownItem><a>Item 2</a></DropdownItem>
    </ul>
  </DropdownContent>
</Dropdown>

{/* Right positioned dropdown */}
<Dropdown position="right">
  <DropdownTrigger>
    <button class="btn">Dropdown Right</button>
  </DropdownTrigger>
  <DropdownContent>
    <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
      <DropdownItem><a>Item 1</a></DropdownItem>
      <DropdownItem><a>Item 2</a></DropdownItem>
    </ul>
  </DropdownContent>
</Dropdown>

{/* End aligned dropdown */}
<Dropdown align="end">
  <DropdownTrigger>
    <button class="btn">Dropdown End</button>
  </DropdownTrigger>
  <DropdownContent>
    <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
      <DropdownItem><a>Item 1</a></DropdownItem>
      <DropdownItem><a>Item 2</a></DropdownItem>
    </ul>
  </DropdownContent>
</Dropdown>
```

### Legacy Position Variants (Backward Compatibility)

```tsx
{/* Top positioned dropdown */}
<Dropdown position="top">
  <button class="btn">Dropdown Top</button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</Dropdown>
```

### Hover Trigger Dropdown

```tsx
{/* Structured pattern */}
<Dropdown hover>
  <DropdownTrigger>
    <button class="btn">Hover to Open</button>
  </DropdownTrigger>
  <DropdownContent>
    <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
      <DropdownItem><a>Item 1</a></DropdownItem>
      <DropdownItem><a>Item 2</a></DropdownItem>
    </ul>
  </DropdownContent>
</Dropdown>

{/* Legacy pattern */}
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

### Dropdown Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The dropdown trigger and content elements. Can be either legacy pattern (first child is trigger, second is content) or structured components (DropdownTrigger and DropdownContent). |
| class | `string` | - | Additional CSS classes to apply to the dropdown container. |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling. |
| position | `"top" \| "bottom" \| "left" \| "right"` | - | Official DaisyUI position variants for dropdown placement. Controls where the dropdown appears relative to the trigger. |
| align | `"end"` | - | Official DaisyUI alignment modifier (dropdown-end). Aligns dropdown to the end of the trigger. |
| hover | `boolean` | `false` | If true, enables hover trigger mode using dropdown-hover class. Dropdown opens on hover instead of click. |
| open | `boolean` | - | Controls the dropdown state externally using dropdown-open class. Use with onToggle for controlled component behavior. |
| onToggle | `(isOpen: boolean) => void` | - | Callback fired when dropdown state changes. Receives the new open/closed state. |
| ariaLabel | `string` | - | Custom ARIA label for accessibility. Applied to the trigger element for screen readers. |
| id | `string` | auto-generated | Custom ID for the dropdown. If not provided, a random ID will be generated for accessibility. |

### DropdownTrigger Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The trigger element content (button, link, etc.). Should be an interactive element. |
| class | `string` | - | Additional CSS classes to apply to the trigger wrapper. |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling. |

### DropdownContent Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The dropdown content elements (menu, list, custom content). |
| class | `string` | - | Additional CSS classes to apply to the content wrapper (in addition to dropdown-content). |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling. |

### DropdownItem Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| children | `JSX.Element` | - | The item content (link, button, text, etc.). |
| class | `string` | - | Additional CSS classes to apply to the item. |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling. |
| disabled | `boolean` | `false` | Whether the item is disabled. Prevents click events when true. |
| active | `boolean` | `false` | Whether the item is active/selected. Applies active class. |
| onClick | `(event: MouseEvent) => void` | - | Click event handler for the item. Not called when disabled. |

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

### Structured Components (Recommended)

1. **Use DropdownTrigger for triggers**: Wrap your trigger element in `<DropdownTrigger>` for better type safety and composition.

2. **Use DropdownContent for content**: Wrap your dropdown content in `<DropdownContent>` to automatically get the dropdown-content class.

3. **Use DropdownItem for menu items**: Use `<DropdownItem>` for individual menu items to get built-in state handling (active, disabled).

```tsx
// ✅ Good - Structured pattern
<Dropdown>
  <DropdownTrigger>
    <button class="btn">Menu</button>
  </DropdownTrigger>
  <DropdownContent>
    <ul class="menu bg-base-100 rounded-box w-52 p-2 shadow">
      <DropdownItem><a>Profile</a></DropdownItem>
      <DropdownItem active><a>Dashboard</a></DropdownItem>
      <DropdownItem disabled><a>Settings</a></DropdownItem>
    </ul>
  </DropdownContent>
</Dropdown>
```

### General Best Practices

1. **Use semantic HTML**: Use `<button>` for triggers and appropriate list elements for menu content.

2. **Include proper DaisyUI classes**: Apply DaisyUI menu classes for styling (automatically handled by DropdownContent).

3. **Consider z-index**: Add appropriate z-index to dropdown content to ensure it appears above other elements.

4. **Provide meaningful labels**: Use `ariaLabel` prop for screen reader accessibility when button text isn't descriptive.

5. **Test keyboard navigation**: Ensure all dropdown items are focusable and keyboard accessible.

### Legacy Pattern Support

The component maintains backward compatibility with the legacy pattern:

```tsx
// ✅ Still supported - Legacy pattern
<Dropdown>
  <button class="btn">Legacy Trigger</button>
  <ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</Dropdown>
```

## Notes

- The component follows the TDD (Test-Driven Development) methodology with 100% test coverage
- Global event listeners for click-outside and escape key are automatically managed
- Memory leaks are prevented through proper cleanup of event listeners
- Component is optimized with memoization for performance
- Compatible with SSR (Server-Side Rendering)
- Supports both controlled and uncontrolled usage patterns
