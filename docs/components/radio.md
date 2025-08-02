# Radio Component

The Radio component provides a customizable radio input element with DaisyUI styling for form inputs. Built with SolidJS reactive patterns and comprehensive accessibility support following WCAG 2.1 AA standards.

## Features

- ✅ **Full DaisyUI Integration**: Uses official DaisyUI radio classes and variants
- ✅ **Accessibility First**: ARIA attributes, keyboard navigation, screen reader support
- ✅ **TypeScript Support**: Comprehensive type safety with detailed JSDoc documentation  
- ✅ **SolidJS Reactive**: Optimized with createMemo for performance
- ✅ **Form Integration**: Proper radio grouping and validation support
- ✅ **Customizable**: Sizes, colors, custom classes, and dynamic styling

## Basic Usage

```tsx
import { Radio } from "solid-daisyui";

function MyForm() {
  return (
    <div>
      <Radio name="option" value="1" />
      <Radio name="option" value="2" />
      <Radio name="option" value="3" />
    </div>
  );
}
```

## Props

| Prop               | Type                                                                                  | Default | Description                              |
| ------------------ | ------------------------------------------------------------------------------------- | ------- | ---------------------------------------- |
| `name`             | `string`                                                                              | -       | Name attribute for grouping radio inputs |
| `value`            | `string`                                                                              | -       | Value of the radio input                 |
| `checked`          | `boolean`                                                                             | `false` | Whether the radio is checked             |
| `disabled`         | `boolean`                                                                             | `false` | Whether the radio is disabled            |
| `size`             | `"xs" \| "sm" \| "md" \| "lg"`                                                        | `"md"`  | Size of the radio input                  |
| `color`            | `"primary" \| "secondary" \| "accent" \| "success" \| "warning" \| "info" \| "error"` | -       | Color variant of the radio               |
| `required`         | `boolean`                                                                             | `false` | Whether the radio is required in a form  |
| `form`             | `string`                                                                              | -       | Form ID to associate with                |
| `onChange`         | `(event: Event) => void`                                                              | -       | Change event handler                     |
| `onFocus`          | `(event: FocusEvent) => void`                                                         | -       | Focus event handler                      |
| `onBlur`           | `(event: FocusEvent) => void`                                                         | -       | Blur event handler                       |
| `class`            | `string`                                                                              | -       | Additional CSS classes                   |
| `classList`        | `Record<string, boolean>`                                                             | -       | Dynamic CSS classes                      |
| `aria-label`       | `string`                                                                              | -       | ARIA label for accessibility             |
| `aria-describedby` | `string`                                                                              | -       | ARIA described by for accessibility      |
| `id`               | `string`                                                                              | -       | ID attribute                             |
| `tabIndex`         | `number`                                                                              | `0`     | Tab index for keyboard navigation        |

## Examples

### Basic Radio Group

```tsx
import { createSignal } from "solid-js";
import { Radio } from "solid-daisyui";

function BasicRadioGroup() {
  const [selected, setSelected] = createSignal("");

  return (
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">Option 1</span>
        <Radio
          name="basic-option"
          value="1"
          checked={selected() === "1"}
          onChange={(e) => setSelected(e.target.value)}
        />
      </label>
      <label class="label cursor-pointer">
        <span class="label-text">Option 2</span>
        <Radio
          name="basic-option"
          value="2"
          checked={selected() === "2"}
          onChange={(e) => setSelected(e.target.value)}
        />
      </label>
      <label class="label cursor-pointer">
        <span class="label-text">Option 3</span>
        <Radio
          name="basic-option"
          value="3"
          checked={selected() === "3"}
          onChange={(e) => setSelected(e.target.value)}
        />
      </label>
    </div>
  );
}
```

### Radio Sizes

```tsx
<Radio size="xs" name="size-demo" value="xs" />
<Radio size="sm" name="size-demo" value="sm" />
<Radio size="md" name="size-demo" value="md" />
<Radio size="lg" name="size-demo" value="lg" />
```

### Radio Colors

```tsx
<Radio color="primary" name="color-demo" value="primary" />
<Radio color="secondary" name="color-demo" value="secondary" />
<Radio color="accent" name="color-demo" value="accent" />
<Radio color="success" name="color-demo" value="success" />
<Radio color="warning" name="color-demo" value="warning" />
<Radio color="info" name="color-demo" value="info" />
<Radio color="error" name="color-demo" value="error" />
```

### Disabled Radio

```tsx
<Radio disabled name="disabled-demo" value="disabled" />
<Radio disabled checked name="disabled-demo" value="disabled-checked" />
```

### Form Integration

```tsx
import { createSignal } from "solid-js";
import { Radio } from "solid-daisyui";

function FormExample() {
  const [formData, setFormData] = createSignal({
    plan: "",
    notifications: "",
  });

  const handlePlanChange = (e) => {
    setFormData((prev) => ({ ...prev, plan: e.target.value }));
  };

  const handleNotificationChange = (e) => {
    setFormData((prev) => ({ ...prev, notifications: e.target.value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formData());
      }}
    >
      <div class="form-control">
        <div class="label">
          <span class="label-text">Choose your plan</span>
        </div>
        <label class="label cursor-pointer justify-start">
          <Radio
            name="plan"
            value="basic"
            color="primary"
            checked={formData().plan === "basic"}
            onChange={handlePlanChange}
            required
          />
          <span class="label-text ml-2">Basic Plan ($9/month)</span>
        </label>
        <label class="label cursor-pointer justify-start">
          <Radio
            name="plan"
            value="pro"
            color="primary"
            checked={formData().plan === "pro"}
            onChange={handlePlanChange}
            required
          />
          <span class="label-text ml-2">Pro Plan ($19/month)</span>
        </label>
        <label class="label cursor-pointer justify-start">
          <Radio
            name="plan"
            value="enterprise"
            color="primary"
            checked={formData().plan === "enterprise"}
            onChange={handlePlanChange}
            required
          />
          <span class="label-text ml-2">Enterprise Plan ($49/month)</span>
        </label>
      </div>

      <div class="form-control mt-4">
        <div class="label">
          <span class="label-text">Email notifications</span>
        </div>
        <label class="label cursor-pointer justify-start">
          <Radio
            name="notifications"
            value="all"
            color="success"
            checked={formData().notifications === "all"}
            onChange={handleNotificationChange}
          />
          <span class="label-text ml-2">All notifications</span>
        </label>
        <label class="label cursor-pointer justify-start">
          <Radio
            name="notifications"
            value="important"
            color="success"
            checked={formData().notifications === "important"}
            onChange={handleNotificationChange}
          />
          <span class="label-text ml-2">Important only</span>
        </label>
        <label class="label cursor-pointer justify-start">
          <Radio
            name="notifications"
            value="none"
            color="success"
            checked={formData().notifications === "none"}
            onChange={handleNotificationChange}
          />
          <span class="label-text ml-2">No notifications</span>
        </label>
      </div>

      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
```

## Accessibility

The Radio component includes comprehensive accessibility support following WCAG 2.1 AA standards:

- ✅ **Semantic HTML**: Proper `input[type="radio"]` element with `role="radio"`
- ✅ **ARIA Support**: `aria-label`, `aria-describedby`, `aria-checked` attributes
- ✅ **Keyboard Navigation**: Full keyboard support with proper tab order
- ✅ **Screen Reader Compatible**: Proper announcements and state changes
- ✅ **Form Integration**: Name grouping for radio button sets
- ✅ **Validation Support**: Required field support with proper error handling
- ✅ **Focus Management**: Clear focus indicators and logical tab order

### Accessibility Example

```tsx
<Radio
  name="accessible-option"
  value="option1"
  aria-label="Choose option 1"
  aria-describedby="option1-description"
  required
/>
<div id="option1-description">
  This option provides basic features for small teams
</div>
```

## TypeScript Support

The Radio component is fully typed with TypeScript, providing comprehensive type safety for all props and event handlers with detailed JSDoc documentation.

```tsx
interface RadioProps {
  /** Name attribute for radio grouping */
  name?: string;
  /** Value submitted with form */
  value?: string;
  /** Whether radio is checked */
  checked?: boolean;
  /** Whether radio is disabled */
  disabled?: boolean;
  /** Size variant using DaisyUI classes */
  size?: "xs" | "sm" | "md" | "lg";
  /** Color variant using DaisyUI classes */
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "info"
    | "error";
  /** Additional CSS classes */
  class?: string;
  /** Dynamic class list for conditional styling */
  classList?: Record<string, boolean>;
  /** Change event handler */
  onChange?: (event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => void;
  /** Focus event handler */
  onFocus?: (event: FocusEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => void;
  /** Blur event handler */
  onBlur?: (event: FocusEvent & { currentTarget: HTMLInputElement; target: HTMLInputElement }) => void;
  /** ARIA label for accessibility */
  "aria-label"?: string;
  /** ARIA described by reference */
  "aria-describedby"?: string;
  /** HTML ID attribute */
  id?: string;
  /** Tab index for navigation */
  tabIndex?: number;
  /** Required for form validation */
  required?: boolean;
  /** Form association by ID */
  form?: string;
}
```

## Performance

The Radio component is optimized for performance using SolidJS reactive patterns:

- **Memoized Classes**: Uses `createMemo` to cache class computations
- **Efficient Props Splitting**: Separates custom props from native input props
- **Minimal Re-renders**: Only updates when props actually change
- **Tree Shakeable**: Import only what you need
