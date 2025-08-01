# Input Component

## Component Overview

The Input component provides a comprehensive text input solution following official DaisyUI Input patterns. It supports all DaisyUI variants, sizes, and state modifiers while implementing WCAG 2.1 AA accessibility standards.

**Features**:
- Full DaisyUI styling support (sizes, color variants, state modifiers)
- Both controlled and uncontrolled modes
- Comprehensive accessibility attributes
- TypeScript support with detailed prop types
- Keyboard navigation and event handling
- Support for all HTML input types

## Usage Examples

### Basic Input
```tsx
import { Input } from "solid-daisyui";

// Basic input with default border
<Input placeholder="Enter text..." />

// Without border  
<Input placeholder="Enter text..." bordered={false} />

// Different input types
<Input type="password" placeholder="Password" />
<Input type="email" placeholder="Email address" />
```

### Controlled Input
```tsx
const [value, setValue] = createSignal("");

<Input 
  value={value()}
  onChange={(newValue) => setValue(newValue)}
  placeholder="Controlled input"
/>
```

### Uncontrolled Input
```tsx
<Input defaultValue="Initial value" placeholder="Uncontrolled input" />
```

### DaisyUI Size Variants
```tsx
<Input size="xs" placeholder="Extra small" />
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />
```

### DaisyUI Color Variants
```tsx
<Input variant="primary" placeholder="Primary input" />
<Input variant="secondary" placeholder="Secondary input" />
<Input variant="accent" placeholder="Accent input" />
<Input variant="info" placeholder="Info input" />
<Input variant="success" placeholder="Success input" />
<Input variant="warning" placeholder="Warning input" />
<Input variant="error" placeholder="Error input" />
```

### DaisyUI State Modifiers
```tsx
// Bordered (default)
<Input placeholder="Bordered input (default)" />

// Without border
<Input placeholder="No border" bordered={false} />

// Ghost style
<Input placeholder="Ghost input" ghost />

// Combine modifiers
<Input placeholder="Ghost input" ghost bordered={false} />
```

### Input Types
```tsx
<Input type="text" placeholder="Text input" />
<Input type="password" placeholder="Password input" />
<Input type="email" placeholder="Email input" />
<Input type="number" placeholder="Number input" />
<Input type="search" placeholder="Search input" />
<Input type="tel" placeholder="Phone input" />
<Input type="url" placeholder="URL input" />
<Input type="date" />
<Input type="time" />
```

### Accessibility Features
```tsx
<Input 
  aria-label="Username"
  aria-describedby="username-help"
  required
  placeholder="Username"
/>

<Input 
  variant="error"
  aria-describedby="error-message"
  placeholder="Invalid input"
/>
```

### Event Handling
```tsx
<Input 
  placeholder="Type something..."
  onChange={(value, event) => console.log("Changed:", value)}
  onFocus={(event) => console.log("Focused")}
  onBlur={(event) => console.log("Blurred")}
  onKeyDown={(event) => {
    if (event.key === "Enter") {
      console.log("Enter pressed");
    }
  }}
/>
```

### Custom Styling
```tsx
<Input 
  class="my-custom-class"
  classList={{ 
    "border-red-500": hasError(),
    "bg-gray-100": isDisabled()
  }}
  placeholder="Custom styled input"
/>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `value` | `string` | `undefined` | Current value of the input (controlled mode) |
| `defaultValue` | `string` | `undefined` | Default value for uncontrolled mode |
| `onChange` | `(value: string, event: Event) => void` | `undefined` | Callback fired when input value changes |
| `type` | `"text" \| "password" \| "email" \| "number" \| "search" \| "tel" \| "url" \| "date" \| "datetime-local" \| "month" \| "time" \| "week"` | `"text"` | HTML input type |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `undefined` | DaisyUI size variant |
| `variant` | `"primary" \| "secondary" \| "accent" \| "info" \| "success" \| "warning" \| "error"` | `undefined` | DaisyUI color variant |
| `bordered` | `boolean` | `true` | Apply input-bordered class |
| `ghost` | `boolean` | `false` | Apply input-ghost class |
| `disabled` | `boolean` | `false` | Whether input is disabled |
| `required` | `boolean` | `false` | Whether input is required |
| `placeholder` | `string` | `undefined` | Placeholder text |
| `class` | `string` | `undefined` | Additional CSS classes |
| `classList` | `Record<string, boolean>` | `undefined` | Dynamic class list for conditional styling |
| `name` | `string` | `undefined` | Name attribute |
| `id` | `string` | `undefined` | ID attribute |
| `autocomplete` | `string` | `undefined` | Autocomplete attribute |
| `maxlength` | `number` | `undefined` | Maximum length |
| `minlength` | `number` | `undefined` | Minimum length |
| `pattern` | `string` | `undefined` | Validation pattern |
| `aria-label` | `string` | `undefined` | Accessible label |
| `aria-describedby` | `string` | `undefined` | ID of describing element |
| `onFocus` | `(event: FocusEvent) => void` | `undefined` | Focus event handler |
| `onBlur` | `(event: FocusEvent) => void` | `undefined` | Blur event handler |
| `onKeyDown` | `(event: KeyboardEvent) => void` | `undefined` | Key down event handler |
| `onKeyUp` | `(event: KeyboardEvent) => void` | `undefined` | Key up event handler |
| `ref` | `HTMLInputElement \| ((el: HTMLInputElement) => void)` | `undefined` | Reference to input element |

## Accessibility

The Input component implements comprehensive accessibility features:

- **Semantic HTML**: Uses native `<input>` element for proper screen reader support
- **ARIA Attributes**: Supports `aria-label`, `aria-describedby`, and automatic `aria-invalid`
- **Keyboard Navigation**: Full keyboard support with Tab, Enter, and other key handling
- **Error States**: Automatically sets `aria-invalid="true"` for error variant
- **Form Integration**: Works seamlessly with form validation and submission

## DaisyUI Integration

This component follows official DaisyUI Input patterns:

- **Base Classes**: Uses `input` as the base class
- **Size Modifiers**: `input-xs`, `input-sm`, `input-md`, `input-lg`
- **Color Variants**: `input-primary`, `input-secondary`, `input-accent`, `input-info`, `input-success`, `input-warning`, `input-error`
- **State Modifiers**: `input-bordered`, `input-ghost`
- **Responsive**: Inherits DaisyUI responsive behavior

## Best Practices

### Controlled vs Uncontrolled
```tsx
// Controlled - for forms with validation
const [email, setEmail] = createSignal("");
<Input value={email()} onChange={setEmail} type="email" />

// Uncontrolled - for simple inputs
<Input defaultValue="" ref={inputRef} />
```

### Error Handling
```tsx
<Input 
  variant={hasError() ? "error" : "primary"}
  aria-describedby={hasError() ? "error-message" : undefined}
  placeholder="Email address"
/>
{hasError() && (
  <div id="error-message" class="text-error text-sm">
    Please enter a valid email address
  </div>
)}
```

### Form Integration
```tsx
<form onSubmit={handleSubmit}>
  <Input 
    name="username"
    required
    variant="primary"
    placeholder="Username"
  />
  <Input 
    name="password" 
    type="password"
    required
    variant="primary"
    placeholder="Password"
  />
</form>
```

## Notes

- The component automatically handles controlled vs uncontrolled modes based on prop usage
- Error variant automatically sets `aria-invalid="true"` for accessibility
- All DaisyUI class combinations are supported and can be mixed
- TypeScript provides full type safety for all props and event handlers
- Performance optimized with memoized class calculations
