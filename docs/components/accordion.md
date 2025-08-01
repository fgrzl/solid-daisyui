# Accordion Component

## Component Overview

The Accordion component creates collapsible content sections with radio group behavior, following DaisyUI Collapse component patterns. Accordions with the same `name` prop form a group where only one can be open at a time, providing an intuitive way to organize content in expandable sections. The component supports keyboard navigation, proper accessibility attributes, and includes visual indicator variants.

**Key Features**: Radio-based mutual exclusion, keyboard navigation, ARIA compliance, and DaisyUI collapse styling with arrow or plus icon variants.

## Usage Examples

### Basic Accordion
```tsx
import { Accordion } from "solid-daisyui";

<Accordion title="Section 1" name="basic-group">
  <p>This is the content for section 1</p>
</Accordion>
```

### Accordion Group (Mutual Exclusion)
```tsx
<div>
  <Accordion title="First Section" name="my-group" open>
    <p>This section is open by default</p>
  </Accordion>
  
  <Accordion title="Second Section" name="my-group">
    <p>This section is closed by default</p>
  </Accordion>
  
  <Accordion title="Third Section" name="my-group">
    <p>Only one section can be open at a time</p>
  </Accordion>
</div>
```

### Accordion with Plus/Minus Icons
```tsx
<Accordion 
  title="Settings" 
  name="settings-group" 
  variant="plus"
>
  <div>
    <label>Option 1: <input type="checkbox" /></label>
    <label>Option 2: <input type="checkbox" /></label>
  </div>
</Accordion>
```

### Custom Styling
```tsx
<Accordion 
  title="Custom Styled Section" 
  name="custom-group"
  class="border border-primary"
  classList={{ "bg-base-200": true }}
>
  <div class="p-4">
    Custom content with additional styling
  </div>
</Accordion>
```

### Rich Content
```tsx
<Accordion title="FAQ: How to use this component?" name="faq-group">
  <div>
    <p>The Accordion component is designed for organizing content into collapsible sections.</p>
    <ul>
      <li>Each accordion needs a unique <code>name</code> for radio grouping</li>
      <li>Use the same <code>name</code> for accordions that should be mutually exclusive</li>
      <li>Set <code>open</code> prop to open an accordion by default</li>
    </ul>
  </div>
</Accordion>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| title | `string` | - | **Required.** The title text displayed in the accordion header |
| children | `JSX.Element` | - | **Required.** The content to display inside the accordion when expanded |
| name | `string` | - | **Required.** Radio group name - accordions with the same name form a mutually exclusive group |
| open | `boolean` | `false` | If true, the accordion is open by default |
| class | `string` | - | Additional CSS classes to apply to the accordion container |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| id | `string` | auto-generated | Custom ID for the accordion. If not provided, a random ID will be generated |
| variant | `"arrow" \| "plus"` | `"arrow"` | Visual indicator variant - "arrow" shows directional arrow, "plus" shows plus/minus icon |

## Accessibility Features

- **Radio Group Behavior**: Uses radio inputs for mutual exclusion within accordion groups
- **ARIA Attributes**: Includes `aria-expanded`, `aria-controls`, `aria-labelledby`, `aria-hidden`, and `role` attributes
- **Keyboard Navigation**: Full keyboard support with Enter and Space key activation
- **Focus Management**: Proper tab order and focus indicators for accordion headers
- **Screen Reader Support**: Content regions are properly labeled and announced
- **Semantic Markup**: Uses appropriate `role="button"` and `role="region"` for screen readers

## DaisyUI Classes Used

### Base Classes
- `collapse` - Base collapse container with DaisyUI styling
- `collapse-title` - Header styling with proper typography and spacing
- `collapse-content` - Content area styling with appropriate padding

### Variant Classes  
- `collapse-arrow` - Arrow indicator variant (default)
- `collapse-plus` - Plus/minus indicator variant

### Additional Classes
- `peer` - Tailwind CSS utility for radio input styling coordination
- `cursor-pointer` - Makes the header clearly clickable

## Examples

### FAQ Section
```tsx
const faqItems = [
  {
    question: "What is SolidJS?",
    answer: "SolidJS is a declarative, efficient, and flexible JavaScript library for building user interfaces."
  },
  {
    question: "What is DaisyUI?", 
    answer: "DaisyUI is a semantic component library for Tailwind CSS."
  }
];

<div>
  {faqItems.map((item, index) => (
    <Accordion 
      title={item.question} 
      name="faq-group"
      open={index === 0}
    >
      <p>{item.answer}</p>
    </Accordion>
  ))}
</div>
```

### Settings Panel
```tsx
<div>
  <Accordion title="General Settings" name="settings" open>
    <div class="space-y-2">
      <label class="flex items-center gap-2">
        <input type="checkbox" class="checkbox" />
        Enable notifications
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" class="checkbox" />
        Auto-save changes
      </label>
    </div>
  </Accordion>
  
  <Accordion title="Advanced Settings" name="settings" variant="plus">
    <div class="space-y-2">
      <label class="flex items-center gap-2">
        <input type="checkbox" class="checkbox" />
        Debug mode
      </label>
      <label class="flex items-center gap-2">
        <input type="checkbox" class="checkbox" />
        Enable experimental features
      </label>
    </div>
  </Accordion>
</div>
```

## Notes

- **Radio Group Requirement**: The `name` prop is required and must be the same for accordions that should be mutually exclusive
- **Single Selection**: Only one accordion in a group (same `name`) can be open at a time
- **State Management**: Internal state is managed with SolidJS signals and synchronized across radio groups
- **Event Handling**: Uses native radio input events for reliable cross-browser behavior
- **DaisyUI Compliance**: Follows official DaisyUI Collapse component specifications
- **Auto-generated IDs**: Component generates unique IDs automatically for accessibility if not provided
- **Keyboard Support**: Supports both Enter and Space keys for activation, following web accessibility standards
