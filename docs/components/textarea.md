# Textarea Component

## Component Overview

The Textarea component provides a multi-line text input field with comprehensive DaisyUI styling support and integrated validation. It follows official DaisyUI patterns with support for all variants, sizes, and state modifiers while implementing WCAG 2.1 AA accessibility standards.

## Usage Examples

### Basic Textarea

```tsx
import { Textarea } from "solid-daisyui";

<Textarea placeholder="Enter your message..." />
```

### With Size and Variant

```tsx
<Textarea 
  size="lg" 
  variant="primary" 
  placeholder="Large primary textarea"
  rows={5}
/>
```

### With Form Integration

```tsx
<Textarea 
  label="Message" 
  altLabel="Optional"
  hint="Enter a detailed message (max 500 characters)"
  placeholder="Type your message here..."
  maxlength={500}
/>
```

### Controlled Mode

```tsx
import { createSignal } from "solid-js";

function MyComponent() {
  const [message, setMessage] = createSignal("");
  
  return (
    <Textarea 
      value={message()} 
      onChange={(value) => setMessage(value)}
      placeholder="Controlled textarea"
    />
  );
}
```

### With Validation State

```tsx
<Textarea 
  state="error" 
  hint="This field is required" 
  label="Required Message"
  required
/>
```

### Ghost Style

```tsx
<Textarea 
  ghost
  placeholder="Ghost style textarea"
  class="w-full"
/>
```

### Uncontrolled with Ref

```tsx
import { createSignal } from "solid-js";

function MyComponent() {
  let textareaRef: HTMLTextAreaElement;
  
  const getValue = () => {
    console.log(textareaRef.value);
  };
  
  return (
    <>
      <Textarea 
        ref={textareaRef}
        defaultValue="Initial content"
        placeholder="Uncontrolled textarea"
      />
      <button onClick={getValue}>Get Value</button>
    </>
  );
}
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `string` | `undefined` | Current value (controlled mode) |
| `defaultValue` | `string` | `undefined` | Default value (uncontrolled mode) |
| `onChange` | `(value: string, event: Event) => void` | `undefined` | Callback when value changes |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `undefined` | DaisyUI size variant |
| `variant` | `"primary" \| "secondary" \| "accent" \| "info" \| "success" \| "warning" \| "error"` | `undefined` | DaisyUI color variant |
| `bordered` | `boolean` | `true` | Apply bordered styling |
| `ghost` | `boolean` | `false` | Apply ghost styling |
| `disabled` | `boolean` | `false` | Disable the textarea |
| `required` | `boolean` | `false` | Mark as required |
| `readonly` | `boolean` | `false` | Mark as readonly |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `class` | `string` | `undefined` | Additional CSS classes |
| `classList` | `Record<string, boolean>` | `undefined` | Dynamic classes |
| `name` | `string` | `undefined` | Name attribute |
| `id` | `string` | `undefined` | ID attribute |
| `rows` | `number` | `undefined` | Number of visible rows |
| `cols` | `number` | `undefined` | Number of visible columns |
| `maxlength` | `number` | `undefined` | Maximum character length |
| `minlength` | `number` | `undefined` | Minimum character length |
| `aria-label` | `string` | `undefined` | Accessible label |
| `aria-describedby` | `string` | `undefined` | IDs of describing elements |
| `onFocus` | `(event: FocusEvent) => void` | `undefined` | Focus event handler |
| `onBlur` | `(event: FocusEvent) => void` | `undefined` | Blur event handler |
| `onKeyDown` | `(event: KeyboardEvent) => void` | `undefined` | Key down event handler |
| `onKeyUp` | `(event: KeyboardEvent) => void` | `undefined` | Key up event handler |
| `ref` | `HTMLTextAreaElement \| ((el: HTMLTextAreaElement) => void)` | `undefined` | Textarea element reference |
| `hint` | `string \| JSX.Element` | `undefined` | Help text below textarea |
| `state` | `"error" \| "success" \| "warning" \| "info"` | `undefined` | Validation state |
| `label` | `string \| JSX.Element` | `undefined` | Main label above textarea |
| `altLabel` | `string \| JSX.Element` | `undefined` | Alternative label (top-right) |

## DaisyUI Classes Applied

The component automatically applies appropriate DaisyUI classes based on props:

- **Base**: `textarea`
- **Bordered**: `textarea-bordered` (default)
- **Ghost**: `textarea-ghost`
- **Sizes**: `textarea-xs`, `textarea-sm`, `textarea-md`, `textarea-lg`
- **Variants**: `textarea-primary`, `textarea-secondary`, `textarea-accent`, `textarea-info`, `textarea-success`, `textarea-warning`, `textarea-error`

## Form Integration

When using form-related props (`label`, `altLabel`, `hint`), the component automatically wraps the textarea in DaisyUI's `form-control` structure:

```tsx
<div class="form-control">
  <div class="label">
    <span class="label-text">Label</span>
    <span class="label-text-alt">Alt Label</span>
  </div>
  <textarea class="textarea textarea-bordered" />
  <div class="label">
    <span class="label-text-alt">Hint message</span>
  </div>
</div>
```

## Accessibility Features

- **Semantic HTML**: Uses proper `<textarea>` element
- **ARIA Support**: Full ARIA attribute support including `aria-invalid`, `aria-describedby`
- **Keyboard Navigation**: Standard textarea keyboard behavior
- **Screen Reader**: Proper labeling and hint association
- **Focus Management**: Proper focus indication and management

## Controlled vs Uncontrolled

### Controlled Mode
Use when you need reactive updates and state management:

```tsx
const [value, setValue] = createSignal("");
<Textarea value={value()} onChange={setValue} />
```

### Uncontrolled Mode
Use when you only need to access the final value:

```tsx
let ref: HTMLTextAreaElement;
<Textarea ref={ref} defaultValue="initial" />
// Access value with ref.value
```

## State Management

The `state` prop overrides the `variant` prop for validation styling:

```tsx
// This will show error styling (red), not primary
<Textarea variant="primary" state="error" />
```

## Notes

- The component defaults to `bordered={true}` following DaisyUI conventions
- When both `variant` and `state` are provided, `state` takes precedence for styling
- Form integration is automatic when labels or hints are provided
- Hint messages are properly associated with the textarea via `aria-describedby`
- The component is fully compatible with SolidJS reactivity patterns
- TypeScript definitions provide full IntelliSense support

## Edge Cases

- Handles `null` and `undefined` values gracefully by converting to empty string
- Supports very long content without performance issues
- Properly escapes special characters and prevents XSS
- Works correctly with rapid input changes and high-frequency updates
