# Copilot Instructions for Solid DaisyUI

## Project Overview

Solid DaisyUI is a comprehensive component library built with SolidJS and styled using DaisyUI. The project provides a set of reusable, accessible, and customizable UI components that follow DaisyUI design standards while leveraging SolidJS's reactive programming model.

## Build and Test Instructions

### Build the Project
```bash
npm run build
```
This compiles TypeScript files and generates the production-ready build.

### Run Tests
```bash
npm test
```
This executes all tests using Vitest to ensure components behave as expected.

## Component Implementation Standards

### Gold Standard: Alert Component

Use the `Alert` component in `src/components/alert.tsx` as the reference implementation. It demonstrates:

#### 1. **TypeScript Interface Definition**
```tsx
export interface AlertProps {
  children?: JSX.Element;
  class?: string;
  classList?: Record<string, boolean>;
  type?: "info" | "success" | "warning" | "error";
  icon?: JSX.Element;
  hideIcon?: boolean;
  style?: "soft" | "outline" | "dash";
  title?: string;
  vertical?: boolean;
  buttons?: JSX.Element[];
}
```

#### 2. **Comprehensive JSDoc Documentation**
```tsx
/**
 * Props for the Alert component.
 *
 * @property {JSX.Element} [children] - The content to display inside the alert.
 * @property {string} [class] - Additional CSS classes to apply to the alert.
 * @property {Record<string, boolean>} [classList] - Dynamic class list for conditional styling.
 * @property {'info' | 'success' | 'warning' | 'error'} [type] - The type of alert, which determines its styling.
 */
```

#### 3. **SolidJS Reactive State Management**
```tsx
const [isVisible, setIsVisible] = createSignal(true);
```

#### 4. **Dynamic Class Construction**
```tsx
const classes = () => ({
  alert: true,
  [`alert-${props.type}`]: !!props.type,
  ...(props.class ? { [props.class]: true } : {}),
});
```

#### 5. **Accessibility Implementation**
```tsx
<div
  role="alert"
  aria-live={props.type === "error" ? "assertive" : "polite"}
  classList={{...classes(), ...props.classList}}
>
```

#### 6. **DaisyUI Class Usage**
- Use official DaisyUI CSS classes (`alert`, `alert-info`, `alert-success`, etc.)
- Support DaisyUI modifiers (`alert-outline`, `alert-soft`, etc.)
- Follow DaisyUI naming conventions

### Component Implementation Guidelines

#### 1. **File Structure**
```
src/components/component-name.tsx
test/components/component-name.test.tsx
docs/components/component-name.md
```

#### 2. **Required Exports**
```tsx
export interface ComponentNameProps {
  // Props definition with JSDoc
}

export default function ComponentName(props: ComponentNameProps): JSX.Element {
  // Implementation
}
```

#### 3. **Props Design**
- **children**: Always use `JSX.Element` for child content
- **class**: Support additional CSS classes as `string`
- **classList**: Support dynamic classes as `Record<string, boolean>`
- **Variants**: Use union types for DaisyUI variants (`"primary" | "secondary" | "accent"`)
- **Optional Props**: Mark non-essential props as optional with `?`

#### 4. **State Management**
```tsx
import { createSignal, createEffect } from "solid-js";

const [state, setState] = createSignal(initialValue);
```

#### 5. **Event Handling**
```tsx
// Prefer explicit event types
onClick?: (event: MouseEvent) => void;
onFocus?: (event: FocusEvent) => void;

// Handle events properly
const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  props.onClick?.(event);
};
```

#### 6. **Accessibility Requirements**
- Use semantic HTML elements
- Include ARIA attributes (`role`, `aria-label`, `aria-expanded`, etc.)
- Support keyboard navigation
- Ensure proper focus management
- Use `aria-live` for dynamic content announcements

#### 7. **DaisyUI Integration**
- Use official DaisyUI component classes
- Support all DaisyUI variants and modifiers
- Follow DaisyUI naming conventions
- Reference [DaisyUI documentation](https://daisyui.com/components/) for accurate implementation

#### 8. **Error Handling**
```tsx
// Graceful degradation
if (!isVisible()) return null;

// Default values
const variant = props.variant ?? "primary";
```

## Test-Driven Development (TDD)

### 1. **Write Tests First**
```tsx
describe("ComponentName", () => {
  it("renders with required props", () => {
    const { getByRole } = render(() => <ComponentName title="Test" />);
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("supports DaisyUI variants", () => {
    const { container } = render(() => <ComponentName variant="primary" />);
    expect(container.firstChild).toHaveClass("btn-primary");
  });

  it("handles user interactions", () => {
    const handleClick = vi.fn();
    const { getByRole } = render(() => <ComponentName onClick={handleClick} />);
    fireEvent.click(getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("meets accessibility requirements", () => {
    const { getByRole } = render(() => <ComponentName aria-label="Test" />);
    const element = getByRole("button");
    expect(element).toHaveAttribute("aria-label", "Test");
  });
});
```

### 2. **Test Categories**
- **Rendering**: Component renders correctly with props
- **Interactions**: User interactions work as expected
- **Accessibility**: ARIA attributes and keyboard navigation
- **DaisyUI Compliance**: Correct CSS classes and variants
- **Edge Cases**: Error states and boundary conditions

## Component Documentation

### Required Documentation Structure
```markdown
# ComponentName Component

## Overview
Brief description of the component and its purpose.

## Usage
\`\`\`tsx
<ComponentName variant="primary" onClick={handleClick}>
  Content
</ComponentName>
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "primary" \| "secondary" | "primary" | Button variant |

## Accessibility
- Supports keyboard navigation
- Includes ARIA attributes
- Compatible with screen readers

## Examples
[Additional usage examples]
```

## Code Quality Standards

### 1. **TypeScript**
- Use strict TypeScript configuration
- Define explicit types for all props
- Use union types for variants
- Avoid `any` type

### 2. **SolidJS Best Practices**
- Use `createSignal` for reactive state
- Use `createEffect` for side effects
- Leverage `classList` for dynamic classes
- Use `Show` and `For` components for conditional rendering

### 3. **Performance**
- Minimize re-renders with proper signal usage
- Use `createMemo` for expensive calculations
- Avoid unnecessary DOM updates

### 4. **Imports**
```tsx
import { JSX, createSignal, createEffect } from "solid-js";
// Import only what you need
```

## Useful Resources

- [SolidJS Documentation](https://docs.solidjs.com)
- [DaisyUI Components](https://daisyui.com/components/)
- [SolidJS Testing Library](https://github.com/solidjs/solid-testing-library)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Notes

- Use Vite for build system and Vitest for testing
- Follow semantic versioning for releases
- Ensure all components are tree-shakeable
- Maintain backward compatibility when possible
