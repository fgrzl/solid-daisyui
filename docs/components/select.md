# Select Component

## Component Overview

The Select component provides a dropdown selection control with full DaisyUI styling support. It follows official DaisyUI Select patterns with support for all variants, sizes, and styling options. Implements WCAG 2.1 AA accessibility standards with proper ARIA attributes, keyboard navigation, and semantic structure.

Supports both controlled and uncontrolled modes, option groups, disabled options, and comprehensive error handling for edge cases.

## Usage Examples

### Basic Select
```tsx
import { Select } from "solid-daisyui";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

<Select options={options} />
```

### With Placeholder
```tsx
<Select 
  options={options} 
  placeholder="Choose an option..."
/>
```

### Size Variants
```tsx
<Select options={options} size="xs" />
<Select options={options} size="sm" />
<Select options={options} size="md" />
<Select options={options} size="lg" />
```

### Color Variants
```tsx
<Select options={options} variant="primary" />
<Select options={options} variant="secondary" />
<Select options={options} variant="accent" />
<Select options={options} variant="info" />
<Select options={options} variant="success" />
<Select options={options} variant="warning" />
<Select options={options} variant="error" />
```

### Style Variants
```tsx
<Select options={options} bordered />
<Select options={options} ghost />
```

### Controlled Mode
```tsx
const [value, setValue] = createSignal("1");

<Select 
  options={options}
  value={value()}
  onChange={setValue}
/>
```

### Uncontrolled Mode with Default Value
```tsx
<Select 
  options={options}
  defaultValue="2"
/>
```

### Option Groups
```tsx
const groupedOptions = [
  {
    label: "Fruits",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
    ]
  },
  {
    label: "Vegetables",
    options: [
      { value: "carrot", label: "Carrot" },
      { value: "lettuce", label: "Lettuce" },
    ]
  }
];

<Select options={groupedOptions} />
```

### Disabled Options
```tsx
const optionsWithDisabled = [
  { value: "1", label: "Available Option" },
  { value: "2", label: "Disabled Option", disabled: true },
  { value: "3", label: "Another Available Option" },
];

<Select options={optionsWithDisabled} />
```

### Form Integration
```tsx
<Select 
  options={options}
  name="category"
  required
  aria-label="Select category"
/>
```

## Props

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| options | `(SelectOption \| SelectOptionGroup)[]` | `[]` | The options to display in the select |
| value | `string` | - | The current selected value (controlled mode) |
| defaultValue | `string` | - | The default selected value (uncontrolled mode) |
| placeholder | `string` | - | Placeholder text when no option is selected |
| class | `string` | - | Additional CSS classes to apply |
| classList | `Record<string, boolean>` | - | Dynamic class list for conditional styling |
| size | `"xs" \| "sm" \| "md" \| "lg"` | - | DaisyUI size variant |
| variant | `"primary" \| "secondary" \| "accent" \| "info" \| "success" \| "warning" \| "error"` | - | DaisyUI color variant |
| bordered | `boolean` | `false` | Whether to apply bordered styling |
| ghost | `boolean` | `false` | Whether to apply ghost styling |
| disabled | `boolean` | `false` | Whether the select is disabled |
| required | `boolean` | `false` | Whether the select is required for form validation |
| name | `string` | - | The name attribute for form submission |
| aria-label | `string` | - | ARIA label for accessibility |
| aria-describedby | `string` | - | ARIA describedby attribute |
| onChange | `(value: string) => void` | - | Callback fired when selection changes |

## Types

### SelectOption
```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### SelectOptionGroup
```tsx
interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}
```

## Accessibility

- Implements proper ARIA attributes (`role="combobox"`)
- Supports keyboard navigation with Tab key
- Compatible with screen readers
- Follows semantic HTML structure
- Supports ARIA labeling and descriptions

## Notes

- Supports both controlled and uncontrolled modes
- Handles empty options arrays gracefully
- Provides comprehensive error handling for invalid option values
- Compatible with all DaisyUI themes
- Option groups use semantic `<optgroup>` elements
- Disabled options are properly marked with `disabled` attribute
