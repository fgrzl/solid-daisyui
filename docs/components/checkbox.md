# Checkbox Component

## Overview

The Checkbox component provides a styled checkbox input that follows DaisyUI design standards and supports comprehensive accessibility features. It can be used in both controlled and uncontrolled modes, supports various sizes and colors, and includes proper ARIA attributes for screen readers.

## Usage

### Basic Usage
```tsx
import { Checkbox } from "solid-daisyui";

// Basic checkbox
<Checkbox />

// With change handler
<Checkbox onChange={(event) => console.log("Checked:", event.target.checked)} />
```

### Controlled vs Uncontrolled

```tsx
// Controlled (recommended for form state management)
const [isChecked, setIsChecked] = createSignal(false);
<Checkbox 
  checked={isChecked()} 
  onChange={(event) => setIsChecked(event.target.checked)} 
/>

// Uncontrolled (with initial value)
<Checkbox defaultChecked={true} />
```

### Size Variants

```tsx
<Checkbox size="xs" />  {/* Extra small */}
<Checkbox size="sm" />  {/* Small */}
<Checkbox size="md" />  {/* Medium (default) */}
<Checkbox size="lg" />  {/* Large */}
```

### Color Variants

```tsx
<Checkbox color="primary" />
<Checkbox color="secondary" />
<Checkbox color="accent" />
<Checkbox color="info" />
<Checkbox color="success" />
<Checkbox color="warning" />
<Checkbox color="error" />
```

### States

```tsx
{/* Disabled checkbox */}
<Checkbox disabled={true} />

{/* Indeterminate state (partially checked) */}
<Checkbox indeterminate={true} />

{/* Read-only checkbox */}
<Checkbox readOnly={true} checked={true} />

{/* Required for form validation */}
<Checkbox required={true} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `undefined` | Controls the checked state (controlled component) |
| `defaultChecked` | `boolean` | `false` | Sets initial checked state (uncontrolled component) |
| `indeterminate` | `boolean` | `false` | Sets checkbox to indeterminate state |
| `disabled` | `boolean` | `false` | Whether the checkbox is disabled |
| `readOnly` | `boolean` | `false` | Whether the checkbox is read-only |
| `required` | `boolean` | `false` | Whether the checkbox is required for form validation |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `undefined` | DaisyUI size variant |
| `color` | `"primary" \| "secondary" \| "accent" \| "info" \| "success" \| "warning" \| "error"` | `undefined` | DaisyUI color variant |
| `name` | `string` | `undefined` | Name attribute for form submission |
| `value` | `string` | `undefined` | Value attribute for form submission |
| `form` | `string` | `undefined` | Associates checkbox with a form element |
| `class` | `string` | `undefined` | Additional CSS classes |
| `classList` | `Record<string, boolean>` | `undefined` | Dynamic class list for conditional styling |
| `id` | `string` | `undefined` | Custom ID for the checkbox element |
| `tabIndex` | `number` | `0` | Tab order for keyboard navigation |
| `aria-label` | `string` | `undefined` | Accessible label for screen readers |
| `aria-labelledby` | `string` | `undefined` | ID of element that labels this checkbox |
| `aria-describedby` | `string` | `undefined` | ID of element that describes this checkbox |
| `aria-required` | `boolean` | `undefined` | Indicates if the checkbox is required |
| `aria-invalid` | `boolean` | `undefined` | Indicates if the checkbox has validation errors |
| `onChange` | `(event: Event) => void` | `undefined` | Callback fired when checked state changes |
| `onFocus` | `(event: FocusEvent) => void` | `undefined` | Callback fired when checkbox receives focus |
| `onBlur` | `(event: FocusEvent) => void` | `undefined` | Callback fired when checkbox loses focus |

## Accessibility

The Checkbox component is fully accessible and supports:

- **Screen Readers**: Uses semantic HTML `<input type="checkbox">` for proper role identification
- **Keyboard Navigation**: Supports Tab to focus and Space to toggle
- **ARIA Attributes**: Supports `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-required`, and `aria-invalid`
- **Focus Management**: Proper focus indicators and tabIndex support
- **State Announcement**: Screen readers announce checked/unchecked state changes

### Accessibility Example

```tsx
<Checkbox 
  aria-label="Accept terms and conditions"
  aria-describedby="terms-description"
  aria-required={true}
  required={true}
/>
<div id="terms-description">
  Please read and accept our terms and conditions to continue.
</div>
```

## Examples

### Form Integration

```tsx
function ContactForm() {
  const [formData, setFormData] = createSignal({
    newsletter: false,
    terms: false
  });

  const handleCheckboxChange = (field: string) => (event: Event) => {
    const target = event.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [field]: target.checked
    }));
  };

  return (
    <form>
      <label>
        <Checkbox 
          name="newsletter"
          checked={formData().newsletter}
          onChange={handleCheckboxChange('newsletter')}
        />
        Subscribe to newsletter
      </label>
      
      <label>
        <Checkbox 
          name="terms"
          checked={formData().terms}
          onChange={handleCheckboxChange('terms')}
          required={true}
          aria-required={true}
        />
        I accept the terms and conditions *
      </label>
      
      <button 
        type="submit" 
        disabled={!formData().terms}
      >
        Submit
      </button>
    </form>
  );
}
```

### Indeterminate State (Select All)

```tsx
function ItemList() {
  const [items, setItems] = createSignal([
    { id: 1, name: "Item 1", selected: false },
    { id: 2, name: "Item 2", selected: true },
    { id: 3, name: "Item 3", selected: false }
  ]);

  const selectedCount = () => items().filter(item => item.selected).length;
  const totalCount = () => items().length;
  
  const allSelected = () => selectedCount() === totalCount();
  const someSelected = () => selectedCount() > 0 && selectedCount() < totalCount();

  const toggleAll = () => {
    const shouldSelectAll = !allSelected();
    setItems(items => items.map(item => ({ ...item, selected: shouldSelectAll })));
  };

  const toggleItem = (id: number) => {
    setItems(items => items.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  return (
    <div>
      <label>
        <Checkbox 
          checked={allSelected()}
          indeterminate={someSelected()}
          onChange={toggleAll}
        />
        Select All
      </label>
      
      <div>
        <For each={items()}>
          {(item) => (
            <label>
              <Checkbox 
                checked={item.selected}
                onChange={() => toggleItem(item.id)}
              />
              {item.name}
            </label>
          )}
        </For>
      </div>
    </div>
  );
}
```

## Notes

- The checkbox follows DaisyUI styling and supports all official checkbox classes
- Use controlled mode (`checked` prop) for form state management
- Use uncontrolled mode (`defaultChecked` prop) for simpler cases
- The `indeterminate` state is visual only and doesn't affect the `checked` value
- Keyboard navigation follows standard checkbox patterns (Space to toggle, Tab to focus)
- The component automatically handles both mouse and keyboard interactions
- For accessibility, always provide proper labeling via `aria-label` or associate with a `<label>` element
- The component is fully compatible with form libraries and validation frameworks
