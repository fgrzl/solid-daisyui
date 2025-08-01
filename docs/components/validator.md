# Validator Component

## Overview

The Validator component provides form validation capabilities following DaisyUI design patterns. It offers two main approaches: a wrapper component for custom form controls and a convenient ValidatorInput component that combines input and validation in one.

## Basic Usage

### Validator Wrapper Component

```tsx
import { Validator } from "@/components/validator";
import { Input } from "@/components/input";

// Basic validation wrapper
<Validator message="This field is required">
  <Input placeholder="Enter value" />
</Validator>

// With validation state
<Validator state="error" message="Invalid email format">
  <Input type="email" placeholder="Email" />
</Validator>
```

### ValidatorInput Component (Recommended)

```tsx
import { ValidatorInput } from "@/components/validator";

// Simple validation input
<ValidatorInput 
  state="error" 
  message="This field is required"
  placeholder="Enter value" 
/>

// With labels
<ValidatorInput 
  label="Email Address"
  altLabel="Required"
  state="success" 
  message="Valid email format"
  type="email"
  placeholder="user@example.com" 
/>
```

## Validation States

The validator supports four validation states that automatically apply appropriate styling:

```tsx
// Error state (red styling)
<ValidatorInput state="error" message="Invalid input" />

// Success state (green styling)  
<ValidatorInput state="success" message="Valid input" />

// Warning state (yellow styling)
<ValidatorInput state="warning" message="Consider reviewing" />

// Info state (blue styling)
<ValidatorInput state="info" message="Additional info" />
```

## Props

### Validator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | JSX.Element | - | Form control elements to wrap |
| message | string \| JSX.Element | - | Validation message to display |
| state | "error" \| "success" \| "warning" \| "info" | - | Validation state |
| label | string \| JSX.Element | - | Main label above the control |
| altLabel | string \| JSX.Element | - | Alternative label (top-right) |
| class | string | - | Additional CSS classes |
| classList | Record<string, boolean> | - | Dynamic class list |

### ValidatorInput Props

Extends all Input component props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | string \| JSX.Element | - | Validation message to display |
| state | "error" \| "success" \| "warning" \| "info" | - | Validation state (overrides variant) |
| label | string \| JSX.Element | - | Main label above the input |
| altLabel | string \| JSX.Element | - | Alternative label (top-right) |

## Accessibility

The validator components implement comprehensive accessibility features:

- **ARIA Association**: Validation messages are connected to inputs via `aria-describedby`
- **Invalid State**: `aria-invalid="true"` is set for error states
- **Unique IDs**: Automatic generation of unique IDs for proper association
- **Semantic HTML**: Uses proper form control markup following DaisyUI patterns

```tsx
// Accessible validation with screen reader support
<ValidatorInput 
  id="email-input"
  label="Email Address"
  state="error"
  message="Please enter a valid email address"
  aria-label="Email input field"
  type="email"
/>
```

## Advanced Examples

### Form Validation

```tsx
import { createSignal } from "solid-js";
import { ValidatorInput } from "@/components/validator";

function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [errors, setErrors] = createSignal<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email().includes("@")) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (password().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form>
      <ValidatorInput
        label="Email"
        type="email"
        value={email()}
        onChange={(value) => setEmail(value)}
        state={errors().email ? "error" : email() ? "success" : undefined}
        message={errors().email}
        placeholder="user@example.com"
      />
      
      <ValidatorInput
        label="Password"
        type="password"
        value={password()}
        onChange={(value) => setPassword(value)}
        state={errors().password ? "error" : password() ? "success" : undefined}
        message={errors().password}
        placeholder="Enter password"
      />
      
      <button type="button" onClick={validate}>
        Login
      </button>
    </form>
  );
}
```

### Custom Validation Messages

```tsx
// JSX validation messages
<ValidatorInput 
  state="error"
  message={
    <span>
      Password must contain: 
      <strong> 8+ characters</strong>, 
      <strong> uppercase</strong>, 
      <strong> number</strong>
    </span>
  }
  type="password"
/>

// Multiple validation levels
<ValidatorInput 
  state="warning"
  message="Weak password - consider adding special characters"
  altLabel="Optional"
  type="password"
/>
```

### Integration with Form Libraries

```tsx
// Example with a form validation library
function FormField({ name, ...props }) {
  const [field, meta] = useField(name);
  
  return (
    <ValidatorInput
      {...field}
      {...props}
      state={meta.error ? "error" : meta.touched && !meta.error ? "success" : undefined}
      message={meta.error}
    />
  );
}
```

## Design Integration

The validator components follow DaisyUI's form control patterns:

- Uses `.form-control` wrapper for proper spacing
- Applies `.label` and `.label-text` for consistent typography
- Integrates with DaisyUI input states (`input-error`, `input-success`, etc.)
- Supports all DaisyUI input variants and modifiers

## Notes

- ValidatorInput is recommended for most use cases as it handles integration automatically
- The Validator wrapper is useful for custom form controls or complex layouts
- Validation state automatically applies to Input components when using ValidatorInput
- All standard Input props are supported and forwarded correctly
- Validation messages support both string and JSX content
